var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var wrap = require('gulp-wrap');

function streamError(err) {
  gutil.beep();
  gutil.log(err instanceof gutil.PluginError ? err.toString() : err.stack);
}

gulp.task('build', function () {
  gulp.src('pages/*.html')
      .pipe(wrap({src:'layout/default.html'}))
      .pipe(gulp.dest('..'));
})

gulp.task('sass',function(){
    gulp.src('styles/main.scss')
        .pipe(plumber({errorHandler: streamError}))
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('../styles'));
});

gulp.task('watch', function () {
  gulp.watch(['**/*.html'], ['build']);
  gulp.watch(['styles/*.scss'], ['sass']);
})

gulp.task('default', ['sass', 'build', 'watch']);
