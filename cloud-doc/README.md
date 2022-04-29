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


## 文件读取 electron_react 使用node.js中API fs 读取文件，创建文件fs.writeFile，删除文件fs.unlink，重命名fs.rename
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

## 文件弹窗  remote  dialog 

## 右键菜单  remote  menu
项目上已写例子，menu 装进对象的item,带上响应事件

## 原生菜单 menu；
主窗口，main.js 在Menu.buildFormTemplate(这里是模板); 模板类似 [{ }]
Menu.setApplicationMenu(menu);


## 踩坑
（1）这里useState 相当于,跟class的方式 替换 和  合并 
（2）react hook 和 vue的对比
vue里emit传给父组件， 而react-hook，直接当参数（函数和里面逻辑）传递进去子组件，子组件，然后再调用。
（3） require("fs") 可能会有问题，使用window.require("fs") 

## 问题
1: electron 版本问题影响系统升级更新和remote 导入文件对话框dialog，造成remote underfined 暂时没解决;


