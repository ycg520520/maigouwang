let gulp = require('gulp'),
    $ = require('gulp-load-plugins')(), //自动加载gulp开头的插件
    browserSync = require('browser-sync').create(),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

// 全局配置
const CFG = {
  // 路径配置
  src: './src/',
  sass: './src/static/sass/**/*.{scss,sass}', // sass文件
  fonts: './src/static/sass/fonts/*.{eot,svg,ttf,woff}', // 字体文件
  js: './src/static/js/**/*.{js,coffee}', // js文件
  images: './src/static/images/**/*.{jpg,png,gif}', // 多文件支持
  html:'./src/app/**/*.{htm,html,shtm,shtml,ico,txt}', // 多文件支持
  dist: './dist/',
  // 入口配置
  entry:{
    port: process.env.port || 3000,
    html: 'index.html',
    js: 'main.js'
  }
}

// scss文件编译和相关配置 图片压缩必须在sass编译前完成
gulp.task('sass',() => {
  return gulp.src(CFG.sass)
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe($.sourcemaps.init())
    .pipe($.postcss([$.autoprefixer]))
    .pipe($.sourcemaps.write('.'))
    .pipe($.changed(CFG.dist+'static/css'))
    .pipe(gulp.dest(CFG.dist+'static/css'))
    .pipe($.notify({message: 'sass文件编译css完成!'})) // 编译提示信息
    // .pipe(browserSync.stream())
});

// 将图片拷贝到目标目录并做压缩处理
gulp.task('images',()=>{
  return gulp.src(CFG.images)
    // .pipe($.imagemin())
    .pipe($.changed(CFG.dist+'static/images'))
    .pipe(gulp.dest(CFG.dist+'static/images'))
    .pipe($.notify({message:'图片压缩处理完成!'})) // 编译提示信息
    // .pipe(browserSync.stream())
});

// js校验文件操作
gulp.task('js', ()=>{
  return gulp.src([CFG.js,'!'+'src/static/js/plugins/**/*.js'])
    .pipe($.jshint()) // js语法解析
    .pipe($.jshint.reporter('default'))
    // .pipe($.uglify()) // 压缩js文件
    // .pipe($.rename({suffix:'.min'})) // 文件重命名
    // .pipe(gulp.dest(CFG.dist + 'static/js'))
    .pipe($.notify({message:'js校验完成!'})) // 编译提示信息
    // .pipe(browserSync.stream())
});

// webpack对js进行打包压缩操作
gulp.task("webpack:js",['js'], () => {
  webpack(webpackConfig, (err, stats)=>{
    if(err){ throw new $.util.PluginError("webpack:build-js", err);}
    $.util.log("[webpack:build-js]", stats.toString({
        colors: true
    }));      
  });
});

// html文件操作必须是是在sass编译后执行
gulp.task('html', ['sass'], ()=>{
  return gulp.src(CFG.html)
    // .pipe($.useref()) // useref分析html文件中带有build注释的css,js块
    /*.pipe($.if('*.js',$.rev())) // 文件MD5版本号
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css',$.rev())) // 文件MD5版本号
    .pipe($.if('*.css', $.cleanCss()))
    .pipe($.revReplace()) // 替换改变文件MD5版本号*/
    .pipe($.changed(CFG.dist+'app'))
    .pipe(gulp.dest(CFG.dist+'app'))
    // .pipe(gulp.dest(CFG.dist))
    .pipe($.notify({message:'html拷贝完成!'})) // 编译提示信息
    // .pipe(browserSync.stream())
})

// 处理字体
gulp.task('fonts', ()=>{
  return gulp.src(CFG.fonts)
    .pipe($.changed(CFG.dist+'sta.pipe($.changed(ic/css/fonts'))
    .pipe(gulp.dest(CFG.dist+'static/css/fonts'))
    .pipe($.notify({message:'字体文件处理完毕!'})) // 编译提示信息
    // .pipe(browserSync.stream())
})

// 清理操作
gulp.task('clean', ()=>{
  return gulp.src(CFG.dist)
    .pipe($.clean())
    .pipe($.notify({message:'dist目录删除完毕!'}));
});

// 监听文件变化并执行对应的task
gulp.task('watch', ()=>{
  gulp.watch(CFG.sass ,['sass']); // 监听sass文件变化
  gulp.watch(CFG.fonts ,['fonts']); // 监听fonts文件变化
  gulp.watch(CFG.images ,['images']); // 监听images文件变化
  gulp.watch(CFG.html ,['html']); // 监听html文件变化
  gulp.watch(CFG.js ,['js']); // 监听js文件变化
  gulp.watch(CFG.js ,['webpack:js']); // 监听js文件变化

  // 监听所有位在dist目录下的文件，一旦有更动，便进行重启服务器后刷新阅览器
  gulp.watch([CFG.dist + '**']).on('change',browserSync.reload);
});

// 服务器连接操作
gulp.task('browserSync',['sass','fonts','images','js','html','webpack:js'], () => {
  browserSync.init({
    server: CFG.dist, // 静态服务路径
    // proxy: "http://localhost:4000", // 代理服务路径
    files: [CFG.dist + '**'],
    startPath:'app',
    // browser: 'google chrome',
    notify: false,
    port: CFG.entry.port
  },()=>{
    console.log('阅览器刷新了!')
  });
});
// 构建开发时默认的任务
gulp.task('default', ['sass','fonts','images','js','html','webpack:js','browserSync','watch']);
