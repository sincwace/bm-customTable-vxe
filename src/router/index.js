import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name: 'base', redirect: '/design' },

		// 首页
		{ path: '/design', name: 'design', component: resolve => require(['@/views/design'], resolve) },

		// demo
		{ path: '/demo', name: 'demo', component: resolve => require(['@/views/demo'], resolve) }
	]
})
