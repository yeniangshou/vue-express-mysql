## 查看代码权限方面的思路：


（1）关系：权限(按钮) 依附于 菜单 依附于 角色 依附于 用户， 菜单分层级，层级的里面分排序。

（2）登录接口用户得到该用户角色id: [1, 2, 3]。
    通过用户角色传参调用该用户角色、角色信息接口，得到菜单ID和权限menuId和权限powers [1, 2, 3, 4, 5]，
    根据不同角色可访问的菜单进行集合所有该最大角色菜单 [1, 2, 3, 4, 5, 6]，调用菜单接口，得到里面菜单详情数据url等等。
    根据不同角色可以访问最大权限进行集合所有调用权限接口，得到里面权限详情数据。

（3）左边侧边栏： 得到用户权限菜单进行url进行显示。
UI: antd menu  subMebu，思路:通过得到层级结构路由，然后通过Menu递归，就是
如果没有子元素，直接返回，有子元素再进行调用该方法，这样一个菜单有多层级的就会被清理出来。

排序思路：首先根据sorts进行排序。

层级的判断：第一层级：没有parent元素为null就是第一个层级.
第二层级：有parent的值。 
至于第二层级属于哪个第一层级，看第一层级的id和第二层级的parent是否一致。
如果一致，那么就是那个层级下面的页面，看三级是属于哪个第二层级也是这样大概判断。

按钮判断：
(1)首先从登录的时候根据角色=》菜单ID，-》得到这个角色菜单相关的按钮权限列表。
(2) 页面上进行if判断 inclues('user:add'),在下面数据中。存在就进行展示，不存在就不进行展示。
接口返回大概权限数据：
data:[
	{
	     id: 1, menu: 3, title: "新增", code: "user:add", desc: "用户管理 - 添加权限", sorts: 1, conditions: 1}
                       code: "user:add" ,
                       conditions: 1,
                       desc: "用户管理 - 添加权限",
                       id: 1,
                       menu: 3,
                       sorts: 1,
                       title: "新增",
	}
]

（4）路由：将全部的路由显示出来。思路：这里不是根据返回菜单进行展示，而是根据所有全部放起来，然后根据展示菜单进行点击，
假如如果存在直接输入路由，会进行判断是否存在的，不存在就返回没有权限的页面。

注意：每次路由跳转的时候都要查看是否有存在的权限，
有权限应该也在菜单中显示中，没有权限就跳转到401中，
怕就是知道路由，但是不在路由显示中，所以增加判断是否不存在的路由。


# [React-admin](https://github.com/javaLuo/react-admin/)<br/>
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) 
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/javaLuo/react-admin.svg?style=popout)

标准后台管理系统解决方案<br/> 动态菜单配置，权限精确到按钮<br/>

## what's this?

React+Redux 后台管理系统脚手架<br/> React Hooks / Redux / Typescript

<ul>
 <li>非服务端渲染</li>
 <li>仿antd-pro外观，但没有使用dva和roadhog</li>
</ul>

## Node版本
至少`10.12.0`, 因为`@typescript-eslint 3.x`这个插件需要

## 分支
- Default: React hooks + Typescript
- [react-class](https://github.com/javaLuo/react-admin/tree/react-class) : 原版 React Class, 无TS

## 构建 Start

```javascript
yarn install       // 安装依赖模块
yarn start         // 运行开发环境，启动完成后访问 http://localhost:8888
yarn build         // 正式打包，生成最终代码
yarn dist          // 运行正式打包后的最终代码，启动完成后访问 http://localhost:8889
yarn distmac       // MacOS下运行正式打包后的最终代码, 启动完成后访问 http://localhost:8889
```

## 最近更新

- 在写jest测试用例，还没弄完
- (2020/04/09) hooks/typescript
- 不再需要`yarn dll`
- (2020/03/13 正在进行) 升到 antd4, 使用@rematch, 修改权限、菜单、角色后需更新用
  户信息 ，Typescript，menu 的构建递归，添加权限/菜单的模态框需要加一个是否将该
  权限/菜单赋予给某些角色
- 把所有包版本都升级到了最新 React16.7,webpack4.29,babel7...
- 去掉了一些鸡肋的东西，真正项目中基本都不会用到
- 去掉了 css-module，感觉太不方便了

## 前后端分离，权限是怎么控制的

在数据库里存储着权限的信息，可以在页面里各种编辑。<br/> 但最终实现，仍然是在页面
里写死的，前端写在页面里的权限信息跟数据库里的信息一一对应就实现了权限控制
。<br/> 更好的方法除非是使用 SSR 服务端渲染，直接把权限注入到页面中，就像传统的
JSP 那样。

## 内置通用功能

用户管理 增删改查 分配角色<br/>   角色管理 增删改查 分配菜单和权限<br/>   权限管
理 增删改查<br/>   菜单管理 增删改查<br/>

关系：权限 依附于 菜单 依附于 角色 依附于 用户

## 预览地址 Demo

https://isluo.com/work/admin/ <br/>
账号：admin / user<br/>
密码：123456 / 123456

## 参考

react-luo: https://github.com/javaLuo/react-luo <br/>
