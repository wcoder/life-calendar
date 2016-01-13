var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var minifyHTML = require('gulp-minify-html');

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('build', function(callback) {
 	runSequence(
		'build-clean',
		'build-js',
		'build-css',
		'build-html',
		callback);
});

gulp.task('build-clean', function() {
	return gulp.src('dist').pipe(clean());
});

gulp.task('build-js', function() {
	gulp.src([
		'src/vendor/jspdf/jspdf.min.js',
		'src/vendor/sdate/sdate.js',
		'src/js/life-calendar.js',
		'src/js/app.js'
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'))
});

gulp.task('build-css', function() {
	return gulp.src([
		'src/vendor/bootstrap/css/bootstrap.min.css',
		'src/css/main.css'
	])
	.pipe(concat('styles.min.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('dist'));
});

gulp.task('build-html', function() {
	return gulp.src('src/index.html')
		.pipe(minifyHTML({ empty: true }))
		.pipe(gulp.dest('dist'));
});
