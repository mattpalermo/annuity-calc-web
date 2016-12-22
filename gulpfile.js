const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const gutil = require("gulp-util");
const webpack = require("webpack");

gulp.task("build", ["webpack:build", "process-styles"]);

gulp.task('process-styles', function(){
  return gulp.src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task("webpack:build", function(callback) {
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
