var gulp = require('gulp');
var responsive = require('gulp-responsive');

gulp.task('default', function () {
    return gulp.src('img/*.jpg').pipe(responsive({
        '*': [{
            width: 300,
            quality: 50,
            rename: {
                suffix: '-300px',
                extname: '.jpg'
            },
            withoutEnlargement: true
        },{
            width: 600,
            quality: 50,
            rename: {
                suffix: '-600px',
                extname: '.jpg'
            },
            withoutEnlargement: true
        },{
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