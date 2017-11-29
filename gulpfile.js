const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

// browserify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "dist/index.js"
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
});

gulp.task('start', ['convertJS', 'browserify']);