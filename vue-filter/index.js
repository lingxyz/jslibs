import number from './filter/number'

function install (Vue) {
	Vue.filter('number', number)
}

export default {
	install,
	number,
}