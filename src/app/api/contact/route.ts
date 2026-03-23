import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  attachments?: Array<{
    name?: string;
    type?: string;
    size?: number;
    data?: string;
  }>;
};

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENTS_SIZE = 15 * 1024 * 1024;

type ParsedAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

function serverError(message: string) {
  return NextResponse.json({ message }, { status: 500 });
}

async function parseMultipartRequest(req: Request) {
  const formData = await req.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const fileEntries = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File);

  return {
    name,
    email,
    subject,
    message,
    fileEntries,
  };
}

function parseJsonRequest(body: ContactPayload) {
  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const subject = body.subject?.trim() || "";
  const message = body.message?.trim() || "";
  const attachmentsInput = Array.isArray(body.attachments)
    ? body.attachments.slice(0, MAX_ATTACHMENTS)
    : [];

  return {
    name,
    email,
    subject,
    message,
    attachmentsInput,
  };
}

async function buildMultipartAttachments(files: File[]) {
  if (files.length > MAX_ATTACHMENTS) {
    throw new Error("You can upload up to 5 files only.");
  }

  let totalAttachmentsSize = 0;
  const attachments: ParsedAttachment[] = [];

  for (const file of files) {
    const size = Number(file.size || 0);

    if (size <= 0) {
      throw new Error("Invalid attachment content.");
    }

    if (size > MAX_ATTACHMENT_SIZE) {
      throw new Error("Each file must be 5MB or smaller.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const content = Buffer.from(arrayBuffer);
    totalAttachmentsSize += content.length;

    attachments.push({
      filename: file.name || "attachment",
      content,
      contentType: file.type || "application/octet-stream",
    });
  }

  if (totalAttachmentsSize > MAX_TOTAL_ATTACHMENTS_SIZE) {
    throw new Error("Total attachment size must be 15MB or less.");
  }

  return attachments;
}

function buildJsonAttachments(body: ContactPayload) {
  if (Array.isArray(body.attachments) && body.attachments.length > MAX_ATTACHMENTS) {
    throw new Error("You can upload up to 5 files only.");
  }

  const attachmentsInput = Array.isArray(body.attachments)
    ? body.attachments.slice(0, MAX_ATTACHMENTS)
    : [];

  let totalAttachmentsSize = 0;
  const attachments: ParsedAttachment[] = attachmentsInput.map((file) => {
    const name = file.name?.trim() || "attachment";
    const type = file.type?.trim() || "application/octet-stream";
    const data = file.data?.trim() || "";
    const declaredSize = Number(file.size || 0);

    if (!data) {
      throw new Error("Invalid attachment content.");
    }

    const content = Buffer.from(data, "base64");
    const size = Number.isFinite(declaredSize) && declaredSize > 0 ? declaredSize : content.length;

    if (size > MAX_ATTACHMENT_SIZE || content.length > MAX_ATTACHMENT_SIZE) {
      throw new Error("Each file must be 5MB or smaller.");
    }

    totalAttachmentsSize += content.length;

    return {
      filename: name,
      content,
      contentType: type,
    };
  });

  if (totalAttachmentsSize > MAX_TOTAL_ATTACHMENTS_SIZE) {
    throw new Error("Total attachment size must be 15MB or less.");
  }

  return attachments;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    let name = "";
    let email = "";
    let subject = "";
    let message = "";
    let attachments: ParsedAttachment[] = [];

    if (isMultipart) {
      const parsed = await parseMultipartRequest(req);
      name = parsed.name;
      email = parsed.email;
      subject = parsed.subject;
      message = parsed.message;
      attachments = await buildMultipartAttachments(parsed.fileEntries);
    } else {
      const body = (await req.json()) as ContactPayload;
      const parsed = parseJsonRequest(body);
      name = parsed.name;
      email = parsed.email;
      subject = parsed.subject;
      message = parsed.message;
      attachments = buildJsonAttachments(body);
    }

    if (!name || !email || !subject || !message) {
      return badRequest("Please fill all required fields.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return badRequest("Invalid email format.");
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_TO_EMAIL || user;

    if (!host || !user || !pass || !receiver) {
      return serverError("Mail server is not configured. Please set SMTP environment variables.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to: receiver,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New message from portfolio website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send message right now.";

    if (
      message === "Invalid attachment content." ||
      message === "Each file must be 5MB or smaller." ||
      message === "Total attachment size must be 15MB or less." ||
      message === "You can upload up to 5 files only."
    ) {
      return badRequest(message);
    }

    return serverError(message);
  }
}
