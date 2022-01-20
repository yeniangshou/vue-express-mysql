# 项目
慕课上react-electron 搭建项目和完成项目;


# 技术说明
 "dev": " "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \" cross-env  BROWSER=none npm start \" " \"wait-on http://localhost:3000 && electron .\" \" cross-env  BROWSER=none npm start \" "

（1）\ \ 进行转义；
（2） concurrently  这里将两个命令npm run start 和  electron . 进行同步启动，打开
（3） wait-on && 代表 http://localhost:3000 启动这个之后，再启动electron .
（4） cross-env 设置环境值，BROWSER=none 让react的浏览器不打开窗口;

# react-fontawesome 使用
https://www.jianshu.com/p/4322bf9b23bb


## prop-types  react 类型检查和设置默认值，类型prop;


## electron_react 使用node.js中API fs 读取文件，创建文件fs.writeFile，删除文件fs.unlink，重命名fs.rename
const  fs = require("fs").promises;   
const path = require("path");
const fileHelper = {
    return fs.readFile(path, {encoding: 'uff-8'})
}
path 这里path，需要electron API 的remote得到

## electron-store 的使用 和vuex 的区别
1：vuex存储在内存，localstorage则以文件的方式存储在本地，electron-store数据存储卸载应用之后依然存在。
2：应用场景：vuex用于组件之间的传值，localstorage则主要用于不同页面之间的传值。
3：永久性：当刷新页面时vuex存储的值会丢失，localstorage不会。

4： 为什么不使用window.localStorage
localStorage仅在浏览器进程（渲染进程）中起作用。
localStorage的容错性不是很高，因此，如果您的应用遇到错误并意外退出，则可能会丢失数据。
localStorage仅支持持久字符串。 此模块支持任何JSON支持的类型。
localStorage不是很安全，可能是由于xss攻击而泄漏信息。
electron-store模块的API更好。 您可以设置并获取嵌套属性。 您可以设置默认的初始配置

npm install electron-store
const Store = window.require("electron-store") // window 不同情况可以去掉;
const store = new Store();
store.set("name", "huangbo");
let value = store.get("name")
console.log("value", value)
store.delete("name");
value = store.get("name")
console.log("value", value)

## 踩坑
（1）这里useState 相当于,跟class的方式 替换 和  合并 
（2）react hook 和 vue的对比
vue里emit传给父组件， 而react-hook，直接当参数（函数和里面逻辑）传递进去子组件，子组件，然后再调用。
（3） require("fs") 可能会有问题，使用window.require("fs") 

## 问题
1: electron 版本问题影响系统升级更新和remote 导入文件对话框dialog，造成remote underfined 暂时没解决;

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
