module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: "./server"
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
