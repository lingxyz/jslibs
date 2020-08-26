/**
 * 讯飞语音转文字
 * 入参：
 * @params appId
 * @params apiKey
 * @params ip 本地公网ip，需要在讯飞后台配置
 *
 * 服务端使用：
const XF = new xfText2Voice({
	appId: '5b67f26e',
	apiKey: '60f5b8b4e254f9b9918ebf7798838bc2',
	ip: '116.228.216.18'
}).translate('哈哈哈');
 * 客户端使用：需要对url进行转发，解决跨域限制
 */
import { Base64 } from 'js-base64'
import md5 from 'blueimp-md5'
import axios from 'axios'

// 定义私有属性
const checkSum = Symbol('checkSum')
const paramsBase64 = Symbol('paramsBase64')
const curTime = Symbol('curTime')

export default class xfText2Voice {
	// 配置
	constructor({appId, apiKey, ip}) {
		this.url = 'http://api.xfyun.cn/v1/service/v1/tts'
		this.param = {
			'auf': 'audio/L16;rate=16000',
			'aue': 'raw',
			'voice_name': 'xiaoyan',
			'speed': '50',
			'volume': '50',
			'pitch': '50',
			'engine_type': 'intp65',
			'text_type': 'text'
		}

		Object.assign(this, {
			appId, apiKey, ip
		})

		return this
	}

	// 文字-语音转换
	async translate(text) {
		try {
			const response = await axios({
				method: 'post',
				url: this.url,
				params: {
					text: text
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
					'X-Real-Ip': this.ip,
					'X-Appid': this.appId,
					'X-CurTime': this[curTime](),
					'X-Param': this[paramsBase64](),
					'X-CheckSum': this[checkSum]()
				},
				responseType: 'arraybuffer',
				responseEncoding: 'utf8'
			})
			if (response.headers['content-type'] === 'audio/mpeg') {
				const blob = new Blob([response.data], {type: 'audio/wav'})
				const blobUrl = URL.createObjectURL(blob)
				const audio = new Audio(blobUrl)
				audio.play()
			}
		} catch (error) {
			console.error(error)
		}
	}

	// 组装CheckSum
	[checkSum] () {
		return md5(this.apiKey + this[curTime]() + this[paramsBase64]())
	}

	// base64转换
	[paramsBase64] () {
		return Base64.encode(JSON.stringify(this.param))
	}

	// 组装curTime
	[curTime] () {
		return Date.parse(new Date()).toString().substr(0, 10)
	}
}