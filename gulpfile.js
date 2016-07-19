let gulp = require('gulp'),
    $ = require('gulp-load-plugins')(); //自动加载gulp开头的插件
let lazypipe = require('lazypipe');

// 全局配置
const CFG = {
  // 路径配置
  src: './src/',
  sass: './src/static/sass/**/*.scss', // sass文件
  fonts: './src/static/sass/fonts/*.{eot,svg,ttf,woff}', // 字体文件
  js: './src/static/js/**/*.js', // js文件
  images: './src/static/images/**/*.{jpg,png,gif}', // 多文件支持
  html:'./src/app/**/*.{htm,html,shtm,shtml,ico,txt}', // 多文件支持
  dest: './dest/',
  // 入口配置
  entry:{
    port: process.env.port || 3000,
    html: 'index.html',
    js: 'main.js'
  }
}
let cssFilter = $.filter(CFG.src+'static/css/**/*.css',{restore:true}),
    jsFilter = $.filter(CFG.js,{restore:true});

// scss文件编译和相关配置 图片压缩必须在sass编译前完成
gulp.task('sass',() => {
  return gulp.src(CFG.sass)
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe($.sourcemaps.init())
    .pipe($.postcss([$.autoprefixer]))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(CFG.src+'static/css'))
    .pipe($.notify({message: 'sass文件编译css完成!'})) // 编译提示信息
    .pipe($.connect.reload())
});

// 将图片拷贝到目标目录并做压缩处理
gulp.task('images:dev',()=>{
  return gulp.src(CFG.images)
    .pipe($.notify({message:'监听图片变化了!'})) // 编译提示信息
    .pipe($.connect.reload())
});
gulp.task('images:build',()=>{
  return gulp.src(CFG.images)
    // .pipe($.imagemin())
    .pipe(gulp.dest(CFG.dest+'static/images'))
    .pipe($.notify({message:'图片压缩处理完成!'})) // 编译提示信息
});


// js文件操作
gulp.task('js:dev', ()=>{
  return gulp.src(CFG.js)
    // .pipe($.jshint()) // js语法解析
    // .pipe($.jshint.reporter('default'))
    .pipe($.notify({message:'js校验完成!'})) // 编译提示信息
    .pipe($.connect.reload())
});

gulp.task('js:build', ()=>{
  return gulp.src(CFG.js)
    .pipe($.jshint()) // js语法解析
    .pipe($.jshint.reporter('default'))
    .pipe($.uglify()) // 压缩js文件
    .pipe($.rename({suffix:'.min'})) // 文件重命名
    .pipe(gulp.dest(CFG.src + '/js'))
    .pipe($.notify({message:'js校验编译压缩完成!'})) // 编译提示信息
});

// html文件操作必须是是在sass编译后执行
gulp.task('html:dev', ()=>{
  return gulp.src(CFG.html)
    .pipe($.notify({message:'监听html变化了!'})) // 编译提示信息
    .pipe($.connect.reload())
})
gulp.task('html:build', ['sass'], ()=>{
  return gulp.src(CFG.html)
    .pipe($.useref()) // useref分析html文件中带有build注释的css,js块
    .pipe($.if('*.js',$.rev())) // 文件MD5版本号
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css',$.rev())) // 文件MD5版本号
    .pipe($.if('*.css', $.cleanCss()))
    .pipe($.revReplace()) // 替换改变文件MD5版本号
    .pipe(gulp.dest(CFG.dest+'app'))
    // .pipe(gulp.dest(CFG.dest))
    .pipe($.notify({message:'html拷贝完成!'})) // 编译提示信息
    .pipe($.connect.reload())
})

// 处理字体
gulp.task('fonts:dev', ()=>{
  return gulp.src(CFG.fonts)
    .pipe(gulp.dest(CFG.src+'static/css/fonts'))
    .pipe($.notify({message:'字体文件处理完毕!'})) // 编译提示信息
    .pipe($.connect.reload())
})
gulp.task('fonts:build', ()=>{
  return gulp.src(CFG.fonts)
    .pipe(gulp.dest(CFG.dest+'static/css/fonts'))
    .pipe($.notify({message:'字体文件处理完毕!'})) // 编译提示信息
})

// 清理操作
gulp.task('clean', ()=>{
  return gulp.src(CFG.dest)
    .pipe($.clean())
    .pipe($.notify({message:'dest目录删除完毕!'}));
});

// 监听文件变化并执行对应的task
gulp.task('watch',['sass','js:dev','fonts:dev','images:dev','html:dev'], ()=>{
  gulp.watch(CFG.sass ,['sass']); // 监听sass文件变化
  gulp.watch(CFG.fonts ,['fonts:dev']); // 监听fonts文件变化
  gulp.watch(CFG.images ,['images:dev']); // 监听images文件变化
  gulp.watch(CFG.html ,['html:dev']); // 监听html文件变化
  gulp.watch(CFG.js ,['js:dev']); // 监听js文件变化
});

// 服务器连接操作
gulp.task('connect', ()=>{
  return $.connect.server({
    root: CFG.src,
    port: CFG.entry.port,
    livereload: true
  });
});

gulp.task('connectBuild', ()=>{
  return $.connect.server({
    root: CFG.dest,
    port: CFG.entry.port + 1,
    livereload: true
  });
});

// 构建开发时默认的任务
gulp.task('default', ['connect','watch']);

// 开发完成后构建的任务
gulp.task('build', ['sass','fonts:build','images:build','js:dev', 'html:build']);