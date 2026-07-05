const DEFAULT_MODEL = 'gpt-4o-mini-transcribe';
const SUPPORTED_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/mp4',
  'audio/m4a',
  'audio/wav',
  'audio/webm',
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

export function getTranscriptionModel(env = process.env) {
  return env.OPENAI_TRANSCRIBE_MODEL || DEFAULT_MODEL;
}

export function hasTranscriptionApiKey(env = process.env) {
  return Boolean(env.OPENAI_API_KEY);
}

export function assertSupportedMediaType(contentType) {
  const normalized = String(contentType || '').split(';')[0].trim().toLowerCase();
  if (!SUPPORTED_TYPES.includes(normalized)) {
    throw new Error(`Unsupported media type: ${contentType || 'unknown'}`);
  }
}

export async function transcribeMediaUrl(mediaUrl, options = {}) {
  const env = options.env || process.env;
  const apiKey = env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const mediaResponse = await fetch(mediaUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://www.xiaohongshu.com/',
    },
  });

  if (!mediaResponse.ok) {
    throw new Error(`Failed to fetch media: ${mediaResponse.status}`);
  }

  const contentType = mediaResponse.headers.get('content-type') || 'video/mp4';
  assertSupportedMediaType(contentType);

  const blob = await mediaResponse.blob();
  const form = new FormData();
  form.append('model', getTranscriptionModel(env));
  form.append('file', blob, `rednote-media.${extensionForContentType(contentType)}`);

  if (options.language) form.append('language', options.language);

  const transcriptResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: form,
  });

  const payload = await transcriptResponse.json().catch(() => ({}));
  if (!transcriptResponse.ok) {
    const message = payload?.error?.message || `OpenAI transcription failed: ${transcriptResponse.status}`;
    throw new Error(message);
  }

  return {
    text: payload.text || '',
    model: getTranscriptionModel(env),
  };
}

function extensionForContentType(contentType) {
  const normalized = String(contentType || '').split(';')[0].trim().toLowerCase();
  if (normalized.includes('mpeg') || normalized.includes('mp3')) return 'mp3';
  if (normalized.includes('wav')) return 'wav';
  if (normalized.includes('webm')) return 'webm';
  if (normalized.includes('quicktime')) return 'mov';
  if (normalized.includes('m4a')) return 'm4a';
  return 'mp4';
}
