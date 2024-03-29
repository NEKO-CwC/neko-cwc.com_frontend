const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename'); // 引入gulp-rename插件
// 编译scss
function compileSass() {
    return gulp.src('src/css/**/*.scss') // 获取src/css目录及子目录下所有.scss文件
        .pipe(sass().on('error', sass.logError)) // 使用sass插件进行编译，并记录错误
        .pipe(rename({
            extname: ".module.css" // 使用gulp-rename重命名扩展名为.module.css
        }))
        .pipe(gulp.dest('src/css')); // 将编译后的css文件放在src/css目录下
}

// 监测文件变化
function watchFiles() {
    gulp.watch('src/css/**/*.scss', compileSass); // 监测所有scss文件，如果有更改，运行compileSass任务
}

// 默认任务
exports.default = watchFiles;
