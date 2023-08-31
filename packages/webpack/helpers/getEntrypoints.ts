import { existsSync } from "node:fs";
import * as webpack from "webpack";
import { IS_BROWSER } from "@mononow/configs/envModes.cjs";
import { fromWorkingDir } from "@mononow/utils";

export default function getEntrypoints(): webpack.EntryObject {
  return {
    app: [
      /* Experimental Polyfill for Svelte Animations */
      // fromWorkingDir('./packages/static-polyfills/window.performance.js'),
      // fromWorkingDir('./packages/static-polyfills/requestAnimationFrame.js'),

      /* Experimental Polyfill */
      // fromWorkingDir('./packages/static-polyfills/css-polyfills.min.js'),

      /** Arpon style resetter/normalizer */
      `@mononow/styles/dist/${IS_BROWSER ? "desktop" : "pos"}.css`,

      /** Optional generic external styles file */
      existsSync(fromWorkingDir("src", "app.pcss")) && "./app.pcss",

      /** Virtual app entry point */
      fromWorkingDir(`./src/index.${IS_BROWSER ? "browser" : "pos"}.ts`),
    ].filter(Boolean) as string[],
  };
}
