# 野狗 API 的 js 封装

## 初始化野狗
```js
import widdog  from 'widdog'
widdog.connect()
```

## 写入数据
```js
widdog.set(path, data)
```

## 追加数据
```js
widdog.push(path, data)
```

## 更新数据
```js
widdog.update(path, data)
```

## 删除数据
```js
widdog.remove(path)
```

## 监听数据
```js
widdog.get(path, cb)
```