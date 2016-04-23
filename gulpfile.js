const del = require('del')
const gulp = require('gulp');
const path = require('path')
const plugins = require('gulp-load-plugins')();

const buildDirectory = path.join(__dirname, 'build');
const testDirectory = path.join(buildDirectory, '/test')

gulp.task('clean', (done) => {
  del([buildDirectory]).then(() => done())
})

gulp.task('build', ['clean'], () => {
  return gulp.src('src/*.js')
    .pipe(plugins.babel())
    .pipe(gulp.dest(buildDirectory))
})

gulp.task('test', ['build'], (cb) => {
  gulp.src(['test/*.js'])
    .pipe(plugins.babel())
    .pipe(gulp.dest(testDirectory))
    .on('finish', () => {
			gulp.src([testDirectory + '/*.js'])
				.pipe(plugins.mocha())
				.on('end', cb);
		});
})

gulp.task('default', ['build']);
