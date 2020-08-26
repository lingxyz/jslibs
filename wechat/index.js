/*
** 微信相关接口及配置
**
** 举个🌰：
** // 微信分享
** <script>
** import Wechat from '../../common/Wechat'
**
** export default {
**      created () {
**          vm.fetch.get({
                url: 'getsignature.do',
                data: {
                    url: location.href
                }
            })
            .then(res => {
                Wechat.config(res.data).then((wx)=> {
                    Wechat.share({
                        title: 'this is title',
                        desc: 'this is desc',
                        link: location.href,
                        success () {
                          console.log('success')
                        },
                        cancel () {
                          console.log('cancel')
                        }
                    })
                })
            })
            .catch(err => vm.$toast(err))
**     }
** }
** </script>
*/


import wx from 'weixin-js-sdk'
import U from './utils'
import weixinPay from 'pay'

export default {
    // 宿主环境是否是微信
    isWechat: navigator.userAgent.toLowerCase().indexOf('micromessenger/') > -1,

    // 请求微信签名 并配置接口
    config ({appId, timestamp, nonceStr, signature, debug}) {
        wx.config({
            'debug': !!debug,
            'appId': appId,
            'timestamp': timestamp,
            'nonceStr': nonceStr,
            'signature': signature,
            'jsApiList': [
                'checkJsApi', 'onMenuShareTimeline',
                'onMenuShareAppMessage', 'onMenuShareQQ','onMenuShareQZone',
                'onMenuShareWeibo', 'hideMenuItems',
                'showMenuItems', 'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem', 'translateVoice',
                'startRecord', 'stopRecord',
                'onRecordEnd', 'playVoice',
                'pauseVoice', 'stopVoice',
                'uploadVoice', 'downloadVoice',
                'chooseImage', 'previewImage',
                'uploadImage', 'downloadImage',
                'getNetworkType', 'openLocation',
                'getLocation', 'hideOptionMenu',
                'showOptionMenu', 'closeWindow',
                'scanQRCode', 'chooseWXPay',
                'openProductSpecificView', 'addCard',
                'chooseCard', 'openCard'
            ]
        })

        return new Promise (function(resolve, reject) {
            wx.ready(() => {
                resolve(wx)
            })
        })
    },

    // 分享
    share ({title, desc, link, imgUrl, type, dataUrl, success, cancel}) {
        // 公用data
        let wxdataTimeline = {
            title: title,
            link: link,
            imgUrl: imgUrl,
            success: () => {
                if (success) {
                    typeof success == 'function' && success()
                    typeof success == 'string' &&  eval(success)
                }
            },
            cancel: () => {
                if (cancel) {
                    typeof cancel == 'function' && cancel()
                    typeof cancel == 'string' &&  eval(cancel)
                }
            }
        }

        let wxdata = {desc: desc}
        U.extend(wxdata, wxdataTimeline)
        // 朋友data
        let ShareAppData = {
            desc: desc,
            type: type,
            dataUrl: dataUrl
        }
        U.extend(ShareAppData, wxdataTimeline)

        // 显示右上角菜单
        wx.showOptionMenu()
        // 分享给朋友
        wx.onMenuShareAppMessage(ShareAppData)
        // 分享到朋友圈
        wx.onMenuShareTimeline(wxdataTimeline)
        // 分享到QQ
        wx.onMenuShareQQ(wxdata)
        // 分享到QQ空间
        wx.onMenuShareQZone(wxdata)
        // 分享到微博
        wx.onMenuShareWeibo(wxdata)
    },

    weixinPay: weixinPay
}