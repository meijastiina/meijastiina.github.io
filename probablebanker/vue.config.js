module.exports = {
    // This is needed because the server runs in different port than the client
    devServer: {
      proxy: 'http://localhost:8080'
    },
    configureWebpack: {
        devtool: 'source-map'
      }
  }