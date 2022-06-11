import gulp_pug from 'gulp-pug';
import gulp_vn from 'gulp-version-number'; // добавляет хеш в виде времени к файлам стилей и скрипта
import gulp_webp from 'gulp-webp-html-nosvg'; // оборачивает в тег picture картинки


export const t_pug = () => {
  return app.gulp.src(app.path.src.pug)

    // обработчик ошибок (подсвечивает ошибки цветом и поясняет откуда они)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'pug',
        message: 'Error: <%= error.message %>'
      })
    ))

    // Pug
    .pipe(gulp_pug({
      // сжатие html файла
      pretty: true,
      // показывать в терминале какой файл обработан
      verbose: true,
    }))

    // заменяем пути
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.replace(/@scss\//g, 'scss/'))
    .pipe(app.plugins.replace(/@js\//g, 'js/'))
    .pipe(app.plugins.replace(/@css\//g, 'css/'))

    // ---------------------------------
    // добавляем обертки для картинок в webp
    .pipe(app.plugins.gulp_if(
      app.is_prod,
      gulp_webp()
    ))

    // ---------------------------------
    // добавляем хеш к названию файлов стилей и скриптов
    .pipe(
      gulp_vn({
        'value': '%MD5%',
        'append': {
          'key': '_hash',
          'cover': 0,
          'to': ['css', 'js'],
        },
        'output': {
          'file': 'gulp_files/version.json',
        }
      })
    )
    // в режиме продакшена копируем в соответствующую папку
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.html)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.html)
    ))

    // запускаем обновление браузера
    .pipe(app.plugins.browser_sync.stream())
}