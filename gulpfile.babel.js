import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import minifyCss from 'gulp-minify-css';
import uglify from 'gulp-uglify'
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import livereload from 'gulp-livereload';

const dirs = {
  src: './src',
  dest: './build/assets'
};

const sassPaths = {
  src: `${dirs.src}/styles/*.sass`,
  dest: `${dirs.dest}/styles/`
};

const jsPaths = {
  src: `${dirs.src}/js/**/*.js`,
  dest: `${dirs.dest}/js`
};

gulp.task('default', ['babel', 'sass', 'watch']);

gulp.task('sass', function(done) {
  gulp.src(sassPaths.src)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(autoprefixer(
      {
        browsers: [
          '> 1%',
          'last 2 versions',
          'firefox >= 4',
          'safari 7',
          'safari 8',
          'IE 8',
          'IE 9',
          'IE 10',
          'IE 11'
        ],
        cascade: false
      }
    ))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(livereload(
      {
        start: true
      }
    ))
    .on('end', done);
});

gulp.task("babel", function() {
  return gulp.src(jsPaths.src)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsPaths.dest));
});

// gulp.task('autoprefixer', function () {
//     var postcss      = require('gulp-postcss');
//     var sourcemaps   = require('gulp-sourcemaps');
//     var autoprefixer = require('autoprefixer');
//
//     return gulp.src('./www/min_css/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./www/css'));
// });

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(jsPaths.src, ['babel']);
  gulp.watch(sassPaths.src, ['sass']);
});
