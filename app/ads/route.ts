export async function GET() {
  return new Response('google.com, pub-7935038704820292, DIRECT, f08c47fec0942fa0', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
