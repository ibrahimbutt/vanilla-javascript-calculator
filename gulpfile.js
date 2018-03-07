/* eslint-disable */

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var babel = require("gulp-babel");

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
  return gulp.src('src/sass/*.sass')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task("default", function () {
  return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', ['pug', 'sass', 'browserSync'], function () {
  gulp.watch('src/pug/*.pug', ['pug']);
  gulp.watch('src/pug/*.pug', browserSync.reload);
  gulp.watch('dist/*.html', browserSync.reload);
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('src/js/*.js', browserSync.reload);
});