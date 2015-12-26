var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync');

function streamError(err) {
  gutil.beep();
  gutil.log(err instanceof gutil.PluginError ? err.toString() : err.stack);
}

gulp.task('browser-sync', ['sass', 'build'], function () {
  browserSync({
    server:{
      baseDir: '..'
    }
  });
})

gulp.task('build', function () {
  gulp.src('pages/*.html')
      .pipe(wrap({src:'layout/default.html'}))
      .pipe(gulp.dest('..'));
});

gulp.task('rebuild', ['build'], function () {
    browserSync.reload();
});


gulp.task('sass',function(){
    gulp.src('styles/**/*.scss')
        .pipe(plumber({errorHandler: streamError}))
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('../styles'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
  gulp.watch(['**/*.html'], ['build']);
  gulp.watch(['styles/*.scss'], ['sass']);
})

gulp.task('default', ['browser-sync', 'watch']);
