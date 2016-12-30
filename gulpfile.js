const gulp = require("gulp");
const rename = require("gulp-rename");
const cssnano = require("cssnano");
const cssnext = require('postcss-cssnext');
const postcss = require('gulp-postcss');
const sourcemaps = require("gulp-sourcemaps");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync").create();
const webpack = require("webpack");
const webpackconfig = require("./webpack.config");
const del = require("del");
const gutil = require("gulp-util");
const pug = require("pug");
const fs = require("fs");

gulp.task("build", ["build:styles", "build:clientjs", "build:staticapp"]);

gulp.task("clean", function() {
	return del(["./dist"]);
});

gulp.task("watch", [
	"watch:browser",
	"watch:serve",
	"watch:styles",
	"watch:clientjs"
]);

gulp.task("build:styles", function() {
	var processors = [
		cssnext(),
		cssnano({ autoprefixer: false }),
	];
	return gulp.src("./src/styles.css")
		.pipe(rename("annuity-calc.css"))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist"));
});

gulp.task("build:clientjs", function(callback) {
	webpack(webpackconfig, function(err) {
		if(err) throw new gutil.PluginError("webpack", err);
		callback();
	});
});

gulp.task("build:staticapp", function(cb) {
	fs.mkdir("./dist", function() {
		// ignore err due to file already existing
		fs.writeFile(
			"./dist/annuity-calc.html",
			// TODO: disable calculate button form submition
			pug.renderFile("./src/view.pug", {compileDebug: false}),
			function(err) {
				if (err) throw err;
				cb();
			}
		);
	});

});

gulp.task("watch:browser", function() {
	browserSync.init({
		proxy: "http://localhost:4000",
		files: "./dist",
		ghostMode: false // Turn off sync between connected browsers
	});
});

gulp.task("watch:serve", function() {
	return nodemon({
		script: "./bin/www --port 4000 --log dev",
		watch: "./src/*" // Doesn't exclude client only code (not a big deal)
	}).on("start", function(){
		browserSync.reload();
	});
});

gulp.task("watch:styles", ["build:styles"], function() {
	gulp.watch("./src/styles.scss", ["build:styles"]);
});

gulp.task("watch:clientjs", ["build:clientjs"], function() {
	gulp.watch("./src/client-app.js", ["build:clientjs"]);
});
