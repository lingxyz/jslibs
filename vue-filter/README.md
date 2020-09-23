# vue-filter
Vue filters

## Startup

`install`

```bash
npm i -S vue-filter
```

`main.js`

```js
import VueFilter from 'vue-filter'
Vue.use(VueFilter)

new Vue({
  // ...
})
```

## Features

### Number

```pug
<!-- @param[1] 小数位 {String}  | 默认：0     | 可选 -->
<!-- @param[2] 千分符 {Boolean} | 默认：false | 可选 -->
<!-- @param[3] 绝对值 {Boolean} | 默认：false | 可选 -->

<template lang="pug">
  span {{100.9999 | number(2)}}
  <!-- 四舍五入，结果 -->
  span 101.00
</template>
```