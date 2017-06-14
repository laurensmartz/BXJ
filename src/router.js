import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import BundleCard from './components/bundle_card.vue'
import Login from './components/views/login.vue'
import Index from './components/views/index.vue'
import Message from './components/views/message.vue'
import Mine from './components/views/mine.vue'
import Setting from './components/views/setting.vue'
import fun from '../js/common/fun.js'
//import MuiJs from '../js/mui.min.js'
//import AjaxFun from '../js/common/ajaxFun.js'

Vue.use(Router)

var router =  new Router({
  routes: [
  	{
  		path: '/',
  		name: 'index',
  		component: Index,
  		beforeEnter: (to, from, next) => {
  			existToken(next)
      }
  	},
  	{
  		path: '/login',
  		name: 'login',
  		component: Login,
  		beforeEnter: function(to, from, next){
  			var token_g = fun.existToken()

				if(token_g){
					next('/mine')			
				} else {
					next()
				}
  		}
  	},
  	{
  		path: '/bundle_card',
  		name: 'bundleCard',
  		component: BundleCard
  	},
  	{
			path: '/mine',
			name: 'mine',
			component: Mine,
			beforeEnter: (to, from, next) => {
				existToken(next)
			}
  	},
  	{
  		path: '/setting',
  		name: 'setting',
  		component: Setting,
  		beforeEnter: (to, from, next) => {
				existToken(next)
			}
  	},
  	{
  		path: '/message',
  		name: 'message',
  		component: Message,
  		beforeEnter: (to, from, next) => {
				existToken(next)
			}
  	}
  ]
})
//未登入则跳转到登入页面
function existToken(next){
	var token_g = fun.existToken()
//		console.log(token_g)
	if(token_g){
		next()			
	} else {
		next('/login')
	}
}
/*router.beforeEach((to, from, next) => {
	var token_g = fun.existToken()
	if(token_g){
		next('/')
//		console.log(token_g)
	} else {
		next('/login')
	}
//		is_certification = sessionStorage.getItem('is_certification')
})*/
export default router