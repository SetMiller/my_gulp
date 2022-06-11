// подключаем основной модуль
import gulp from 'gulp';

// импортируем пути
import { path } from './gulp_files/config/path.js';
// импорт плагинов
import { plugins } from './gulp_files/config/plugins.js'


// глобальная переменная
global.app = {
  is_dev: !process.argv.includes('--prod'),
  is_prod: process.argv.includes('--prod'),
  gulp: gulp,
  path: path,
  plugins: plugins,
}

// импортируем задачи
import { t_clean_dev, t_clean_prod } from './gulp_files/tasks/clean_files.js';
import { t_pug } from './gulp_files/tasks/pug.js'
import { t_server } from './gulp_files/tasks/server.js'
import { t_scss } from './gulp_files/tasks/scss.js'
import { t_javascript } from './gulp_files/tasks/javascript.js'
import { t_images } from './gulp_files/tasks/images.js'
import { t_otfToTtf, t_ttfToWoff, t_fonstStyle } from './gulp_files/tasks/fonts.js'
import { t_gitignore } from './gulp_files/tasks/gitignore.js'


// наблюдатель за изменениями в файлах
function watcher() {
  // app.gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.pug, t_pug)
  gulp.watch(path.watch.scss, t_scss)
  gulp.watch(path.watch.js,t_javascript)
  gulp.watch(path.watch.img,t_images)
}

const fonts_prep = gulp.series(t_otfToTtf, t_ttfToWoff, t_fonstStyle)
const main_tasks = gulp.series(fonts_prep, t_pug, t_scss, t_javascript, t_images, t_gitignore)

const gitignore = gulp.series(t_gitignore)
// построение сценариев выполнения задач в режиме разработки
const dev = gulp.series(t_clean_dev, main_tasks, gulp.parallel(watcher, t_server));
const prod = gulp.series(t_clean_prod, main_tasks);

const clear_dev = gulp.series(t_clean_dev);
const clear_prod = gulp.series(t_clean_prod);


export { dev }
export { prod }
export { clear_dev }
export { clear_prod }
export { gitignore }






























// gulp.task('default', dev);
// gulp.task('clean_dev', clean_d);
// gulp.task('clean_prod', clean_p);

// const prod = gulp.parallel();
// выполнение задания по-умолчанию
// app.gulp.task('prod', function (cb) {
//   copy(app.path.prod.files)
//   cb()
// });
// app.gulp.task('dev', function (cb) {
//   copy(app.path.dev.files)
//   cb()
// });
// app.gulp.task('prod', prod);