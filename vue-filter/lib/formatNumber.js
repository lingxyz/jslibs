/**
 * 数字格式化
 * @param {number|sting} number 需格式化数据
 * @param {number} fixed 小数位
 * @param {boolean} comma 千分符
 * @param {boolean} abs 绝对值
 */
function formatNumber (number, fixed = 0, comma = false, abs = false) {
	let reg = /\B(?=(\d{3})+(?!\d))/g
	let num = 0

	// 处理后端返回带千分符情况
	if (isNaN(number)) {
		num = Number(String(number).replace(/,/g, ''))
		if (isNaN(num)) return '-'
	} else num = Number(number)

	if (abs) num = Math.abs(num)

	num = num.toFixed(fixed)
	if (comma) num = num.replace(reg, ',')

	return num
}

export default formatNumber
