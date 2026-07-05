import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  assertSupportedMediaType,
  getTranscriptionModel,
  hasTranscriptionApiKey,
} from './transcript-service.mjs';

describe('transcript service helpers', () => {
  it('uses gpt-4o-mini-transcribe as the default model', () => {
    assert.equal(getTranscriptionModel({}), 'gpt-4o-mini-transcribe');
  });

  it('allows overriding the transcription model through env', () => {
    assert.equal(
      getTranscriptionModel({ OPENAI_TRANSCRIBE_MODEL: 'gpt-4o-transcribe' }),
      'gpt-4o-transcribe',
    );
  });

  it('detects whether an OpenAI API key is configured', () => {
    assert.equal(hasTranscriptionApiKey({}), false);
    assert.equal(hasTranscriptionApiKey({ OPENAI_API_KEY: 'sk-test' }), true);
  });

  it('accepts common audio and video content types', () => {
    assert.doesNotThrow(() => assertSupportedMediaType('audio/mpeg'));
    assert.doesNotThrow(() => assertSupportedMediaType('video/mp4'));
    assert.throws(() => assertSupportedMediaType('text/html'), /Unsupported media type/);
  });
});
