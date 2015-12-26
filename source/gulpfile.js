var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

function streamError(err) {
  gutil.beep();
  gutil.log(err instanceof gutil.PluginError ? err.toString() : err.stack);
}

gulp.task('sass',function(){
    gulp.src('styles/main.scss')
        .pipe(plumber({errorHandler: streamError}))
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('../styles'));
});

gulp.task('cp',function () {
  gulp.src('index.html')
      .pipe(gulp.dest('..'));
});

gulp.task('watch', function () {
  gulp.watch(['*.html'], ['cp']);
  gulp.watch(['styles/*.scss'], ['sass']);
})

gulp.task('default', ['sass', 'cp', 'watch']);
