var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');

gulp.task('deploy', function() {
    var remotePath = '/htdocs/';
    var conn = ftp.create({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        log: gutil.log
    });

    conn.rmdir(remotePath, function(){
        gulp.src([
            '!node_modules/**/*.*',
            '!.gitignore',
            '!.travis.yml',
            '!LICENSE',
            '!README.md',
            '!gulpfile.js',
            '!package-lock.json',
            '!package.json',
            './**/*.*'
        ], {base : 'app', buffer: false})
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
    });
});