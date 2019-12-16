<template>
	<div>
		<div class="system"></div>
		<div>
			<router-view></router-view>
		</div>
		<div>
			<van-tabbar
				v-model="active"
				active-color="#3890F1"
				inactive-color="#8B8B8B"
				class="footer"
			>
				<van-tabbar-item  icon="bookmark-o" @click="goState({name:'bookshelf'})">书架</van-tabbar-item>
				<van-tabbar-item icon="diamond-o" @click="goState({name:'selected'})">精选</van-tabbar-item>
				<van-tabbar-item icon="orders-o" @click="goState({name:'stackroom'})">书库</van-tabbar-item>
				<van-tabbar-item icon="manager-o" @click="goState({name:'mine'})">我的</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
        activeList:['/bookshelf','/selected','/stackroom','/mine']
			};
		},
		methods:{
			goState(o){
				this.$router.push(o)
			}
		},
    created(){
      this.active = this.activeList.indexOf(this.$route.path);
    },
    afterRouteEnter(to, from){
      let actives = to.matched[1].name;
    },
	}
</script>

<style scoped lang="less">
	.footer{
		// padding-bottom: .133rem;
	}
</style>
