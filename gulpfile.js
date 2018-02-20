var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var prettier = require('gulp-prettier');
// const eslint = require('gulp-eslint');

// gulp.task('lint', () => {
//     // ESLint ignores files with "node_modules" paths.
//     // So, it's best to have gulp ignore the directory as well.
//     // Also, Be sure to return the stream from the task;
//     // Otherwise, the task may end before the stream has finished.
//     return gulp.src(['**/*.js','!node_modules/**'])
//         // eslint() attaches the lint output to the "eslint" property
//         // of the file object so it can be used by other modules.
//         .pipe(eslint())
//         // eslint.format() outputs the lint results to the console.
//         // Alternatively use eslint.formatEach() (see Docs).
//         .pipe(eslint.format())
//         // To have the process exit with an error code (1) on
//         // lint error, return the stream and pipe to failAfterError last.
//         .pipe(eslint.failAfterError());
// });

gulp.task('prettier', () => {
    gulp.src('js/app.js')
    .pipe(prettier({useFlowParser: true}))
    .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function () {
    gulp.src('scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(autoprefixer({
        			browsers: ['last 2 versions']
        		}))
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync', 'prettier'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['prettier']);
});
