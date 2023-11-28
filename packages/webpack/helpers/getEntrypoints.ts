import { existsSync } from 'node:fs';
import * as webpack from 'webpack';
import { IS_BROWSER } from '@arpon/configs/envModes.cjs';
import { fromWorkingDir } from '@arpon/utils';

export default function getEntrypoints(): webpack.EntryObject {
  return {
    app: [
      `@arpon/styles/dist/${IS_BROWSER ? 'desktop' : 'mobile'}.css`,

      /** Optional generic external styles file */
      existsSync(fromWorkingDir('src', 'app.css')) && './app.css',

      /** Virtual app entry point */
      fromWorkingDir(`./src/index.${IS_BROWSER ? 'browser' : 'mobile'}.ts`),
    ].filter(Boolean) as string[],
  };
}
