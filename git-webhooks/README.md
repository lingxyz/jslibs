# Git-webhooks

> 开始

- git 后台设置 webhook 地址：如：http://52.197.59.55:9000/webhook/novel

- git 后台设置 secret(token)：如：zhanglingrd

- 进入服务器

``` bash
# 拉取仓库
git clone https://github.com/zhanglingrd/webhook.git

# 安装 npm 依赖包
cd webhook && npm install


# 启动服务（进程守护[ 并命名]）
pm2 start webhook/[ --name webhook]
```

> 目录结构

```
|---webhook
|     |---index.js		# 入口文件
|     |
|     |---config.json		# 配置文件
|     |
|     |---package.json		# npm 包配置
|     |
|     |---README.md		# 入口文档
|     |
|     |---.gitigore		# git 忽略文件列表
        ......
```

> 配置说明

config.json
``` js
{
	"port": "9000",				// 端口
	"list": [{
		"remote": "/webhook/webhook",	// git 后台配置的 webhook 地址
		"path": "./restart.sh"		// shell脚本地址
	}, {
		"remote": "/webhook/novel",
		"path": "./restart-novel.sh",
		"secret": {			// git 后台配置的 secret（若没有配置则为空）
			"name": "token",	// secret 名称（若为路径，则格式为 a.b.c）
			"value": "zhanglingrd"	// secret 值
		}
	}]
}
```

*.sh `git pull` 触发的shell脚本，执行更新代码库，重启server等操作