<template>
	<div>
    <div class="system"></div>
    <div class="classify">
      <div class="header clearfix">
        <span class="back fl" @click="goState({name:'selected'})"></span>
        <div class="tlt">分类</div>
      </div>
      <div class="nav-box clearfix">
        <div class="nav-lt fl">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item @click="changConetnt(i)" v-for="(i , index) in classKey" :key="index" :title="i" />
          </van-sidebar>
        </div>
        <div class="nav-rt fl clearfix">
          <div class="nav-card fl" @click="ready(i)" v-for="( i , index) in content" :key="index">
            <img :src="i.cover" alt="">
            <div>{{i.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {classDatas} from'../../data/classData.js'
	export default {
		data() {
			return {
        activeKey:0,
        className:[],
        classKey:[],
        content:[]
			};
		},
    created(){
      this.className = classDatas
      for(let i in this.className){
        this.classKey.push(i)
      }

      this.content = this.className['玄幻奇幻']

    },
    methods:{
        goState(o){
          this.$router.push(o)
        },
        ready(a){
          this.$router.push({name:'detailsPage'})
          this.$store.commit('changeSearch',{url:a.url,location:'classify'});
        },
        changConetnt(a){
          this.content = this.className[a]
        }
    }
	}
</script>

<style scoped lang="less">
  .classify{
    height: calc(100% - 24px);
    >.header{
      width: 100%;
      margin: 0 auto;
      padding: .266rem 0 .3rem;
      position: relative;
      border-bottom: .08rem solid #F8F8FA;
      margin-bottom: .266rem;
      position: sticky;
      top: 24px;
      background: #fff;
      z-index: 2;
      >.back{
        width: .533rem;
        height: .533rem;
        background: url(../../assets/detailsPage/prev.png) no-repeat center center/cover;
        margin-left: 4%;
        margin-top: .146rem;
      }
      >.tlt{
        font-size: .586rem;
        font-family: "微软雅黑";
        width: 1.28rem;
        position: absolute;
        top: .266rem;
        left: .533rem;
        right: .533rem;
        margin: 0 auto;
      }
    }
    >.nav-box{
      width: 92%;
      margin: 0 auto;
      >.nav-lt{
        width: 30%;
        height: 100%;
        overflow: hidden;
      }
      >.nav-rt{
        width: calc(70%);
        >div:nth-child(3n){
          margin-right: 0;
        }
        >.nav-card{
          width: 1.92rem;
          height: 3.5rem;
          margin-right: .266rem;
          >img{
            display: block;
            width: 100%;
          }
          >div{
            text-align: center;
            font-size: .32rem;
            color: #666;
            margin-top: .133rem;
            height: .373rem;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

</style>
