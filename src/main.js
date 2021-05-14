import Vue from "vue"
import App from "./App"
import router from './router'
import store from './store'

import 'xe-utils'
import VXETable from 'vxe-table'
import ElementUI from 'element-ui'
import './assets/style/global.less'

import 'vxe-table/lib/index.css' 
import 'element-ui/lib/theme-chalk/index.css'

// import bmCustomTableVxe from 'bm-customtable-vxe'
import 'bm-customtable-vxe/lib/bm-customtable-vxe.less'
// Vue.use(bmCustomTableVxe)

Vue.use(VXETable)
Vue.use(ElementUI, { size: 'mini'})

new Vue({
	render: h => h(App),
	router,
	store
}).$mount("#app")

