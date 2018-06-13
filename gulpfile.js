var gulp = require('gulp');
var responsive = require('gulp-responsive');
var minifyJS = require('gulp-minify');
var minifyInline = require('gulp-minify-inline');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

gulp.task('responsive-img', function () {
    return gulp.src('img/*.jpg').pipe(responsive({
        '*': [{
            width: 300,
            quality: 50,
            rename: {
                suffix: '-300px',
                extname: '.jpg'
            },
            withoutEnlargement: true
        }, {
            width: 600,
            quality: 50,
            rename: {
                suffix: '-600px',
                extname: '.jpg'
            },
            withoutEnlargement: true
        }, {
            width: 800,
            quality: 50,
            rename: {
                suffix: '-800px',
                extname: '.jpg'
            },
            withoutEnlargement: true
        }]
    })).pipe(gulp.dest('dist'));
});


gulp.task('minify-inline', function () {
    return gulp.src('*.html')
        .pipe(minifyInline())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function () {
    return gulp.src('js/*.js')
        .pipe(minifyJS({
            ext: {
                src: '-debug.js',
                min: '.js'
            }
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-sw-js', function () {
    return gulp.src('sw.js')
        .pipe(minifyJS({
            ext: {
                src: '-debug.js',
                min: '.js'
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("minify-img", function () {
    return gulp.src('img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['minify-inline', "minify-css", "minify-js", "minify-sw-js", "minify-img"]);


