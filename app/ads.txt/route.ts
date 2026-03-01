export async function GET() {
  const content = 'google.com, pub-7935038704820292, DIRECT, f08c47fec0942fa0\n';
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
