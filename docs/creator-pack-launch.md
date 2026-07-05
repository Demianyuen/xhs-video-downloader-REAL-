# RedNote Creator Pack Launch Notes

Goal: make the site capable of collecting the first small payment quickly without building a full account system.

## Product

- Name: RedNote Creator Pack
- Price: USD 9 one-time launch offer
- Target users: creators, teachers, designers, small business owners
- Promise: extract RedNote/XHS post text and prepare reusable creator notes; provide manual help for failed public links

## Required Vercel environment variables

Set one or both payment links:

```bash
NEXT_PUBLIC_STRIPE_CREATOR_PACK_LINK=https://buy.stripe.com/...
NEXT_PUBLIC_PAYPAL_CREATOR_PACK_LINK=https://paypal.me/.../9
```

For transcription:

```bash
OPENAI_API_KEY=...
OPENAI_TRANSCRIBE_MODEL=gpt-4o-mini-transcribe
```

## Pages

- `/pricing`: public sales page
- `/creator-pack`: delivery and manual processing instructions
- `/extract`: free text extraction tool

## Fastest route to first USD 10

1. Create a Stripe Payment Link or PayPal payment link for USD 9.
2. Add the link to Vercel environment variables.
3. Deploy production.
4. Share the pricing page in 10 small creator/teacher/designer communities with one concrete use case.

## Deployment status on 2026-07-05

- GitHub commit pushed: `7753add feat: add RedNote creator monetization pack`
- Local verification passed:
  - `node --test lib/*.test.mjs`
  - `npm run lint` (0 errors, one pre-existing font warning)
  - `npm run build`
- Vercel deployments were triggered by GitHub and at least two builds completed successfully:
  - `Vercel - xhs-downloader`
  - `Vercel - xhs-video-downloader-fix`
- The deployment URLs are protected by Vercel SSO, so they are not usable as public sales links.
- `https://xhsvideodownloader.com/pricing` still returned the old 404 at the time of checking, so the custom domain alias needs to be pointed at the successful production project or redeployed with a valid Vercel token.
- The local pages were smoke-tested successfully:
  - `http://localhost:3000/pricing`
  - `http://localhost:3000/creator-pack`
