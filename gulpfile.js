const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const path = require('path');
const gutil = require("gulp-util");
const webpack = require("webpack");

gulp.task("build", ["clientjs:build", "styles:build"]);
gulp.task("watch", ["styles:watch", "clientjs:watch", "serve:watch"]);

gulp.task('styles:build', function(){
  return gulp.src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('styles:watch', function() {
  let watcher = gulp.watch('src/**/*.scss', ['styles:build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', rebuilding styles...');
  });
});

gulp.task("clientjs:build", function(callback) {
	const config = require('./webpack.config.js');
  config.devtool = 'sourcemap';
  config.debug = true;

	// run webpack
	webpack(config, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		/*gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));*/
		callback();
	});
});

gulp.task("clientjs:watch", function() {
  let watcher = gulp.watch('src/**/*.js', ['clientjs:build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', rebuilding client js...');
  });
});

gulp.task('serve:watch', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["src/**/*.*"],
    port: 5000
  });
});

gulp.task('nodemon', function(cb) {
  let started = false;
  return nodemon({
    script: 'src/server.js'
  }).on('start', function(){
    if (!started) {
      cb();
      started = true;
    }
  });
});
