var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cache = require('gulp-memory-cache');
let cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var es2015 = require('@babel/preset-env');



var paths = {
  styles: {
    src: './src/less/**/*.less',
    dest: 'dist/',
    name: 'style.css'
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: 'dist/',
    name: 'main.js'
  }
};

function styles() {
  console.log('start less task');
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(cache('less'))
    .pipe(less())
    .pipe(concat(paths.styles.name))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  console.log('start js task');
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(cache('js'))
    .pipe(concat(paths.scripts.name))
    .pipe(babel({ presets: [es2015] }))
    //.pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

gulp.task('less', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
