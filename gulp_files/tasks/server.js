export const t_server = (done) => {
  app.plugins.browser_sync.init({
    server: {
      baseDir: `${app.path.dev.html}`
    },
    notify: false,
    port: 5050,
  })
}