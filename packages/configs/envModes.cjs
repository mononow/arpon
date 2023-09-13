/// <reference types="node" />
/// <reference types="./index.d.ts" />
const { env } = process;

/** Default ENV variables */
if (typeof env.NODE_ENV === 'undefined') {
  env.NODE_ENV = 'development';
}

/** Debug level. false, 1, 2 */
if (typeof env.DEBUG_LVL === 'undefined') {
  env.DEBUG_LVL = 'false';
}

if (env.APP_ENV === 'browser') {
  env.Arpon_SIMULATOR = 'true';
}

module.exports = {
  NODE_ENV: env.NODE_ENV,
  IS_PROD: env.NODE_ENV === 'production',
  IS_DEV: env.NODE_ENV === 'development',
  DEBUG_LVL: Number(env.DEBUG_LVL || 0),
  IS_WATCHING: () =>
    process.env.WEBPACK_WATCH ||
    process.env.WEBPACK_SERVE ||
    require.main.filename.match(/webpack(-dev)?-server?/) !== null,
  IS_TEST: () => process.env.NODE_ENV === 'test' || typeof process.env.TEST !== 'undefined',
};
