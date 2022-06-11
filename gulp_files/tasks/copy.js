export const t_copy = () => {
  // src() -> создаем поток для чтения файлов по указанному пути 
  return app.gulp.src(app.path.src.files)
    // dest() -> создаем поток для записи файлов по указанному пути 
    .pipe(app.gulp.dest(app.path.dev.files))
    // .pipe(app.gulp.dest(app.path.prod.files))
} 