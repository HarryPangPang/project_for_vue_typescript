/**
 * *@describe vue-cli 3.x配置文件
 */

/* eslint-disable  */
const path = require('path');
const glob = require('glob');
const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // gzip压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // JS代码压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css压缩
const PurgecssPlugin = require('purgecss-webpack-plugin'); // 去除无用css
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Webpack包文件分析器
const package = require('./package.json');
// 是否为生产环境
const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);

// 本地环境是否需要使用cdn
const devNeedCdn = process.argv.includes('-cdn');
const needAnalyzer = process.argv.includes('-report');
const needVconsole = process.argv.includes('-vconsole');

// const baseUrl = process.env.NODE_ENV === "production" ? "/static/" : "/"; //font,scss资源路径不同环境切换控制
const PATHS = {
  src: path.join(__dirname, 'src'),
};
const CDNPATH = `https://freefiremobile-a.akamaihd.net/common/web_event/${package.name}`;

module.exports = {
  // 基本路径
  publicPath: './',

  // 输出文件目录
  outputDir: 'dist',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // assetsDir: 'static',
  // 以多页模式构建应用程序。
  pages: undefined,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  // eslint-disable-next-line global-require
  parallel: require('os').cpus().length > 1,

  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,

  // webpack配置
  // 对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain
  chainWebpack: (config) => {
    config.module
      .rule('images')
      // .use('image-webpack-loader')
      // .loader('image-webpack-loader')
      .test(/\.(jpg|png|gif|jpeg)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        bypassOnDebug: true,
        // 不压缩成base64
        limit: 1,
        // 根据环境使用cdn或相对路径
        publicPath: isProduction && devNeedCdn ? CDNPATH : undefined,
        // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
        outputPath: 'images',
        // 配置打包后图片文件名
        name: '[name].[ext]',
      })
      .end();
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end();
  },

  // 调整 webpack 配置
  css: {
  	// 启用 CSS modules
  	requireModuleExtension: false,
  	// 是否使用css分离插件
  	extract: true,
  	// 开启 CSS source maps，一般不建议开启
  	// eslint-disable-next-line no-tabs
  	sourceMap: true,
  	// css预设器配置项
  	loaderOptions: {
  		scss: {
  			// 设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
  			prependData: '@import "~@/assets/css/index.scss";',
  		},
  	},
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  configureWebpack: (config) => {
    // 生产环境
    const pluginsPro = [
      new UglifyJsPlugin({
        uglifyOptions: {
          // 生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log'],
          },
        },
        sourceMap: false,
        parallel: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
      new CompressionWebpackPlugin({
        // 文件开启Gzip
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ];
    	// Webpack包文件分析器
    if (isProduction && needAnalyzer) {
      pluginsPro.push(new BundleAnalyzerPlugin());
    }
    // 开发环境
    const pluginsDev = [
      // // 移动端模拟开发者工具(https://github.com/Tencent/vConsole)
      // new vConsolePlugin({
      //   filter: [], // 需要过滤的入口文件
      //   enable: true, // 发布代码前记得改回 false
      // }),
    ];
    if (needVconsole && !isProduction) {
      pluginsDev.push(
        // 移动端模拟开发者工具(https://github.com/Tencent/vConsole)
        new vConsolePlugin({
          filter: [], // 需要过滤的入口文件
          enable: true, // 发布代码前记得改回 false
        }),
      );
    }
    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'app',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true,
          },
          runtimeChunk: {
            name: 'manifest',
          },
        },
      },
    };
    if (isProduction) {
      // 为生产环境修改配置
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 为开发环境修改配置
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  },
};
