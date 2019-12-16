import {routesComponent} from './routesComponent'

export const routes = [
	{
		path: '/register',
		name: 'register',
		component: routesComponent.registerComponent
	},
	{
		path: '/registerInto',
		name: 'registerInto',
		component: routesComponent.registerIntoComponent
	},
	{
		path: '/index',
		name: 'index',
		component: routesComponent.indexComponent,

		children:[
			{
				path: '/bookshelf',
				name: 'bookshelf',
				component: routesComponent.bookshelfComponent,
			},
			{
				path: '/selected',
				name: 'selected',
				component: routesComponent.selectedComponent,
			},
			{
				path: '/stackroom',
				name: 'stackroom',
				component: routesComponent.stackroomComponent,
			},
			{
				path: '/mine',
				name: 'mine',
				component: routesComponent.mineComponent,
			}
		]

	},

	//精品页内的二级路由转到的一级路由
	{
		path: '/classify',
		name: 'classify',
		component: routesComponent.classifyComponent
	},
	{
		path: '/ranking',
		name: 'ranking',
		component: routesComponent.rankingComponent
	},
	{
		path: '/boutique',
		name: 'boutique',
		component: routesComponent.boutiqueComponent
	},
	{
		path: '/girl',
		name: 'girl',
		component: routesComponent.girlComponent
	},
	{
		path: '/monthlySubscription',
		name: 'monthlySubscription',
		component: routesComponent.monthlySubscriptionComponent
	},

	//详情页
	{
		path: '/detailsPage',
		name: 'detailsPage',
		component: routesComponent.detailsPageComponent
	},

  //章节页面
  {
  	path: '/chapter',
  	name: 'chapter',
  	component: routesComponent.chapterComponent
  },

  //搜索页面
  {
  	path: '/search',
  	name: 'search',
  	component: routesComponent.searchPageComponent
  },

  //阅读页面
  {
  	path: '/read',
  	name: 'read',
  	component: routesComponent.readPageComponent
  },

  //快速充值页面
  {
  	path: '/quickRecharge',
  	name: 'quickRecharge',
  	component: routesComponent.quickRechargeComponent
  },

	{
		path: '*',
		redirect: {name:'registerInto'}
	}
]
