# jslibs

JavaScript & Node.js Libraries.

## Features

- 网络：http、websocket ...
  - [fetch](fetch), Ajax
  - [http-proxy](http-proxy), Node.js http proxy middleware
- reset：reset, base ...
  - [rem.js](reset/rem.js), 根据移动端窗口宽度进行rem配置和动态计算。
- Vue：filter、directive ...
- Middleware
  - [git-webhooks](git-webhooks), git webhook中间件 `todo，通过app.use(webhook(router, config))去调用`
- 工具类：
  - [math.js](utils/math.js), Math计算的封装
- DB
  - [widdog](widlog), 封装集成野狗CRUD操作
- AI
  - [ifly](ifly), 讯飞语音云接口封装
	  - [text2Voice](ifly/text2Voice.js), 讯飞语音转文字SDK
- Activity
  - [circleNav](circleNav), 圆形旋转菜单封装
  - [turnTable](turnTable), 大转盘活动封装

## Todo

- 支持 AMD、CMD、commonJs规范，HTML可直接以`script`标签引入
- webpack 配置，编译ES6、压缩代码、加AMD CMD包裹层
- 单元测试 集成测试
- 一键发布npm和不同的分支