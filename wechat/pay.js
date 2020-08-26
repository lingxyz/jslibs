// 微信支付接口配置
export default function weixinPay (data) {
    let self = this

    function onBridgeReady(){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            data,
            res => {
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    // 支付成功
                    self.$dialog.toast({mes: '支付成功'})
                    setTimeout(self.goSuccess(), 500)
                } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                    self.$dialog.toast({mes: '支付失败'})
                    setTimeout("location.href='/order/list#1'", 2000)
                } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                    self.$dialog.toast({mes: '请继续付款，未完成付款，订单将关闭！'})
                    setTimeout("location.href='/order/list#1'", 2000)
                } else {
                    setTimeout("location.href='/order/list#0'", 2000)
                }
            }
        )
    }

    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        }
    } else {
        onBridgeReady()
    }
}