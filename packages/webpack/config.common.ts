/// <reference types="./config.common.d.ts" />
import * as webpack from "webpack";
import { merge } from "webpack-merge";
import { fromWorkingDir, clientEnvironment, getPackage } from "@mononow/utils";
import {
  Css,
  ExtractCss,
  PostCss,
  Svelte,
  TypeScript,
} from "@mononow/configs/loaders";
import { Babel, BabelSvelte } from "@mononow/babel-config/loader";

// Plugins
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { MiniHtmlWebpackPlugin } from "mini-html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import LodashModuleReplacementPlugin from "lodash-webpack-plugin";
import {
  IS_PROD,
  NODE_ENV,
  APP_ENV,
  IS_DEV,
  DEBUG_LVL,
  IS_BROWSER,
  IS_POS,
  IS_TEST,
  IS_STORYBOOK,
} from "@mononow/configs/envModes.cjs";

import ArponLogger from "./plugins/InfrastructureMamaLogger";

import getHTMLTemplate from "./helpers/getHTMLTemplate";

const PKG = getPackage();
const warningsFilter = [/source-map-loader/, /Failed to parse source map/];

type DefineObject = Record<string, webpack.DefinePlugin["definitions"]>;

const definePluginOptions = merge(clientEnvironment("Webpack"), {
  __APP_MANIFEST__: (() => {
    try {
      if (PKG) {
        const { id = undefined, appName = undefined } = PKG.mononow || {};
        const slug = id && appName ? `${id}-${appName}` : undefined;

        return JSON.stringify({
          name: PKG.defaultName,
          description: PKG.appDescription,
          version: PKG.appVersion,
          slug,
          ...PKG.mononow,
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
    return {};
  })(),
  __NODE_ENV__: JSON.stringify(NODE_ENV),
  __APP_ENV__: JSON.stringify(APP_ENV),
  __PROD__: IS_PROD,
  __TEST__: IS_TEST(),
  __DEV__: IS_DEV,
  __DEBUG_LVL__: DEBUG_LVL,
  __POS__: IS_POS,
  __BROWSER__: IS_BROWSER,
  __MODEL__: JSON.stringify(process.env.PLATFORM),
  __PLATFORM__: JSON.stringify(process.env.PLATFORM),
}) as DefineObject;

const scriptExtensions = [".mjs", ".js", ".cjs", ".ts"];

const config: webpack.Configuration = {
  mode: IS_PROD ? "production" : "development",
  cache: true,
  target: "web",
  node: false,
  context: fromWorkingDir("src"),
  output: {
    path: fromWorkingDir("dist"),
    publicPath: "/",
    filename: "[name].[fullhash:5].js",
    chunkFilename: "[name].[fullhash:5].js",
    assetModuleFilename: "[path][name].[ext][query]",
  },

  resolve: {
    symlinks: false,
    enforceExtension: false,
    alias: (() => {
      const aliases: { [x: string]: string } = {
        svelte: fromWorkingDir("node_modules", "svelte"),
      };

      if (IS_BROWSER && PKG && PKG.mononow && PKG.mononow.iconPath) {
        // eslint-disable-next-line no-underscore-dangle
        aliases.__APP_ICON__ = fromWorkingDir("src", PKG.mononow.iconPath);
      }

      return aliases;
    })(),
    conditionNames: ["svelte"],
    mainFields: ["browser", "esnext", "jsnext:main", "module", "main"],
    extensions: [
      ...scriptExtensions,
      ".json",
      ".pcss",
      ".css",
      ".html",
      ".svelte",
    ],
  },

  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: [BabelSvelte, Svelte],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [Babel, TypeScript],
      },
      {
        test: /\.(c|m)?js$/,
        include: [fromWorkingDir("src")],
        exclude: [/node_modules/],
        use: [Babel],
      },

      /**
       * * Run app COMMONJS dependencies through babel with module: 'commonjs'.
       * @babel/preset-env inserts es6 import if we don't pass "module: 'commonjs'",
       * resulting in mixed es6 and commonjs code.
       * */
      /* {
        test: {
          ...transpileIgnoreBaseCondition,
          and: [isOfModuleType('cjs')],
        },
        use: [BabelCJS],
      }, */
      /** Run app ES6 dependencies through babel with { modules: false } */
      /* {
        resource: [/\.js$/, /node_modules/],
        test: {
          ...transpileIgnoreBaseCondition,
          and: [isOfModuleType('es')],
        },
        use: [Babel],
      }, */
      /* {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [Linaria],
      }, */
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(p?css)$/,
        use: [ExtractCss, Css, PostCss],
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new ArponLogger(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new MiniHtmlWebpackPlugin({
      context: {
        title: PKG?.name ?? "Application",
        jsAttributes: {
          defer: true,
        },
      },
      template: getHTMLTemplate,
    }),
    new webpack.DefinePlugin(definePluginOptions),
    new LodashModuleReplacementPlugin(),

    !IS_STORYBOOK &&
      new ESLintPlugin({
        extensions: scriptExtensions,
        exclude: ["index.browser.ts", "index.pos.ts"],
      }),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],

  /* Split Chunks with POS polyfills */
  optimization: {
    chunkIds: "named",
    moduleIds: "named",

    /** Create a separate chunk for webpack runtime */
    runtimeChunk: { name: "runtime" },
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 1,
      automaticNameDelimiter: "_",
      cacheGroups: {
        default: false,
        libs: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(_: unknown, chunks: webpack.Chunk[], cacheGroupKey: string) {
            const allChunksNames = chunks.map((item) => item.name).join("~");
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
          name: "polyfills",
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
