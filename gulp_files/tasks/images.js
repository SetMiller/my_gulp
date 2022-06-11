import gulp_webp from 'gulp-webp'
import gulp_imagemin from 'gulp-imagemin'

export const t_images = () => {
  return app.gulp.src(app.path.src.img)

    // обработчик ошибок (подсвечивает ошибки цветом и поясняет откуда они)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'images',
        message: 'Error: <%= error.message %>'
      })
    ))

    // ---------------------------------
    // проверяем что картинки обновились
    .pipe(app.plugins.gulp_newer(app.path.dev.img))

    // переконвертируем в webp
    .pipe(app.plugins.gulp_if(
      app.is_prod, gulp_webp()
    ))
    // копируем в папку
    
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.img)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.img)
    ))

    // ---------------------------------
    // читаем снова картинки
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.src(app.path.src.img)
    ))
    // проверяем что картинки обновились
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.plugins.gulp_newer(app.path.dev.img)
    ))
    // сжимаем их
    .pipe(app.plugins.gulp_if(
      app.is_prod, gulp_imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        interplace: true,
        optimizationLevel: 3 // 0 to 7
      })
    ))
    // копируем в папку
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.img)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.img)
    ))

    // ---------------------------------
    // обрабатываем svg
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.img)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.img)
    ))

    // ---------------------------------
    // запускаем обновление браузера
    .pipe(app.plugins.browser_sync.stream())
}