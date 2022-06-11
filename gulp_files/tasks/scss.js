import sass from 'sass';
// плагин запускает препроцессор
import gulp_sass from 'gulp-sass';

// переименовываем итоговый файл стилей
import gulp_rename from 'gulp-rename';

//сжатие CSS файла
import cleanCss from 'gulp-clean-css';
// Вывод WebP изображение
import webpcss from 'gulp-webpcss';
// Добавление кроссбраузерных префиксов
import autoprefixer from 'gulp-autoprefixer';
// Группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';

// запускаем препроцессов sass
const res_sass = gulp_sass(sass);

export const t_scss = () => {
  return app.gulp.src(app.path.src.scss, {
      sourcemaps: app.is_dev
    })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'scss',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(res_sass({
      outputStyle: 'expanded',
    }))

    // ---------------------------------
    // объединение медиа запросов
    .pipe(groupCssMediaQueries())

    // добавление класса к корневому элементу страницы (body webp или body no-webp)
    .pipe(app.plugins.gulp_if(
      app.is_prod, webpcss({
        // для работы требуется джава скрипт код, 
        // который будет определять поддерживается или нет webp
        // дополнительно требуется установка плагина webp-converter@2.2.3
        webpClass: '.is-webp',
        noWebpClass: '.no-webp'
      })
    ))

    // добавление префиксов к свойствам
    .pipe(autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      })
    )
    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.css)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.css)
    ))

    // ---------------------------------
    // добавляем выгрузку, чтобы видеть несжатый файл, потом сжимаем и получаем 2й файл
    .pipe(cleanCss())
    .pipe(gulp_rename({
      extname: '.min.css',
    }))

    .pipe(app.plugins.gulp_if(
      app.is_prod, app.gulp.dest(app.path.prod.css)
    ))
    .pipe(app.plugins.gulp_if(
      app.is_dev, app.gulp.dest(app.path.dev.css)
    ))

    // запускаем обновление браузера
    .pipe(app.plugins.browser_sync.stream());
}