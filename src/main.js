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

Vue.use(VXETable)
Vue.use(ElementUI, { size: 'mini'})

Vue.prototype.$deepCopy = function(source) {
    let stringify = JSON.stringify(source)
    return JSON.parse(stringify)
}

new Vue({
	render: h => h(App),
	router,
	store
}).$mount("#app")

