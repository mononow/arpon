import type * as webpack from "webpack";

// LOADERS
import * as Loaders from "@arpon/babel-config/loader";
import { TypeScript } from "@arpon/configs/loaders";

const config: webpack.Configuration = {
  mode: "development",

  resolve: {
    extensions: [".ts", ".js", ".mjs", ".cjs"],
  },

  module: {
    rules: [
      {
        test: /\.(c|m)?js$/,
        exclude: [/node_modules/],
        use: [Loaders.Babel],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [TypeScript],
      },
    ],
  },
};

export default config;
