import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CREATOR_PACK_OFFER } from './creator-pack-offer.mjs';

describe('creator pack offer', () => {
  it('keeps the launch price above the USD 10 revenue goal', () => {
    assert.equal(CREATOR_PACK_OFFER.priceUsd, 12);
    assert.equal(CREATOR_PACK_OFFER.displayPrice, '$12');
    assert.equal(CREATOR_PACK_OFFER.currency, 'USD');
  });
});
