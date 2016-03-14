var gulp     = require('gulp'),
    header   = require('gulp-header'),
    uglify   = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename   = require('gulp-rename'),
    package  = require('./package.json'),
    bannerJs,
    bannerCss;

banner = {
    js: '/*! ' +
        '<%= package.name %> ' +
        'v<%= package.version %> | ' +
        '(c) ' + new Date().getFullYear() + ' <%= package.author %> |' +
        ' <%= package.homepage %>' +
        ' */' +
        '\n',
    css: '/*\n' +
        'Style By: Qassim Hassan\n' +
        'Twitter: @QQQHZ\n' +
        'Websites: wp-time.com | qass.im | wp-plugins.in\n' +
        'Copyright (c) 2016 - Qassim Hassan\n' +
        'Adapted by: <%= package.author %> for <%= package.name %> v<%= package.version %> | <%= package.homepage %> ' +
        '*/\n'
}

gulp.task('compress:js', function() {
  return gulp.src('src/mediabox.js')
    .pipe(header(banner.js, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner.js, { package : package }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress:css', function() {
  return gulp.src('src/mediabox.css')
    .pipe(header(banner.css, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(header(banner.css, { package : package }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('src/mediabox.js', ['compress:js']);
    gulp.watch('src/mediabox.css', ['compress:css']);
});

gulp.task('default', ['compress:js', 'compress:css']);