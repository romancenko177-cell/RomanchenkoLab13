const gulp = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const { deleteAsync } = require('del');

function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}

function concatCSS() {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('combined.css'))
        .pipe(gulp.dest('dist/css'));
}

function minifyCSS() {
    return gulp.src('dist/css/**/*.css')
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
}

function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
}

function images() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

function clean() {
    return deleteAsync(['dist']);
}

function watchFiles() {
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/css/**/*.css', concatCSS);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/images/**/*', images);
}

const build = gulp.series(
    clean,
    gulp.parallel(styles, concatCSS, scripts, images),
    minifyCSS
);

exports.styles = styles;
exports.concatCSS = concatCSS;
exports.minifyCSS = minifyCSS;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.watch = gulp.series(build, watchFiles);
exports.build = build;
exports.default = build;
