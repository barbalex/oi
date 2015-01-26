/* browserify task
 ---------------
 Bundle javascripty things with browserify!

 If the watch task is running, this uses watchify instead
 of browserify for faster bundling using caching.
 */

var browserify = require('browserify'),
    gulp       = require('gulp'),
    source     = require('vinyl-source-stream');

gulp.task('browserify', function () {
    return browserify('./src/oi.js')
        .bundle()
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('oi_browserified.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./src'));
});