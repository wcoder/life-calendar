const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('clean', () => {
	return gulp.src('dist').pipe(clean());
});

gulp.task('scripts', () => {
	return gulp.src([
		'src/vendor/jspdf/jspdf.min.js',
		'src/vendor/sdate/sdate.js',
		'src/js/life-calendar.js',
		'src/js/app.js'
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'))
});

gulp.task('styles', () => {
	return gulp.src([
		'src/vendor/bootstrap/css/bootstrap.min.css',
		'src/css/main.css'
	])
	.pipe(concat('styles.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
	return gulp.src('src/index.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

gulp.task('build',
	gulp.series(
		'clean',
		'scripts',
		'styles',
		'html',
	)
);

gulp.task('default', gulp.series('build'));
