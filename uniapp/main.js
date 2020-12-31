import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


// 引入全局组件
import {
	SHeader
} from './components'
Vue.component('SHeader', SHeader)

const app = new Vue({
	...App
})
app.$mount()
