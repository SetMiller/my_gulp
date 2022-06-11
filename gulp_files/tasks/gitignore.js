import fs from 'fs';

export const t_gitignore = () => {
	if (!fs.existsSync('.gitignore')) {
		fs.writeFile('./.gitignore', '', cb);
		fs.appendFile('./.gitignore', 'package-lock.json\r\n', cb);
		fs.appendFile('./.gitignore', 'blank_templates/\r\n', cb);
		fs.appendFile('./.gitignore', 'node_modules/\r\n', cb);
		fs.appendFile('./.gitignore', '.gitignore\r\n', cb);
		fs.appendFile('./.gitignore', 'src/\r\n', cb);
		fs.appendFile('./.gitignore', 'gulp_files/\r\n', cb);
		fs.appendFile('./.gitignore', 'dev/\r\n', cb);
		// fs.appendFile('./.gitignore', 'version.json\r\n', cb);
		// fs.appendFile('./.gitignore', '**/*.zip\r\n', cb);
		// fs.appendFile('./.gitignore', '**/*.rar\r\n', cb);
		//if (projectName !== 'flsStart') del('./.git/');
	}
	return app.gulp.src(`${app.path.src_folder}`);
}
function cb() { }