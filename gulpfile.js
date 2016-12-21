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
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task("webpack:build", function(callback) {
	const config = {
    entry: './src/client',
    output: {
      path: path.resolve(__dirname, 'dist', 'scripts'),
      filename: 'annuity-calc.min.js'
    },
    devtool: "sourcemap",
    debug: true,
    modules: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  };

	// run webpack
	webpack(config, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		/*gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));*/
		callback();
	});
});
