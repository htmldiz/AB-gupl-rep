var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed')
var cssnano = require('gulp-cssnano')
var del = require('del')
var gulp = require('gulp')
var gulpIf = require('gulp-if')
var imagemin = require('gulp-imagemin')
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var purifycss = require('gulp-purifycss');
var runSequence = require('run-sequence')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var useref = require('gulp-useref')
var packageFile = require('./package.json')
var flatten = require('gulp-flatten')
var file = require('gulp-file')
var concat = require('gulp-concat-util')
var concatCss = require('gulp-concat-css')
var fileinclude = require('gulp-file-include')
var cleanCSS = require('gulp-clean-css');
var foreach = require("gulp-foreach");
var devPaths = {
  nodeFolder: 'node_modules/',
  allCss: 'src/scss/npmdep.scss',
  scss: 'src/scss/',
  css: 'src/css/',
  scripts: 'src/js/',
  images: 'src/img/*',
  fonts: 'src/fonts/',
  html: 'src/',
  footerFolder: 'src/',
  footerTpl: 'src/*.html'
}
var distPaths = {
  root: 'dist/',
  css: 'dist/css/',
  scripts: 'dist/js/',
  images: 'dist/img/',
  fonts: 'dist/fonts/',
  html: 'dist/',
  footerFolder: 'dist/'
}
var flags = {
  production: false
}

gulp.task('sass', function() {
  return gulp.src(devPaths.scss + '**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({ browsers: [
    'last 2 versions', 
    'android 4',
    'opera 15'] }))
  .pipe(changed(devPaths.css, { hasChanged: changed.compareSha1Digest }))
  .pipe(gulp.dest(devPaths.css))
})

gulp.task('npmdepStyles', function () {
  return gulp.src(devPaths.allCss)
  .pipe(gulp.dest(devPaths.scss))
})

gulp.task('npmdepScripts', function () {
  return gulp.src(devPaths.footerTpl)
  .pipe(gulp.dest(devPaths.footerFolder))
})

gulp.task('fonts', function() {
  dependenciesLength = packageFile.dependencies.length;
  dependencies = packageFile.dependencies;
  for (var index in dependencies) {
    gulp.src(devPaths.nodeFolder+index+'**/fonts/*.{otf,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(devPaths.fonts))
  }
})
gulp.task('npmdep', function(callback) {
  runSequence('npmdepStyles', 'npmdepScripts',
    callback
    )
})
gulp.task('watch', function() {
  gulp.watch(devPaths.scss + '**/*.scss', function() {
    return gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(changed(devPaths.html, {extension: '.js'}))
    ;
  })
  
  gulp.watch([devPaths.html+'css/*.css'] , function() {
    return runSequence(['css_change'], 'js_change',
    );
  });
  gulp.watch([devPaths.html+'*.js',devPaths.html+'js/*.js'] , function() {
    return runSequence(['css_change'], 'js_change',
    );
  });
  gulp.watch(devPaths.scss + '*.scss', ['sass'])
  gulp.watch(devPaths.scss + '/*.scss', ['sass'])
  gulp.watch(['package.json'], ['npmdep'])
})
gulp.task('css_change', function() {
  return gulp.src(devPaths.html+'css/*.css')
  .pipe(useref())
  .pipe(cssnano({zindex: false}))
  .pipe(cleanCSS(devPaths.html+'css/all.css'))
  .pipe(gulp.dest('src/css/'))
  .pipe(changed(devPaths.html, {extension: '.js'}));
})

gulp.task('js_change', function() {
    return gulp.src(devPaths.html+'/*.js')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('build/'));
})

gulp.task('useref', function() {
  return gulp.src(devPaths.footerTpl)
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano({zindex: false})))
  .pipe(gulp.dest(distPaths.footerFolder));
})

gulp.task('default', function(callback) {
  runSequence(['npmdep','sass', 'watch'], 'watch',
    callback
    )
})