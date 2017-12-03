const gulp = require('gulp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const useref = require('gulp-useref');
const filter = require('gulp-filter');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

gulp.task('default',function(){
    var jsFilter=filter('**/*.js', {restore:true});
    var cssFilter=filter('**/*.css', {restore:true});
    var indexHtmlFilter=filter(['**/*', '!**/index.html'], {restore:true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
