/// <reference types="./config.common.d.ts" />
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import { fromWorkingDir, clientEnvironment } from '@arpon/utils';

// Plugins

import {
  IS_PROD,
  NODE_ENV,
  IS_DEV,
  DEBUG_LVL,
  IS_BROWSER,
  IS_TEST,
} from '@arpon/configs/envModes.cjs';

import ArponLogger from './plugins/InfrastructureMamaLogger';

const warningsFilter = [/source-map-loader/, /Failed to parse source map/];

type DefineObject = Record<string, webpack.DefinePlugin['definitions']>;

const definePluginOptions = merge(clientEnvironment('Webpack'), {
  __NODE_ENV__: JSON.stringify(NODE_ENV),
  __PROD__: IS_PROD,
  __TEST__: IS_TEST(),
  __DEV__: IS_DEV,
  __DEBUG_LVL__: DEBUG_LVL,
  __BROWSER__: IS_BROWSER,
  __MODEL__: JSON.stringify(process.env.PLATFORM),
  __PLATFORM__: JSON.stringify(process.env.PLATFORM),
}) as DefineObject;

const scriptExtensions = ['.mjs', '.js', '.cjs', '.ts'];

const config: webpack.Configuration = {
  mode: IS_PROD ? 'production' : 'development',
  cache: true,
  target: 'web',
  node: false,
  context: fromWorkingDir('src'),
  output: {
    path: fromWorkingDir('dist'),
    publicPath: '/',
    filename: '[name].[fullhash:5].js',
    chunkFilename: '[name].[fullhash:5].js',
    assetModuleFilename: '[path][name].[ext][query]',
  },

  resolve: {
    symlinks: false,
    enforceExtension: false,
    alias: (() => {
      const aliases: { [x: string]: string } = {
        react: fromWorkingDir('node_modules', 'react'),
      };

      return aliases;
    })(),
    conditionNames: ['tsx'],
    mainFields: ['browser', 'esnext', 'jsnext:main', 'module', 'main'],
    extensions: [...scriptExtensions, '.json', '.pcss', '.css', '.html', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [new ArponLogger(), new webpack.DefinePlugin(definePluginOptions)].filter(
    Boolean,
  ) as webpack.WebpackPluginInstance[],

  /* Split Chunks with POS polyfills */
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',

    /** Create a separate chunk for webpack runtime */
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      automaticNameDelimiter: '_',
      cacheGroups: {
        default: false,
        libs: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(_: unknown, chunks: webpack.Chunk[], cacheGroupKey: string) {
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}_${allChunksNames}`;
          },
          /**
           * If the current chunk contains modules already split out from the main bundle,
           * it will be reused instead of a new one being generated.
           * This can affect the resulting file name of the chunk.
           */
          reuseExistingChunk: true,
        },
        polyfills: {
          test: /core-js/,
          name: 'polyfills',
          priority: 10,
        },
      },
    },
  },

  stats:
    !DEBUG_LVL || Number(DEBUG_LVL) < 5
      ? {
          all: false,
          modules: false,
          assets: false,
          chunks: false,
          colors: true,
          version: false,
          children: false,
          moduleAssets: false,
          groupAssetsByEmitStatus: false,
          env: false,
          errors: true,
          performance: true,
          timings: false,
          warnings: true,
          errorsCount: true,
          entrypoints: false,
          warningsFilter,
        }
      : {
          warningsFilter,
        },
};

export default config;
