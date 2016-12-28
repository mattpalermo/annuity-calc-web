const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const webpack = require("webpack");
const webpackconfig = require("./webpack.config");
const del = require('del');
const fork = require('child_process').fork;
const gutil = require('gulp-util');

let paths = {
  scripts: 'src/**/*.js',
  styles: 'src/styles/**/*.scss',
  static: 'dist',
};

// modules
let modpaths = {
  server: './src/server',
  servescript: './scripts/serve'
};

gulp.task('build', ['build:styles', 'build:clientjs']);
gulp.task('clean', function() {
  return del(['dist']);
});
gulp.task('serve', function(done) {
  fork(modpaths.servescript, [], {
    stdio: [0, 1, 2, 'ipc']
  })
	.on('exit', function(){
    done();
  });
});
gulp.task('watch', [
  'watch:browser',
  'watch:serve',
  'watch:styles',
  'watch:clientjs'
]);

gulp.task('build:styles', function(){
  return gulp.src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/'));
});
gulp.task("build:clientjs", function(callback) {
	const config = webpackconfig;
  config.devtool = 'sourcemap';
  config.debug = true;
	webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        /*gutil.log("[webpack]", stats.toString({
            // output options
        }));*/
        callback();
    });
});

gulp.task('watch:browser', function(){
  browserSync.init({
    // Perhaps the port should be derived from something?
    proxy: "http://localhost:4000",
    files: paths.static,
    ghostMode: false
  });
});
gulp.task('watch:serve', function(){
  return nodemon({
    script: modpaths.servescript,
    watch: paths.scripts
  }).on('start', function(){
    browserSync.reload();
  });
});
gulp.task('watch:styles', ['build:styles'], function(){
  gulp.watch(paths.styles, ['build:styles']);
});
gulp.task('watch:clientjs', ['build:clientjs'], function(){
  gulp.watch(paths.scripts, ['build:clientjs']);
});
