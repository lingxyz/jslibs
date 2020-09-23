import formatNumber from '../lib/formatNumber'

/**
 * 数字过滤器
 * @returns {number|string}
 * @param {numer|string} value 数据
 * @param {number} fixed 小数位
 * @param {boolean} comma 是否千分位
 */
function number (...args) {
	return formatNumber(...args)
}

export default number
