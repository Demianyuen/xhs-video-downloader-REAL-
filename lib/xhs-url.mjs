const SUPPORTED_HOSTS = [
  'xiaohongshu.com',
  'xhslink.com',
  'rednote.com',
];

const URL_PATTERN = /https?:\/\/[^\s"'<>]+/gi;

export function extractSupportedUrl(input) {
  const trimmed = String(input || '').trim();
  const candidates = trimmed.match(URL_PATTERN) || [trimmed];

  for (const candidate of candidates) {
    const cleaned = candidate.replace(/[),.，。]+$/u, '');
    if (isSupportedXHSUrl(cleaned)) return cleaned;
  }

  return trimmed;
}

export function isSupportedXHSUrl(input) {
  try {
    const parsed = new URL(extractUrlCandidate(input));
    return SUPPORTED_HOSTS.some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

export function normalizeXHSUrl(input) {
  const candidate = extractSupportedUrl(input);
  const parsed = new URL(candidate);

  if (parsed.hostname === 'rednote.com' || parsed.hostname.endsWith('.rednote.com')) {
    parsed.hostname = 'www.xiaohongshu.com';
  }

  return parsed.toString();
}

export function extractVideoId(input) {
  const candidate = extractSupportedUrl(input);
  let parsed;

  try {
    parsed = new URL(candidate);
  } catch {
    return null;
  }

  const segments = parsed.pathname.split('/').filter(Boolean);
  const knownPrefix = segments.findIndex((segment, index) => (
    (segment === 'explore' || segment === 'note') ||
    (segment === 'item' && segments[index - 1] === 'discovery')
  ));

  if (knownPrefix >= 0 && segments[knownPrefix + 1]) {
    return sanitizeId(segments[knownPrefix + 1]);
  }

  if (parsed.hostname === 'xhslink.com' || parsed.hostname.endsWith('.xhslink.com')) {
    return sanitizeId(segments[segments.length - 1]);
  }

  return null;
}

function extractUrlCandidate(input) {
  return extractSupportedUrl(input);
}

function sanitizeId(value) {
  const match = String(value || '').match(/[a-zA-Z0-9_-]+/);
  return match ? match[0] : null;
}
