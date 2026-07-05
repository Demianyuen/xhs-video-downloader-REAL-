import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  extractSupportedUrl,
  extractVideoId,
  isSupportedXHSUrl,
  normalizeXHSUrl,
} from './xhs-url.mjs';

describe('XHS and RedNote URL parsing', () => {
  it('extracts a xiaohongshu URL with query params from share text', () => {
    const input = 'Copy this link https://www.xiaohongshu.com/explore/65abc123?xsec_token=tok&xsec_source=pc_feed more text';

    assert.equal(
      extractSupportedUrl(input),
      'https://www.xiaohongshu.com/explore/65abc123?xsec_token=tok&xsec_source=pc_feed',
    );
  });

  it('accepts rednote.com note URLs and normalizes them to xiaohongshu.com', () => {
    const input = 'https://www.rednote.com/explore/65abc123?xsec_token=tok';

    assert.equal(isSupportedXHSUrl(input), true);
    assert.equal(
      normalizeXHSUrl(input),
      'https://www.xiaohongshu.com/explore/65abc123?xsec_token=tok',
    );
  });

  it('extracts note IDs from rednote.com and xhslink.com URLs', () => {
    assert.equal(extractVideoId('https://www.rednote.com/explore/65abc123'), '65abc123');
    assert.equal(extractVideoId('https://xhslink.com/a/abcXYZ'), 'abcXYZ');
  });
});
