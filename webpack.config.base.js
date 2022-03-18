import path from 'path';
import DotenvPlugin from 'dotenv-webpack';
import WebpackBarPlugin from 'webpackbar';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { name, parcel } from './package.json';

const BUILD_PATH = 'build';
const ASSETS_PATH = 'assets';
const CONTENT_HASH = '[contenthash:8]';
const publicPath = parcel.publicPath.endsWith('/') ? parcel.publicPath : parcel.publicPath + '/';

export default function(env) {

  return {
    target: ['web', 'es5'],
    cache: {
      type: 'filesystem'              // 默认缓存在: /node_modules/.cache/webpack
    },
    entry: {
      main: ['./src/index.js']
    },
    output: {
      publicPath: publicPath,
      path: path.resolve(__dirname, BUILD_PATH),
      filename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.js`,
      chunkFilename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.chunk.js`,
      // 避免多个应用之间 jsonpFunction 名冲突
      chunkLoadingGlobal: name
    },
    resolve: {
      // 确保 npm link 时, 优先使用本项目依赖包
      // modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
      extensions: ['.js', '.vue', '.css', '.less', '.scss', '.sass'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        Components: path.resolve(__dirname, 'src/components/'),
        Config: path.resolve(__dirname, 'src/config/'),
        Constants: path.resolve(__dirname, 'src/constants/'),
        Fonts: path.resolve(__dirname, 'src/fonts/'),
        Hooks: path.resolve(__dirname, 'src/hooks/'),
        Images: path.resolve(__dirname, 'src/images/'),
        Layouts: path.resolve(__dirname, 'src/layouts/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
        Public: path.resolve(__dirname, 'public/'),
        Router: path.resolve(__dirname, 'src/router/'),
        Store: path.resolve(__dirname, 'src/store/'),
        Services: path.resolve(__dirname, 'src/services/'),
        Styles: path.resolve(__dirname, 'src/styles/'),
        Utils: path.resolve(__dirname, 'src/utils/')
      }
    },
    optimization: {
      splitChunks: {
        minSize: 10,
        minChunks: 1,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      emitOnErrors: false
    },
    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        /**
         * webpack按顺序查找匹配的loader
         */
        oneOf: [{
          /**
           * 主项目js
           */
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        }, {
          /**
           * 主项目样式
           */
          test: /\.(css|less)$/,
          include: path.resolve(__dirname, 'src'),
          oneOf: [{
            /**
             * 针对 cssModule
             */
            resourceQuery: /module/,
            use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            }, {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                modules: {
                  localIdentName: '[local]__[hash:base64:5]'
                }
              }
            }, 
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }, {
              loader: 'style-resources-loader',
              options: {
                patterns: path.resolve(__dirname, './src/styles/theme.less')
                // injector: 'append'
              }
            }]
          }, {
            /**
             * 针对非 cssModule
             */
            use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            }, 
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }, {
              loader: 'style-resources-loader',
              options: {
                patterns: path.resolve(__dirname, './src/styles/theme.less')
                // injector: 'append'
              }
            }]
          }]
        }, {
          /**
           * 第三方样式
           */
          test: /\.(css|less)$/,
          exclude: path.resolve(__dirname, 'src'),
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        }, {
          /**
           * 全局图片
           */
          test: /\.(bmp|png|jpg|jpeg|gif|svg)$/,
          exclude: path.resolve(__dirname, 'src/fonts'),
          type: 'asset/resource',
          generator: {
            filename: `${ASSETS_PATH}/images/[name].${CONTENT_HASH}[ext]`
          }
        }, {
          /**
           * 全局字体
           */
          test: /\.(woff|woff2|eot|ttf|svg|ttc)$/,
          type: 'asset/resource',
          generator: {
            filename: `${ASSETS_PATH}/fonts/[name].${CONTENT_HASH}[ext]`
          }
          // 新 loader 需要加在 file-loader 之前
        }]
      }]
    },
    plugins: [
      // 编译进度条
      new WebpackBarPlugin(),
      // 清除编译目录
      new CleanWebpackPlugin(),
      // JS规范校验
      new ESLintPlugin({
        fix: true,
        cache: true,
        extensions: ['js', 'vue'],
        overrideConfigFile: `.eslintrc${env === 'development' ? '' : '.prod'}.js`
      }),
      // CSS规范校验
      new StyleLintPlugin({
        context: 'src',
        files: '**/*.{css,less,vue,html}',
        fix: true,
        cache: true,
        failOnError: false
      }),
      // make sure to include the plugin for the magic
      new VueLoaderPlugin(),
      // 样式提取插件
      new MiniCssExtractPlugin({
        filename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.css`,
        chunkFilename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.chunk.css`,   // chunk css file
        ignoreOrder: true
      }),
      // 用于文件拷贝
      new CopyWebpackPlugin({
        patterns: [{
          from: './public',
          toType: 'dir'
        }]
      }),
      // moment 库减重插件
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn']
      }),
      // index.html 模板插件
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/template.ejs',
        faviconPath: publicPath + 'favicon.ico'
      }),
      // 配置全局变量
      new DotenvPlugin({
        path: env === 'development' ? '.env.development' : '.env',
        expand: true
      }),
      // 文件大小写检测
      new CaseSensitivePathsPlugin()
    ]
  };
}
