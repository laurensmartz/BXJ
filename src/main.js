import Vue from 'vue/dist/vue.js'
import router from './router.js'
//import jQuery from 'jquery'
import MuiCss from '../css/mui.min.css'
import MuiJs from '../js/mui.min.js'
import CustomCss from '../css/custom/custom.css'
//import AjaxFun from '../js/common/ajaxFun.js'
//require('../js/common/ajaxFun.js')
//window.AjaxFun = AjaxFun
//Vue.prototype.AjaxFun = AjaxFun
//import HeaderSearch from '../components/vue/header-search.vue'
//开启vue错误提示
Vue.config.debug = true
//AjaxFun.test()
//MuiCss.init()
new Vue({
	el: '#app',
	router
})
var path = require('path')
//console.log(path.resolve(__dirname,'src/'))
