import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//根据屏幕适配rem
import 'lib-flexible/flexible'

import {
	Field,
	CellGroup,
	Button,
	Dialog,
	Divider,
	Tabbar,
	TabbarItem,
	NavBar,
	Swipe,
	SwipeItem,
	Grid,
	GridItem,
	Icon,
	Tag,
	Rate,
  Sidebar,
  SidebarItem,
  Toast,
  Collapse,
  CollapseItem,
  Slider,
  Notify,
  Sku,
  Tab,
  Tabs
 } from 'vant'

Vue
	.use(Field)
	.use(CellGroup)
	.use(Button)
	.use(Dialog)
	.use(Divider)
	.use(Tabbar)
	.use(TabbarItem)
	.use(NavBar)
	.use(Swipe)
	.use(SwipeItem)
	.use(Grid)
	.use(GridItem)
	.use(Icon)
	.use(Tag)
	.use(Rate)
	.use(Sidebar)
	.use(SidebarItem)
	.use(Toast)
	.use(Collapse)
	.use(CollapseItem)
	.use(Slider)
	.use(Notify)
	.use(Sku)
	.use(Tab)
	.use(Tabs)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
