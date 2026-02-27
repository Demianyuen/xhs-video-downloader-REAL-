export async function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://xhsvideodownloader.com/sitemap.xml`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
