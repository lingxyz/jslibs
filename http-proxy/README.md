# proxyhttp

Node 接口代理中间件

## 安装
```bash
npm install proxyhttp -D
```

## 使用
```js
var app = express()

// parse body for send post data
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 简单粗暴的接口转发，配置如下：
app.use("/api", require("proxyhttp")({
    "extranet": "http://ip:port/api"
}))

// 解析：node捕捉到接口标记（baseUrl）`/api`，将`http://a.com/api`转发到`http://ip:port/api`

// 若公司区分内往、外网，通过配置ip自动进行接口转发：
app.use("/api", require("proxyhttp")({
    // 内网对应的公网IP(若不设置，默认外网服务)
    "ip": "112.64.124.86",
    // 内网服务地址
    "intranet": "http://ip:port/api",
    // 外网服务地址
    "extranet": "http://ip:port/api"
}))
// 若公网ip匹配成功（公司内），则转发到内网服务地址（开发环境）
// 若公网ip匹配失败（家里），则转发到外网服务地址（测试环境）
```

## Todo
- [ ] 支持文件上传
