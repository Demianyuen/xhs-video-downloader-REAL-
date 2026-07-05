export type PaymentProvider = 'stripe' | 'paypal' | 'email';

export function getPaymentTarget(env?: NodeJS.ProcessEnv | Record<string, string | undefined>): {
  href: string;
  label: string;
  provider: PaymentProvider;
};
