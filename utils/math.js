/**
 * fix js 浮点数计算精度
 * 计算： 
 * + : Math.plus(a，b) 
 * - : Math.minus(a，b) 
 * * : Math.multiply(a, b)
 * / : Math.divide(a, b)
 */

// 返回一个数字的小数位数
function digits (number) {
    const floatPart = number.toString().replace(/\d+\.?(\d*)/, '$1')
    return floatPart.length
}

Object.assign(Math, {
    // a + b
    plus (a, b) {
        const maxDigits = Math.max(digits(a), digits(b))
        const multiple = Math.pow(10, maxDigits)    // 10的n次幂
        return (a * multiple + b * multiple) / multiple
    },

    // a - b
    minus (a, b) {
        const maxDigits = Math.max(digits(a), digits(b))
        const multiple = Math.pow(10, maxDigits)    // 10的n次幂
        return (a * multiple - b * multiple) / multiple
    },

    // a * b
    multiply (a, b) {
        const maxDigits = Math.max(digits(a), digits(b))
        const multiple = Math.pow(10, maxDigits)    // 10的n次幂
        return (a * multiple) * (b * multiple) / Math.pow(multiple, 2)
    },

    // a / b
    divide (a, b) {
        const maxDigits = Math.max(digits(a), digits(b))
        const multiple = Math.pow(10, maxDigits)    // 10的n次幂
        return (a * multiple) / (b * multiple)
    }
})