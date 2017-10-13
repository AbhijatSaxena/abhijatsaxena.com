var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
// var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
var remotePath = '/htdocs/';
    var conn = ftp.create({
        host: 'ftp.byethost14.com',
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        log: gutil.log
    });
    gulp.src(['index.html', './**/*.css'])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
});