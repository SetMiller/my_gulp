import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


// конвертация из otf в ttf
export const t_otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return app.gulp.src(`${app.path.src_folder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})))
		// Конвертируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Выгружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.src_folder}/fonts/`))
}

// конвертация из ttf в woff и woff2
export const t_ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.src_folder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})))
		// Конвертируем в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Выгружаем в исходную папку с результатом
		.pipe(app.plugins.gulp_if(
			app.is_prod, app.gulp.dest(`${app.path.prod.fonts}`)
		))
		.pipe(app.plugins.gulp_if(
			app.is_dev, app.gulp.dest(`${app.path.dev.fonts}`)
		))
		// Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.src_folder}/fonts/*.ttf`))
		// Конвертируем в .woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатом
		.pipe(app.plugins.gulp_if(
			app.is_prod, app.gulp.dest(`${app.path.prod.fonts}`)
		))
		.pipe(app.plugins.gulp_if(
			app.is_dev, app.gulp.dest(`${app.path.dev.fonts}`)
		))
		// .pipe(app.gulp.dest(`${app.path.dev.fonts}`));
}

// вносим запись в файл стилей
export const t_fonstStyle = () => {
	let fontsFile = `${app.path.src_folder}/scss/fonts/fonts.scss`;
	// Если передан флаг --rewrite удаляем файл подключения шрифтов
	// app.isFontsReW ? fs.unlink(fontsFile, cb) : null;
	// Проверяем существуют ли файлы шрифтов
	let fontpath = app.is_dev ? app.path.dev.fonts: app.path.prod.fonts
	fs.readdir(fontpath, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						switch (fontWeight.toLowerCase()) {
							case 'thin':
								fontWeight = 100;
								break;
							case 'extralight':
								fontWeight = 200;
								break;
							case 'light':
								fontWeight = 300;
								break;
							case 'medium':
								fontWeight = 500;
								break;
							case 'semibold':
								fontWeight = 600;
								break;
							case 'bold':
								fontWeight = 700;
								break;
							case 'extrabold':
								fontWeight = 800;
								break;
							case 'heavy':
								fontWeight = 800;
								break;
							case 'black':
								fontWeight = 900;
								break;
							default:
								fontWeight = 400;
						}

						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log("Файл scss/fonts/fonts.scss уже существует. Для обновления файла нужно его удалить!");

			}
		} else {
			// Если шрифтов нет
			fs.unlink(fontsFile, cb)
		}
	});
	return app.gulp.src(`${app.path.src_folder}`);
}

function cb() {}