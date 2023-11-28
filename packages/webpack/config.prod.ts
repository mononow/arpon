import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import { IS_PROD } from '@arpon/configs/envModes.cjs';

// Base config
import appConfig from './config.app';

const config: webpack.Configuration = merge<webpack.Configuration>(appConfig, {
  devtool: false,
  plugins: [
    /** Generate hashes based on module's relative path */
    IS_PROD && new webpack.ids.HashedModuleIdsPlugin(),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
  optimization: {
    minimize: IS_PROD,
    moduleIds: 'deterministic',
  },
});

export default config;
