const path = require('path'),
      fs = require('fs'),
      webpack = require('webpack');

const srcDir = path.resolve(process.cwd(), 'src');

/**
 * 获取多页面的每个入口文件，用于配置中的entry
 * 注意在同一层级产生产生的数组
 */
function getEntry() {
    var jsPath = path.resolve(srcDir, 'static/js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        // console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'static/js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}
module.exports = {
    cache: true,
    devtool: "source-map",
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "dist/static/js"),
        publicPath: "js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            jquery: srcDir + "static/js/plugins/jquery.js",
            layer: srcDir + "static/js/plugins/layer/layer.js",
            swiper: srcDir + "static/js/plugins/swiper.js",
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};