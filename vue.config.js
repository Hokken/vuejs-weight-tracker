module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: "./srv"
    },
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000/",
          changeOrigin: true
        }
      }
    }
  }
};
