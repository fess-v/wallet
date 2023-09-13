export const BRANCH = process.env.GITHUB_REF;
export const BRANCH_NAME = process.env.GITHUB_HEAD_REF;
export const COINBASE_APP_ID = process.env.COINBASE_APP_ID ?? '';
export const COMMIT_SHA = process.env.GITHUB_SHA;
export const IS_DEV_ENV = process.env.WALLET_ENVIRONMENT === 'development';
export const IS_TEST_ENV = process.env.WALLET_ENVIRONMENT === 'testing';
export const MOONPAY_API_KEY = process.env.MOONPAY_API_KEY ?? '';
export const SEGMENT_WRITE_KEY = process.env.SEGMENT_WRITE_KEY ?? '';
export const SENTRY_DSN = process.env.SENTRY_DSN ?? '';
export const TRANSAK_API_KEY = process.env.TRANSAK_API_KEY ?? '';
export const WALLET_ENVIRONMENT = process.env.WALLET_ENVIRONMENT ?? 'unknown';
export const LEDGER_BITCOIN_ENABLED = process.env.LEDGER_BITCOIN_ENABLED === 'true';
// ts-unused-exports:disable-next-line
export const SWAP_ENABLED = process.env.SWAP_ENABLED === 'true';
export const TEST_ACCOUNT_SECRET_KEY = process.env.TEST_ACCOUNT_SECRET_KEY ?? '';
