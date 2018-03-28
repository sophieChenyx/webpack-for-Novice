webpack的简易打包教程
---------------------
```
不同的js没有经过webpack相关的打包是不识别的；
webpack可以对 .js  .png   .css 静态关系进行一个依赖的集合；
例如typescript这种在javascript基础上开发的语言使我们能够实现目前版本的javascript不能直接使用的特性，
并且之后还能转换为javascript,使得jacascript文件使浏览器可以识别；
webpack是模块打包机，分析项目结构，找到找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），
并将其转换和打包为合适的格式供浏览器使用。 
```

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），
Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

### 一个基础项目的相关webpack.config.js文件的配置
```
本项目的基础的webpack.config.js配置文件;
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context:path.resolve(__dirname,'src'),
  entry:{
    main:'./main',
    login:'./modules/login',
    product:'./modules/product'
  },
  module:{
    rules:[{
        test: /\.js$/, 
        loader: 'babel-loader', 
        query:{presets:['es2015']}
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      },
      {test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
  devServer:{
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    inline: true,
    port: 8080,
    hot:true
  },
  resolve: {
      extensions:  ['.js','.vue'] 
    },
  output: {
    path:path.join(__dirname,'dist'),
    publicPath:'/',
    filename: '[name]-[hash:8].js',
    chunkFilename:'[id]-[chunkhash].js'
  }
}

//这里只存在入口文件和输出文件，使用了babel-loader加载器,在这里的module定义了对模块的处理逻辑，
这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，
这正是webpack强大的原因。
```


## 让我们来开始做这样的一个小demo吧

* node webpack 的准备工作npm已经相关工具的安装网上一大堆就不解释了，我的项目中所用的版本如下：
  * webpack 版本：4.2.0
  * node 版本：8.9.1
  * npm 版本：5.5.1


* 1.npm初始化生成一个package.json 文件  
  ``npm init``

* 2.创建基本的项目的目录结构，用来放置对应的文件
> |-src  
> | |-main.js  
> | |-assets  
> | | |-css  
> | | |-img  
> |-webpack.config.js  
> |-package.json  
> |-README.md  


* 3.安装webpack；

```
npm install webpack  --save-dev  //局部安装（安装后会生成一个package-lock.json这个是锁定安装时的版本号，并且需要上传到git，确保在他人安装的依赖的时候大家的依赖版本能够保持一致）
npm install webpack  -g --save-dev //全局安装
```


#### 安装成功之后检查当前的webpack的版本，显示正确的版本后表示webpack安装成功，现在开始进行webpack.config.js文件的基础配置；

> module.exports = {  
>   entry:'./src/main.js',  
>   output:{  
>     filename:'./dist/bundle.js'  
>   }  
> }  
> 此时就是一个基础的webpack.config.js配置文件，在命令行可以直接输入`$ webpack`来执行一个基础的对main.js文件的打包；  
> 在没有全局安装webpack的时候，只需执行`$ node_modules/.bin/webpack`即可完成简单的打包命令操作。在这里使用的是webpack 
> 本为4.2.0，会要求安装webpack-cli,出现如下提示  
> $ node_modules/.bin/webpack  
> The CLI moved into a separate package: webpack-cli.  
> Please install 'webpack-cli' in addition to webpack itself to use the CLI.  
> -> When using npm: npm install webpack-cli -D  
> -> When using yarn: yarn add webpack-cli -D  

安装成功后命令行执行命令即可完成基础的打包过程，dist目录下生成bundle.js文件

* 4.使用loader
  * loader是比较核心的一块内容，他将各类静态资源通过loader转换成相应的模块
> module:{  
>   rules:[{                                //loaders加载器  
>        test: /\.js$/,                     //匹配loaders所处理文件的文件扩展名的正则表达式  
>        loader: 'babel-loader',            //loader的名称  
>       query:{presets:['es2015']}          //为loader提供的额外设置的选项
>      },  
>      {  
>        test:/\.css$/,  
>        loader:'style-loader!css-loader'  
>      },  
>      {test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}  
>    ]  
>  }  


安装以上的相关安装包，为别对.js，.css,image图片进行了处理；babel相关的使用可以使得一些es6进行到es5的转码；
如果没有安装相关的使用的话，那么没有相应的loader进行处理，就会报错；  

* 5.添加css文件和img文件；    
在`./src/assets/css`下新建style.css文件,`./src/assets/css`下加入图片文件，在`main.js`中分别引入两个文件

> ### main.js  
> require('./assets/css/style.css');  
> var img = document.createElement('img')  
> let box = document.querySelector('.box')  
> img.src = require('./assets/img/chenyx.png')  
> box.appendChild(img)  


> ###style.css  
>  .box{  
>   width: 200px;  
>   height: 200px;  
>   background-color: pink;  
>   box-shadow: 10px 10px 30px #ccc;  
>   }  


dist目录下的index.html页面
```html
  <h1>index中的内容</h1>  
  <div class="box">   
    样式由.css文件添加   
  </div>  
```

* 6.安装webpack-dev-server,开启本地服务

``$ npm install webpack-dev-server --save-dev ``

> 在module.exports 中添加如下配置：   
devServer: {  
    contentBase: path.join(__dirname, 'dist'),  
    compress: false,  
    inline: true,  
    port: 8080  
}  

运行`webpack-dev-server`即可开启本地服务，在对应的8080端口可以看到页面；
以上就基本完成了一个简单的webpack打包，并可以通过webpack-dev-server 开启本地服务进行一些调试；



### 在此之外我们还可以在package.json 中生成webpack的运行脚本,

```javascript
  "script":{  
    "start":"node_modules/.bin/webpack",  
    "serve":"node_modules/.bin/webpack-dev-server"  
  }  
  //这样的话我们就可以直接运行 npm run start 、npm run serve命令来进行
```

#### 加入进程守护nodemon

```javascript
  "scripts": {  
    "start": "nodemon --exec webpack -w webpack.config.js",  
    "serve:watch": "nodemon  --exec webpack-dev-server -w webpack.config.js"  
  }  
  这里我们只需要监听webpack.config.js文件的变化，所以添加-w参数指定特定的目录或者文件
nodemon 执行webpack  到指定的webpack.config.js文件中去
```


#### 页面实时刷新Hot Module Replacement(HMR)热加载

> module模块加入设置  
devServer:{
    contentBase: path.join(__dirname, 'dist'),  
    compress: false,  
    inline: true,  
    port: 8080,  
    hot:true  
  }

加入热更新插件

> plugins:[  
  new webpack.HotModuleReplacementPlugin()  
]  


更多可以访问我的个人博客：https://sophiechenyx.github.io/blog/


