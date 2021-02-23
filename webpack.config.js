const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ImageminPlugin = require("imagemin-webpack-plugin").default
const ImageminMozjpeg = require("imagemin-mozjpeg")
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const px2rem = require("postcss-plugin-px2rem")

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"
const px2remOpts = {
  rootValue: 16,
  unitPrecision: 5,
  propWhiteList: ["font-size"],
  propBlackList: [],
  exclude: false,
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
}

module.exports = {
  mode,

  devtool: prod ? false : "source-map",

  // エントリーポイント
  entry: {
    script: "./frontend/javascript/main.js",
    style: "./frontend/scss/main.scss"
  },

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/`,
    // 出力ファイル名
    filename: "assets/js/[name].js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            /* node.jsもbabelでbuildしたいのでoptionの設定は.babelrcに書く
            options: {
              presets: ["@babel/preset-env"]
            }
            */
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              plugins: [
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require("autoprefixer")({
                  grid: "no-autoplace"
                }),
                px2rem(px2remOpts)
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers")
              }
            }
          }
        ]
      },

      // {
      //   test: /\.html$/,
      //   loader: "html-loader",
      //   options: {
      //     minimize: false,
      //   },
      // }
    ]
  },

  resolve: {
    extensions: [".js", ".json"]
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "assets/css/[name].css" }),
    new FixStyleOnlyEntriesPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/frontend/html/index.html`,
      filename: `${__dirname}/dist/index.html`,
      minify: false,
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: `${__dirname}/frontend/html/assets`,
            to: `${__dirname}/dist/assets`
          }
        ]
      }
    ),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/,
      pngquant: {
        quality: '90-100',
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256
      },
      svgo: {
      },
      plugins: [
        ImageminMozjpeg({
          quality: 90
        })
      ]
    })
  ],

  devServer: {
    host: '0.0.0.0',
    inline: true,
    contentBase: `${__dirname}/dist/`,
    publicPath: "/assets/"
  },

  stats: {
    colors: true
  }
}
