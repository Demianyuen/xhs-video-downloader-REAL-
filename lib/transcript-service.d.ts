export function getTranscriptionModel(env?: NodeJS.ProcessEnv | Record<string, string | undefined>): string;
export function hasTranscriptionApiKey(env?: NodeJS.ProcessEnv | Record<string, string | undefined>): boolean;
export function assertSupportedMediaType(contentType: string | null): void;
export function transcribeMediaUrl(
  mediaUrl: string,
  options?: {
    language?: string;
    env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  },
): Promise<{ text: string; model: string }>;
