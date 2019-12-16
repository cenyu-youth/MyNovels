<template>
  <div class="box">
    <div class="system"></div>
    <div class="chapter">
      <div class="header clearfix">
      	<div class="back fl" @click="goState()"></div>
        <span>{{data.data.name}}</span>
      	<div class="his fr"></div>
      </div>
      <div class="catalog">
        <div class="catalog-tp">目录</div>
        <div class="catalog-bt clearfix">
          <span class="fl">共{{data.list.length}}章</span>
          <span class="fr" @click="flip">倒序</span>
        </div>
      </div>
      <div class="content">
        <div v-for="(i , index) in list" :key="index" @click="reader(index)">{{i.num}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default{
    data(){
      return{
        data:{},
        list:{},
        back:'',
        url:''
      }
    },
    computed:{
      ...mapState({
        content:'content',
        index:'index'
      })
    },
    created(){

      // let result = this.content;
      this.data = this.content.list;
      this.back = this.content.location
      this.list = this.data.list
      this.url = this.content.url

    },
    methods:{
      flip(){
        this.list.reverse()
      },
      goState(){
        let self = this
        this.$router.push({name:self.back,query:{url:self.url}})
      },
      reader(i){
        this.$router.push({name:'read'})
        this.$store.commit('changeIndex',{index:i,success:0})
      }
    }
  }
</script>

<style scoped lang="less">
  .box{
    height: 100%;
  }
  .chapter{
    width: 92%;
    margin: 0 auto;
    padding-bottom: .133rem;
    height: calc(100% - 24px - .133rem);
    overflow-y: auto;
    >.header{
    	width: 100%;
    	margin: 0 auto;
    	padding: .133rem 0 .266rem;
    	border-bottom: .08rem solid #fbfbfb;
      position: fixed;
      top: .64rem;
      left: 0;
      background: #fff;
    	>.back{
    		width: .533rem;
    		height: .533rem;
    		background: url(../assets/detailsPage/prev.png) no-repeat center center/cover;
    		margin-right: .266rem;
    	}
    	>.his{
    		width: .533rem;
    		height: .533rem;
    		background: url(../assets/selected/search.png) no-repeat center center/cover;
    		margin-right:  .266rem;
    	}
      >span{
        font-size: .426rem;
        color: #000;
      }
    }
    .catalog{
      margin-top: 44px;
      >.catalog-tp{
        text-align: center;
        padding: .266rem 0;
        border-bottom: 1px solid #666;
        font-size: .426rem;
        font-weight: 600;
        height: 22px;
      }
      >.catalog-bt{
        font-size: .32rem;
        color: #666;
        padding: .133rem 0;
      }
    }

    >.content{
      overflow-y: auto;
      height: calc(100% - 22px);
      >div{
        font-size: .426rem;
        color: #333;
        padding: .266rem 0;
        font-weight: 200;
        border-bottom: .026rem solid #999;
      }
    }
  }
</style>
