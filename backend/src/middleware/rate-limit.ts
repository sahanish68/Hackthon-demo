export type RateLimitPolicy = {
  name: string;
  windowMs: number;
  maxRequests: number;
  appliesTo: readonly string[];
};

export const defaultRateLimitPolicies: readonly RateLimitPolicy[] = [
  {
    name: 'companion',
    windowMs: 60_000,
    maxRequests: 30,
    appliesTo: ['/companion'],
  },
  {
    name: 'safety',
    windowMs: 60_000,
    maxRequests: 5,
    appliesTo: ['/safety'],
  },
];
