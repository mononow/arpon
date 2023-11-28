import * as webpack from 'webpack';
import { merge } from 'webpack-merge';

// Utils
import { fromWorkingDir } from '@arpon/utils';

// Helpers;
import getEntrypoints from './helpers/getEntrypoints';

// Base config
import commonConfig from './config.common';

function resolveFileLoaderName(resourcePath: string) {
  if (/@arpon/.test(resourcePath)) {
    return `assets/[name][ext][query]`;
  }
  return `assets/[path][name][ext][query]`;
}

const config: webpack.Configuration = merge<webpack.Configuration>(commonConfig, {
  devtool: false,
  entry: getEntrypoints(),
  output: {
    path: fromWorkingDir('dist'),
  },
  resolve: {
    modules: [fromWorkingDir('src'), 'node_modules'],
  },
  module: {
    rules: [
      /** Handle font imports */
      {
        test: /\.(eot|woff2?|otf|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: resolveFileLoaderName,
        },
      },

      /** Handle image imports */
      {
        test: /\.(gif|jpe?g|png|ico|svg|bmp)$/,
        type: 'asset',
        generator: {
          filename: resolveFileLoaderName,
        },
      },
      {
        test: /\.txt/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 5 * 1024, // 5kb
          },
        },
        generator: {
          filename: resolveFileLoaderName,
        },
      },
    ],
  },
  plugins: [],
});

export default config;
