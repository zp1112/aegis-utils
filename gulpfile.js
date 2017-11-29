const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
var wrap = require('gulp-wrap-umd');
var rename = require('gulp-rename');
var del = require('del');
const babelify = require('babelify');


var rollup = require('rollup'),
buffer = require('vinyl-buffer');

// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
gulp.task('clean', function(cb) {
    del(['dist/*']);
    return cb();
});

gulp.task('script1', () => {
    // rollup 打包 js 模块
    return rollup.rollup({
        // 入口文件
        input: './src/index.js',
        plugins: [
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    }).then(bundle => {
        bundle.write({
            // 产出文件使用 umd 规范（即兼容 amd cjs 和 iife）
            format: 'umd',
            // iife 规范下的全局变量名称
            moduleName: 'AegisUtils',
            // 产出的未压缩的文件名
            dest: './dist/AegisUtils.js'
        })
    })
})

gulp.task('script2', () => {
    // rollup 打包 js 模块
    return rollup.rollup({
        // 入口文件
        entry: './src/index.js',
        plugins: [
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    }).then(bundle => {
        bundle.write({
            // 产出文件使用 umd 规范（即兼容 amd cjs 和 iife）
            format: 'umd',
            // iife 规范下的全局变量名称
            moduleName: 'AegisUtils',
            // 产出的未压缩的文件名
            dest: './release/AegisUtils.js'
        }).then(() => {
            // 待 rollup 打包 js 完毕之后，再进行如下的处理：
            gulp.src('./release/AegisUtils.js')
                // 压缩
                .pipe(uglify())
                // 产出的压缩的文件名
                .pipe(rename('AegisUtils.min.js'))
                // 生成 sourcemap
                .pipe(sourcemaps.write(''))
                .pipe(gulp.dest('./release'))
        })
    })
})
gulp.task('start', ['clean', 'convertJS', 'script1']);