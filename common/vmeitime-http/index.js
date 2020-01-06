import http from './interface'
import {aes,
  md5,
  sha256,
  base64,
  sign} from '../../static/js/security'
var config={
	dataType:'json'
}
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */
export const get = (para) => {
	//level=1 报文数据需要加密
	if(para.level==1){
		para.data={openId: aes.en(JSON.stringify(para.data))};
	}else if(para.level==2){//报文数据需要签名
		let timestamp = new Date().getTime();
		para.data.timestamp=timestamp
		var _token =  '1212121'
		var _sign = sign(para.data,'11111111111111111111111111111111')
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			config.header = {
				"token": _token
			} 
		}
		para.data.sign=_sign
	}
	console.info("我们"+1)
	if(para.header==''){
		console.info(1)
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			config.header = {
				'Content-Type':'application/json;charset=UTF-8'
			} 
		}
	}else{
		console.info(2)
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			config.header = {
				'Content-Type':para.header.Content-Type
			} 
		}
	}


	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response
	}
		return http.request({
	    url:para.url,
		dataType: para.dataType || config.dataType,
		method: 'GET',
	    data:para.data
	})
  }

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */
export const post = (para) => {
	//level=1 报文数据需要加密
	if(para.level==1){
		para.data={openId: aes.en(JSON.stringify(para.data))};
	}else if(para.level==2){//报文数据需要签名
		let timestamp = new Date().getTime();
		para.data.timestamp=timestamp
		var _token =  '1212121'
		var _sign = sign(para.data,'11111111111111111111111111111111')
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			config.header = {
				"token": _token
			} 
		}
		para.data.sign=_sign
	}
	if(para.header==undefined){
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			config.header = {
				'Content-Type':'application/json;charset=UTF-8'
			} 
		}
	}else{
		//设置请求前拦截器
		http.interceptor.request = (config) => {
			config.header = {
				'Content-Type':para.header.ContentType
			} 
		}
	} 
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response
	}
	console.info('类型:'+para.url)
		return http.request({
	    url:para.url,
		dataType: para.dataType || config.dataType,
		method: 'POST',
	    data:para.data
	})
  }

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {

	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	}
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: '',
        url: '',
		dataType: 'text',
        data,
    })
}

// 轮播图
export const banner = (data) => {
    return http.request({
        url: '/banner/36kr',
        method: 'GET', 
        data,
		// handle:true
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	post,
	test,
    banner
}