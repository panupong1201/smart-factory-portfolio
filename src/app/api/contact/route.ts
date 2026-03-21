import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const subject = body.subject?.trim() || "";
    const message = body.message?.trim() || "";
    const attachmentsInput = Array.isArray(body.attachments)
      ? body.attachments.slice(0, MAX_ATTACHMENTS)
      : [];

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ message: "Invalid email format." }, { status: 400 });
    }

    if (Array.isArray(body.attachments) && body.attachments.length > MAX_ATTACHMENTS) {
      return NextResponse.json(
        { message: "You can upload up to 5 files only." },
        { status: 400 }
      );
    }

    let totalAttachmentsSize = 0;
    const attachments = attachmentsInput.map((file) => {
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
      return NextResponse.json(
        { message: "Total attachment size must be 15MB or less." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_TO_EMAIL || user;

    if (!host || !user || !pass || !receiver) {
      return NextResponse.json(
        { message: "Mail server is not configured. Please set SMTP environment variables." },
        { status: 500 }
      );
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
  } catch {
    return NextResponse.json({ message: "Unable to send message right now." }, { status: 500 });
  }
}
