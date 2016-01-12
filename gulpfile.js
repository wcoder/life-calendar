var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('build', function(callback) {
 	runSequence(
		'build-clean',
		'build-js',
		'build-css',
		callback);
});

gulp.task('build-clean', function() {
	return gulp.src('dist').pipe(clean());
});

gulp.task('build-js', function() {
	gulp.src([
		'vendor/jspdf/jspdf.min.js',
		'vendor/sdate/sdate.js',
		'src/life-calendar.js',
		'src/app.js'
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'))
});

gulp.task('build-css', function() {
	return gulp.src([
		'vendor/bootstrap/css/bootstrap.min.css',
		'src/main.css'
	])
	.pipe(concat('styles.min.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('dist'));
});

