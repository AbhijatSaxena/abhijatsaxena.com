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
            '!gulpfile.js',
            '!LICENSE',
            '!package.json',
            '!package-lock.json',
            '!README.md',
            './**/*.*'
        ], {base : 'app', buffer: false})
        .pipe(conn.dest(remotePath));
    });
});