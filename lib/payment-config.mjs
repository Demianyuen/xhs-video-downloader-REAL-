const CREATOR_PACK_SUBJECT = 'RedNote Creator Pack';

export function getPaymentTarget(env = process.env) {
  const stripeLink = cleanUrl(env.NEXT_PUBLIC_STRIPE_CREATOR_PACK_LINK || env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK);
  if (stripeLink) {
    return {
      href: stripeLink,
      label: 'Pay with Stripe',
      provider: 'stripe',
    };
  }

  const paypalLink = cleanUrl(env.NEXT_PUBLIC_PAYPAL_CREATOR_PACK_LINK || env.NEXT_PUBLIC_PAYPAL_PAYMENT_LINK);
  if (paypalLink) {
    return {
      href: paypalLink,
      label: 'Pay with PayPal',
      provider: 'paypal',
    };
  }

  return {
    href: `mailto:support@xhsvideodownloader.com?subject=${encodeURIComponent(CREATOR_PACK_SUBJECT)}`,
    label: 'Request access',
    provider: 'email',
  };
}

function cleanUrl(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'mailto:') return parsed.toString();
  } catch {
    return '';
  }

  return '';
}
