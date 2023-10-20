const config = process.env;

export const ENV = {
  ENVIRONMENT: config.REACT_APP_ENV,
  NAME: require("../../package.json").name,
  VERSION: require("../../package.json").version,
  IS_STAGING: config.REACT_APP_ENV === "staging",
  IS_TEST: config.REACT_APP_ENV === "test",
  IS_PROD: config.REACT_APP_ENV === "production",
  API: {
    URL: config.REACT_APP_BASE_URL,
    MAX_RETRIES: 3,
    RETRY_TIMEOUT: 2000, // 2 seconds
  },
  JWT: {
    TOKEN_APP_ID: "access_token",
    REFRESH_APP_ID: "refresh_token",
    TOKEN_EXPIRES_ID: "expires_token",
  },
  SENTRY: {
    DSN: config.REACT_APP_SENTRY_DSN,
  },
  TOAST_DELAY: 3000,
};
