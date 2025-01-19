import webpack from 'webpack'
import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import EslintWebpackPlugin from 'eslint-webpack-plugin'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'

import packageJson from './package.json' with { type: 'json' }

const __dirname = import.meta.dirname

export default (env) => {
  const isDevMode = env.mode === 'development' || env.mode === undefined

  const cssLoader = [
    // NOTE: style-loader isn't required in case of extraction
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: isDevMode
            ? '[path][name]__[local]'
            : '[hash:base64:5]',
          namedExport: false,
          exportLocalsConvention: 'as-is',
        },
      },
    },
  ]

  return {
    mode: env.mode || 'development',

    entry: {
      app: path.resolve(__dirname, 'src', 'index.tsx'),
    },

    output: {
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.template.html'),
        minify: true,
        inject: 'body',
        favicon: path.resolve(__dirname, 'src/assets/images', 'favicon.png'),
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash:8].css',
        chunkFilename: 'styles/[name].[contenthash:8].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          // NOTE: html-webpack-include-assets-plugin - expired/deprecated
          // NOTE: html-webpack-tags-plugin - vulnerable dependencies
          {
            from: path.resolve(__dirname, 'src/assets/styles/', 'reset.css'),
            to: './styles/',
          },
        ],
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(packageJson.version),
      }),
      isDevMode ? new webpack.HotModuleReplacementPlugin() : null,
      isDevMode
        ? new EslintWebpackPlugin({
            configType: 'flat',
            files: ['src/**/*.{js,ts,jsx,tsx}'],
            failOnWarning: false,
          })
        : null,
      isDevMode
        ? new StylelintWebpackPlugin({
            files: ['src/**/*.{css,less}'],
            emitWarning: false,
          })
        : null,
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: cssLoader,
        },
        {
          test: /\.less$/,
          use: [
            ...cssLoader,
            {
              loader: 'less-loader',
            },
          ],
        },
        // NOTE: fonts load and work without loader! why!?
        {
          test: /\.(woff|woff2|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
        // NOTE: <use href='...#id' /> doest work with .svg?url
        {
          test: /\.url\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
        // NOTE: svgr doesn't work with .svg?url
        {
          test: /\.svg$/i,
          exclude: /\.url\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
      alias: {
        common: path.resolve(__dirname, 'src/common'),
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        images: path.resolve(__dirname, 'src/assets/images'),
        fonts: path.resolve(__dirname, 'src/assets/fonts'),
        styles: path.resolve(__dirname, 'src/assets/styles'),
      },
    },

    devtool: isDevMode ? 'eval-source-map' : false,

    devServer: {
      port: 3000,
      open: true,
      // NOTE: react-refresh-webpack-plugin is required for real hot reload
      hot: isDevMode,
      historyApiFallback: true,
      client: {
        logging: 'error',
        overlay: {
          warnings: false,
          errors: true,
          runtimeErrors: true,
        },
      },
    },
  }
}
