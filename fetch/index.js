import axios from 'axios'
import Config from '../config'
import { Indicator } from 'mint-ui'

export default {
    // ajax 请求，增加了与后台拟定的默认参数
    fetch (obj) {
        // 合并参数
        let config = $.extend({
            method: 'get',      // 方法
            url: '',            // 地址
            data: {},           // 参数
            showIndicator: true // 是否显示 loading
        }, obj || {})

        // data 默认带上登录 token
        config.data = $.extend({
            // token: vm.$.getCookie(vm.obj.tokenName)
        }, obj.data || {})

        // mock转发
        let begin = ['', '/test'][+/mock$/.test(location.search)]
        config.url = begin + obj.url

        // 设置相对地址的domain
        if (Config.baseURL) axios.defaults.baseURL = Config.baseURL

        axios.interceptors.request.use(config => {  // 成功
            // if loading
            if (config.showIndicator)
                Indicator.open({spinnerType: 'fading-circle'})
            return config
        }, err => { // 失败
            return Promise.reject(error)
        });

        // 响应拦截器
        axios.interceptors.response.use(res => {    // 成功
            //在这里对返回的数据进行处理
            config.showIndicator && Indicator.close()
            return res.data
        }, err => { // 失败
            config.showIndicator && Indicator.close()

            if (err.response) {
                // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.header)
            } else {
                // 一些错误是在设置请求的时候触发
                console.log('Error', err.message)
            }
            return Promise.reject(err)
        })

        return axios(config)
    },

    // get 请求
    get (obj) {
        return this.fetch(obj)
    },

    // post 请求
    post (obj) {
        obj.method = 'post'
        return this.fetch(obj)
    }
}
