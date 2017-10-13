var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {

    process.stdout.write("Hello");

    var remotePath = '/public_html/';
    var conn = ftp.create({
        host: 'ftp.byethost14.com',
        user: args.user,
        password: args.password,
        log: gutil.log
    });
    gulp.src(['index.html', './**/*.css'])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
});