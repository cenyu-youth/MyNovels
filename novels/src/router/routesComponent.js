class RoutesComponent {

	constructor() {

	}

	registerComponent(){
		return import('../views/Register.vue')
	}

	registerIntoComponent(){
		return import('../views/RegisterInto.vue')
	}

	indexComponent(){
		return import('../views/Index.vue')
	}

	//主页面二级路由
	bookshelfComponent(){
		return import('../views/IndexViews/Bookshelf.vue')
	}

	selectedComponent(){
		return import('../views/IndexViews/Selected.vue')
	}

	stackroomComponent(){
		return import('../views/IndexViews/Stackroom.vue')
	}

	mineComponent(){
		return import('../views/IndexViews/Mine.vue')
	}

	//精品页面二级路由
	classifyComponent(){
		return import('../views/SelectedViews/Classify.vue')
	}

	rankingComponent(){
		return import('../views/SelectedViews/Ranking.vue')
	}

	boutiqueComponent(){
		return import('../views/SelectedViews/Boutique.vue')
	}

	girlComponent(){
		return import('../views/SelectedViews/Girl.vue')
	}

	monthlySubscriptionComponent(){
		return import('../views/SelectedViews/MonthlySubscription.vue')
	}

	detailsPageComponent(){
		return import('../views/DetailsPage.vue')
	}

  searchPageComponent(){
  	return import('../views/SearchPage.vue')
  }

  chapterComponent(){
  	return import('../views/Chapter.vue')
  }

  readPageComponent(){
  	return import('../views/ReadPage.vue')
  }

  quickRechargeComponent(){
  	return import('../views/QuickRecharge.vue')
  }
}

export const routesComponent = new RoutesComponent()
