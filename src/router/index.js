import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name: 'base', redirect: '/home' },

		// 首页
		{ path: '/home', name: 'home', component: resolve => require(['@/views/home'], resolve) },

		// demo
		{ path: '/demo', name: 'demo', component: resolve => require(['@/views/demo'], resolve) }
	]
})
