// поиск и замена
import replace from 'gulp-replace';

// обработка ошибок
import plumber from 'gulp-plumber';

// вывод сообщений и подсказор
import notify from 'gulp-notify';

// локальный сервер
import browser_sync from 'browser-sync';

// проверяет действительно ли обновилась картинка
import gulp_newer from 'gulp-newer'

// условное ветвление
import gulp_if from 'gulp-if'


// Экспортируем объект
export const plugins = {
  replace,
  plumber,
  notify,
  browser_sync,
  gulp_newer,
  gulp_if
}