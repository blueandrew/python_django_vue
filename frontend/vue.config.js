const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/python_django_vue/frontend/' : '/',
  transpileDependencies: true,
  assetsDir: 'dist',
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
