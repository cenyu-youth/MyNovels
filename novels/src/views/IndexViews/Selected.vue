<template>
	<div class="selected">
		<div class="header clearfix">
			<div class="tlt fl">精选</div>
			<div class="search fr" @click="searchs({name:'search'})"></div>
		</div>
		<div class="banner-box">
			<van-swipe :autoplay="4000" indicator-color="white">
				<van-swipe-item>
					<img src="https://static.zongheng.com/upload/recommend/current/2019/1575537739835.jpg" class="img-auto" alt="">
				</van-swipe-item>
				<van-swipe-item>
					<img src="https://static.zongheng.com/upload/recommend/current/2019/1575537774420.jpg" class="img-auto"  alt="">
				</van-swipe-item>
				<van-swipe-item>
					<img src="https://static.zongheng.com/upload/recommend/current/2019/1575537739835.jpg" class="img-auto" alt="">
				</van-swipe-item>
				<van-swipe-item>
					<img src="https://static.zongheng.com/upload/recommend/current/2019/1575537774420.jpg" class="img-auto"  alt="">
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="nav-box">
			<ul class="nav-list clearfix">
				<li class="fl" @click="goState({name:'classify'})">
					<i class="classify"></i>
					<span>分类</span>
				</li>
				<li class="fl"  @click="goState({name:'ranking'})">
					<i class="ranking"></i>
					<span>排行</span>
				</li>
				<li class="fl"  @click="goState({name:'boutique'})">
					<i class="boutique"></i>
					<span>精品</span>
				</li>
				<li class="fl"  @click="goState({name:'girl'})">
					<i class="girl"></i>
					<span>女生</span>
				</li>
				<li class="fl"  @click="goState({name:'monthlySubscription'})">
					<i class="month"></i>
					<span>包月</span>
				</li>
			</ul>
		</div>
		<div class="noticeBar-box">
			<van-swipe  :autoplay="4000" :show-indicators='false' loop style="height: .8rem;" vertical>
				<van-swipe-item>
					<div class="notice clearfix">
						<div class="tag fl">无敌</div>
						<div class="fl">重生在封神大战之前的上古时代</div>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="notice clearfix">
						<div class="tag fl">无敌</div>
						<div class="fl">重生在封神大战之前的上古时代</div>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="notice clearfix">
						<div class="tag fl">无敌</div>
						<div class="fl">重生在封神大战之前的上古时代</div>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="notice clearfix">
						<div class="tag fl">无敌</div>
						<div class="fl">重生在封神大战之前的上古时代</div>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="content">
			<div class="ct-header clearfix">
				<div class="ct-tlt fl">火热推荐</div>
				<div class="more fr" @click="onClickMore"><span>更多</span> <i></i></div>
			</div>
		</div>
		<div class="recommend">
			<ul class="rd-list">
				<li class="rd-card clearfix" @click="details(i)" v-for="(i , index) in data" :key="index">
					<div class="re-cd-pic fl" :style="[{'backgroundImage': 'url('+ i.cover +')'}]"></div>
					<div class="re-cd-txt-box fl">
						<div>{{i.name}}</div>
						<div>{{i.author}}·{{i.tag}}·连载·25万字</div>
						<div>{{i.introduce}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import {data} from '../../data/firstPage.js'
  import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
        data:{}
			};
		},
    created(){
      this.data = data
    },
		methods:{
			onClickMore(){},

      searchs(o){
        this.$router.push(o)
        this.$store.commit('changeSearchBack','selected')
      },

			goState(o){
				this.$router.push(o)
			},

			details(a){
        this.$router.push({name:'detailsPage'})
        this.$store.commit('changeSearch',{url:a.url,location:'selected'});
			}
		}
	}
</script>

<style scoped lang="less">
	.selected{
		padding: 0 0 1.7rem;
	}
	.header{
		width: calc(100% - 8%);
		margin: 0 auto .133rem;
		padding:.133rem 4% .266rem;
    position: sticky;
    top: 24px;
    background: #fff;
    z-index: 10;
	}
	.tlt{
		color: #333;
		font-size: .586rem;
		font-family: "微软雅黑";
		font-weight: 600;
		letter-spacing: .053rem;
	}
	.search{
		width: .586rem;
		height: .586rem;
		background: url(../../assets/selected/search.png) no-repeat center center/cover;
    margin-top: .093rem;
	}
	.banner-box{
		height: 3.6rem;
		overflow: hidden;
	}
	.nav-list{
		width: calc(100% - 4% - .266rem - .266rem);
		margin: 0 auto;
		display:flex;
		padding:.266rem;
		>li{
			width: auto;
			margin: auto;
			text-align: center;
			>span{
				color: #666;
				font-size: .373rem;
			}
			>i{
				display: block;
				width: .666rem;
				height: .666rem;
				margin: .133rem 0;
			}
			>.classify{
				background: url(../../assets/selected/classify.png) no-repeat center center/cover;
			}
			>.ranking{
				background: url(../../assets/selected/ranking.png) no-repeat center center/cover;
			}
			>.boutique{
				background: url(../../assets/selected/boutique.png) no-repeat center center/.533rem .666rem;
			}
			>.girl{
				background: url(../../assets/selected/girl.png) no-repeat center center/.533rem .666rem;
			}
			>.month{
				background: url(../../assets/selected/month.png) no-repeat center center/.64rem .666rem;
			}

		}
	}

	.noticeBar-box{
		width: 92%;
		margin: .133rem auto;
		box-shadow: 0 0 4px 1px #ccc;
		border-radius: 4px;
		padding:.133rem 0;
	}
	.notice{
		margin: 0 auto;
		>div:last-child{
			max-width: calc(100% - 1.2rem);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			line-height: .8rem;
			color: #999999;
			font-size: .426rem;
		}
		>.tag{
			width: 1.04rem;
			height:.533rem;
			background: linear-gradient(to top right,#4399E9 , #53C5EF);
			text-align: center;
			color: #fff;
			border-radius: 3px;
			line-height: .533rem;
			margin:.133rem .266rem 0;
		}
	}
	.ct-header{
		width:92%;
		margin: 0 auto;
		padding:.266rem 0;
		>.ct-tlt{
			font-size: .48rem;
			color: #333;
			letter-spacing: .026rem;
			font-family: "sans-serif";
			font-weight: 600;
		}
		>.more{
			font-size: .373rem;
			color: #999999;
			>span{
				float: left;
			}
			>i{
				display: block;
				float: left;
				width: .426rem;
				height: .426rem;
				background: url(../../assets/selected/more.png) no-repeat center center/cover;
				margin: .04rem .053rem 0;
			}
		}
	}

	.recommend{
		width: 92%;
		margin: 0 auto;
		>.rd-list{
			width: 100%;
			margin: 0 auto;
			list-style: none;
			>li:last-child{
				margin-bottom: 5px;
			}
			>.rd-card{
				margin: 0px 0 .533rem;
				height:2.34rem;
				>.re-cd-pic{
					width: 1.76rem;
					height: 2.34rem;
					background: url(//bookcover.yuewen.com/qdbimg/349573/1013432302/150) no-repeat center center/cover;
					margin-right:.266rem;
				}
				>.re-cd-txt-box{
					width: calc(100% - 1.76rem - .266rem);
					>div:nth-child(1){
						font-size: .426rem;
						font-weight: bold;
						letter-spacing: 1px;
						font-family: "黑体";
						color: #333;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					>div:nth-child(2){
						font-size: .373rem;
						letter-spacing: 1px;
						font-family: "黑体";
						color: #999999;
						margin: .213rem 0;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					>div:nth-child(3){
						font-size: .426rem;
						letter-spacing: 1px;
						font-family: "黑体";
						color: #989797;
						margin: .266rem 0 0;
						word-break:break-all;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						overflow:hidden;
					}
				}
			}
		}
	}
</style>
