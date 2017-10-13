var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');

gulp.task('deploy', function() {
    var remotePath = '/htdocs/';
    var conn = ftp.create({
        host: 'ftp.byethost14.com',
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
            '!deploy.sh',
            '!gulpfile.js',
            '!package-lock.json',
            '!package.json',
            '!startup.js',
            './**/*.*'
        ])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
    });
});