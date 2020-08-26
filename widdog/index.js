const wilddog = require('wilddog-weapp-all')
const conf = require('config')

module.exports = {
    // 初始化野狗
    connect () {
        const config = {
            authDomain: conf.wilddog.authDomain,
            syncURL: conf.wilddog.syncURL   //输入节点 URL
        }

        wilddog.initializeApp(config)
        return wilddog.sync().ref()
    },

    // 写入数据
    set (path, data) {
        const ref = this.connect()
        ref.child(path).set(data)
    },

    // 追加数据
    push (path, data) {
        const ref = this.connect()
        ref.child(path).push(data)
    },

    // 更新数据
    update (path, data) {
        const ref = this.connect()
        ref.child(path).update(data)
    },

    // 删除数据
    remove (path) {
        const ref = this.connect()
        ref.child(path).remove()
    },

    // 监听数据
    get (path, cb) {
        const ref = this.connect()
        ref.child(path).on("value", function(snapshot) {
            cb && cb(snapshot.val())
        })
    }
}