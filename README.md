# proxyhttp

node 接口转发中间件（代理）

```js
var app = express()

// parse body for send post data
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 本地调用测试环境 api, 需要连接 vpn
app.use("/api", require("proxyhttp")())
```
