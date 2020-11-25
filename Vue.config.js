module.exports = {
  configureWebpack: (config) => {
    // 添加 loader
    config.module.rules.push({
      // 处理jquery
      test: require.resolve('jquery'),
      loader: 'expose-loader',
      options: {
        exposes: ['$', 'jQuery']
      }
    });
  }
};
