var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require("merge2");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function () {
    var tsResult =  gulp.src(['src/**/*.ts', '!src/**/*.test.ts'])
        .pipe(tsProject());

    return merge([
          tsResult.dts.pipe(gulp.dest('dist')),
          tsResult.js.pipe(gulp.dest('dist'))
      ]);
});

gulp.task("default", ["build"]);