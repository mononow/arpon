/// <reference types="node" />
/// <reference types="./index.d.ts" />
const { env } = process;

/** Default ENV variables */
if (typeof env.NODE_ENV === "undefined") {
  env.NODE_ENV = "development";
}

/** Debug level. false, 1, 2 */
if (typeof env.DEBUG_LVL === "undefined") {
  env.DEBUG_LVL = "false";
}

if (typeof env.APP_ENV === "undefined") {
  env.APP_ENV = "browser";
}

if (typeof env.Arpon_SIMULATOR === "undefined") {
  env.Arpon_SIMULATOR = "false";
}

if (env.APP_ENV === "browser") {
  env.Arpon_SIMULATOR = "true";
}

if (typeof env.SDK_ASSETS_FOLDER === "undefined") {
  env.SDK_ASSETS_FOLDER = "@mononow";
}

if (typeof env.ORG_ASSETS_FOLDER === "undefined") {
  env.ORG_ASSETS_FOLDER = "assets/org";
}

module.exports = {
  IS_STORYBOOK: env.STORYBOOK,
  NODE_ENV: env.NODE_ENV,
  APP_ENV: env.APP_ENV,
  WEINRE_IP: env.WEINRE_IP,
  REMOTEJS: env.REMOTEJS,
  SDK_ASSETS_FOLDER: env.SDK_ASSETS_FOLDER,
  ORG_ASSETS_FOLDER: env.ORG_ASSETS_FOLDER,
  HTML_BASE_URL: env.HTML_BASE_URL,
  IS_PROD: env.NODE_ENV === "production",
  IS_DEV: env.NODE_ENV === "development",
  DEBUG_LVL: Number(env.DEBUG_LVL || 0),
  IS_BROWSER: env.APP_ENV === "browser",
  IS_POS: env.APP_ENV === "pos",
  BUNDLE_NAME: `bundle.${env.APP_ENV}`.toLowerCase(),
  ADD_Arpon_SIMULATOR: env.Arpon_SIMULATOR === "true",
  IS_WATCHING: () =>
    process.env.WEBPACK_WATCH ||
    process.env.WEBPACK_SERVE ||
    require.main.filename.match(/webpack(-dev)?-server?/) !== null,
  IS_TEST: () =>
    process.env.NODE_ENV === "test" || typeof process.env.TEST !== "undefined",
};