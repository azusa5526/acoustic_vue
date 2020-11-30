module.exports = {
  publicPath: '/acoustic_vue/',
  configureWebpack: (config) => {
    config.module.rules.push({
      test: require.resolve('jquery'),
      loader: 'expose-loader',
      options: {
        exposes: ['$', 'jQuery']
      }
    });
  }
};
