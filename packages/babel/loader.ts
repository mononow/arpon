/// <reference types="@arpon/configs" />
/**
 * These loaders and this file, is intended to use with Webpack 5 with TypeScript configuration files.
 */
import * as envs from '@arpon/configs/envModes.cjs';
import babelrc from './template.cjs';
import extendPresetEnv from './lib/extendPresetEnv.cjs';

const Babel = {
  loader: 'babel-loader',
  options: {
    sourceMaps: envs.IS_DEV,
    cacheDirectory: envs.IS_DEV,
    babelrc: false,
    ...babelrc,
  },
};

const BabelCJS = {
  ...Babel,
  options: extendPresetEnv(Babel.options, {
    modules: 'commonjs',
  }),
};

export { Babel, BabelCJS };
