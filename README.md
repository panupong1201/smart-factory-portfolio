This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact Form Setup (SMTP)

The contact popup submits to `POST /api/contact` and sends email via SMTP.

1. Copy `.env.example` to `.env.local`
2. Fill in these values:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=panupong.nokaew@gmail.com
SMTP_PASS=sfgq ovri rltt zawc
CONTACT_TO_EMAIL=panupong.nokaew@gmail.com
```

Notes:
- `CONTACT_TO_EMAIL` is optional in code, but strongly recommended.
- If your SMTP provider requires SSL-only, use port `465`.
- For Gmail, use an App Password (not your regular account password).

After setting env values, restart the dev server and test the popup contact form.

## Contact Click Analytics (GA4 / PostHog)

This project tracks which contact channel users click:
- `Send Message` button
- `LINE` button

### GA4 setup

Add this to `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Events sent:
- `contact_click` with `channel=send_message`
- `contact_click` with `channel=line`

### PostHog support

If `window.posthog` is already available on the page, the same `contact_click` event will also be captured automatically.

## Website Visit Log (Today / Week / Month / Year)

This project includes a built-in visit logger.

- On first page load per browser session, it logs one visit to `POST /api/analytics/visit`
- You can read summary counts from `GET /api/analytics/summary`

Response shape:

```json
{
	"success": true,
	"summary": {
		"today": 0,
		"week": 0,
		"month": 0,
		"year": 0,
		"updatedAt": "2026-02-27T00:00:00.000Z"
	}
}
```

Notes:
- `today` = unique visitors today
- `week` = unique visitors since ISO week start (Monday)
- `month` = unique visitors since first day of month
- `year` = unique visitors since first day of year
- Data is stored in `storage/visits.json`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
