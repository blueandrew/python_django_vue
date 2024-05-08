const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'gitHub' ? process.env.PUBLIC_PATH : '/',
  transpileDependencies: true,
  assetsDir: 'static',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "Vue Project-Blog",
    },
  },
})
