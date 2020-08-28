import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/httpRequest'
Vue.config.productionTip = false
// #ifdef H5
window.QQmap = null;
// #endif
// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
	uni.onNetworkStatusChange(function(res) {
		//console.log(res.networkType);
		store.commit("networkChange", {
			isConnected: res.isConnected
		})
	});
}, 100)
// #endif
const setCache = (key, value, seconds) => {
	try {
		if (key && value) {
			console.log(value);
			uni.setStorage(key, value);
		}
		if (seconds) {
			let expire = new Date().getTime() + parseInt(seconds);
			uni.setStorage(key + 'expire', expire);
		}
		console.log('设置缓存成功：'+key);
	} catch (e) {
		console.log('设置缓存失败:' + e.message);
	}
};
const getCache = (key) => {
	try {
		const expireTime = uni.getStorage(key + 'expire');
		const nowTime = new Date().getTime();
		if (expireTime < nowTime) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.log('判断缓存是否过期出错:' + e.message);
	}
};
Vue.prototype.$setStorage = {setCache};
Vue.prototype.$getStorage = {getCache};
Vue.prototype.tui = tui;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()