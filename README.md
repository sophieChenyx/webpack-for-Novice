什么是webpack
---------------------
```
不同的js没有经过webpack相关的打包是不识别的；
webpack可以对 .js  .png   .css 静态关系进行一个依赖的集合；
例如typescript这种在javascript基础上开发的语言使我们能够实现目前版本的javascript不能直接使用的特性，并且之后还能转换为javascript,使得jacascript文件使浏览器可以识别；
webpack是模块打包机，分析项目结构，找到找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。
```

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

### 一个基础项目的相关webpack.config.js文件的配置
```
一个基础的webpack.config.js配置文件;
module.exports = {
  entry: "./source/index.js",
  module:{
    rules:[{    
      test:/\.js?$/,  //正则选择.js结尾的文件
      exclude:/(node_moudles)/,  //不包括(node_modules)中的文件
      loader:'babel-loader',  //用bable-loader来处理.js文件
      query:{presets:['react','es2015']}   //同时也会加载这些包来处理
    }]
  },
  output:{
    filename:'./source/bundle.js' //打好包后到这个文件夹下
  }
}

//这里只存在入口文件和输出文件，使用了babel-loader加载器,在这里的module定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。
```


## 让我们来开始做这样的一个小demo吧

* node webpack npm已经相关工具的安装网上一大堆就不解释了，我的项目中所用的版本如下：
  * webpack 版本：4.2.0
  * node 版本：8.9.1
  * npm 版本：5.5.1
* 全局安装webpack(有时候也不用全局安装，但是没有办法执行全局命令，需要执行的是`node_moudles/.bin/webpack`这样的没有安装全局webpack时的指令)；
```
npm install webpack  --save-dev  //局部安装
npm install webpack  -g --save-dev //全局安装
```



```
全局安装webpack 
npm install -g webpack 
//安装到自己的项目
npm install --save-dev webpack
此时生成的是package-lock.json
这个是锁定安装时的版本号，并且需要上传到git 确保别人在安装依赖的时候大家的依赖版本能够保持一直；

使用webpack前的准备
------------------
commonJs 规范；
导出：module.exports = function(){}

module:{
    loaders:[{   //加载器
        test:/\.js?$/,  
        exclude:/(node_modules)/,//不包括
        loader:'bable-loader'  //用它来解释
        query:{
            preset:['react','es2015']  //会加载下面的这些包哦
        }
    }]
}

Webpack在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的webpack.config.js文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，或者通过 --config 选项来指定配置文件。

module：定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。
在npm package.json的文件中直接生成webpack指令；
“script”:{
    "start":"node_module/.bin/webpack"
    "serve":"node_module/.bin/webpack"
}


自动生成了dist目录？？？
怎么会生成两个呢？

在webpack 3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。
尝试全局安装webpack-cli


devServer:{
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        port:'8090',
        inline: true//实时刷新
    },


npm i nodemon -g 
nodemon - -exec webpack -w webpack.config.js
这里我们只需要监听webpack.config.js文件的变化，所以添加-w参数指定特定的目录或者文件
nodemon 执行webpack  到指定的webpack.config.js文件中去

2.多页应用
entry 的配置我们可以是string object  array 类型
前面的例子用到的是string,单个入口，添加了几个目录和文件
entry:{
    main:'./src/main.js'
    login :'./'
}

nodemon进程守护，用来监控你node.js源代码的任何变化，自动重启服务



当我们的entry的入口文件都在src下面的话，那么我们就可以设置一个基础目录，绝对路径，用于从配置中解析入口起点（entry point）和加载器（loader）
context ：入口文件的基础目录（绝对路径）

如果是数组，那么会将数组中的模块合并，并且输出最后一个；如果是object，那么多个入口的key会打包成包的chunk名称。 
context: path.resolve(__dirname, 'src'),
  entry: {
      main: './main.js',
      login: './modules/login.js',
      product: './modules/product.js'
  } //使用了path.resolve的时候就不用再加 ./src了

这是对象形式的入口文件的写入；
output: {
        path:path.join(__dirname,'dist'),
        publicPath:'/',
        filename: '[name]-[hash:8].js',
        chunkFilename:'[id]-[chunkhash].js'
    }
多页配置应用之后再计算应用场景；


2. 省略文件扩展名？resolve.extensions
可以直接写util，而不用util.js， vue文件也可以省略文件名
  resolve: {
      extensions:  ['', '.js', '.vue'] 
  }
// 减少扩展名的书写的 配置；

3. 文件查找的路径太长？resolve.alias缩减引用路径
  resolve: {
      extensions:  ['.js', '.css'] ,
      alias: {
          'libs': path.resolve(__dirname, 'src/libs')，
          'react': 'node_modules/react/react.js'
      }
  }
这样在src下的任何js文件都可以直接这样引入模块，而不用../libs/util
import { ajax } from ‘libs/util’  此时libs 就是path.resolve(__dirname, 'src/libs')这个路径了    就是给路径取了一个方便的名字；

4.直接引用 react 之类的，可以在全局直接用 不用再improt 'react' from 'react';
自动引入vue/jquery ？ProvidePlugin
自动加载模块，ProvidePlugin可以让我们无需引入的情况下，以全局的模式直接使用模块变量
new webpack.ProvidePlugin({ 
Vue: ‘Vue’ 
})
代码中可以不用引入vue直接使用vue












