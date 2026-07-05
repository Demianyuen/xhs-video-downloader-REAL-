import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getPaymentTarget } from './payment-config.mjs';

describe('payment target selection', () => {
  it('prefers Stripe payment links when configured', () => {
    const target = getPaymentTarget({
      NEXT_PUBLIC_STRIPE_CREATOR_PACK_LINK: 'https://buy.stripe.com/test_creator',
      NEXT_PUBLIC_PAYPAL_CREATOR_PACK_LINK: 'https://paypal.me/example/9',
    });

    assert.deepEqual(target, {
      href: 'https://buy.stripe.com/test_creator',
      label: 'Pay with Stripe',
      provider: 'stripe',
    });
  });

  it('falls back to PayPal when Stripe is not configured', () => {
    const target = getPaymentTarget({
      NEXT_PUBLIC_PAYPAL_CREATOR_PACK_LINK: 'https://paypal.me/example/9',
    });

    assert.equal(target.provider, 'paypal');
    assert.equal(target.href, 'https://paypal.me/example/9');
  });

  it('uses email fallback when no payment link exists', () => {
    const target = getPaymentTarget({});

    assert.equal(target.provider, 'email');
    assert.equal(target.href, 'mailto:support@xhsvideodownloader.com?subject=RedNote%20Creator%20Pack');
  });
});
