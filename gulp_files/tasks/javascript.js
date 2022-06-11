import webpack_stream from 'webpack-stream'

export const t_javascript = () => {
  return app.gulp.src(app.path.src.js, {
      sourcemaps: app.is_dev
    })

    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'javascript',
        message: 'Error: <%= error.message %>'
      })
    ))

    .pipe(webpack_stream({
      mode: app.is_dev ? 'development' : 'production',
      output: {
        filename: 'app.min.js'
      }
    }))
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.js)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.js)
    ))
    .pipe(app.plugins.browser_sync.stream())
}