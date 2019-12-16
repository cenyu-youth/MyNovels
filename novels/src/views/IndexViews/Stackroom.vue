<template>
	<div class="stackroom">
    <div class="header clearfix">
      <div class="tlt fl">书库</div>
      <div class="search fr" @click="searchs({name:'search'})"></div>
    </div>
    <div class="label-box">
      <div class="label-classify" v-for="(i , index) in labelJson" :key="index">
        <span @click="clickClassify(index,idx)" v-for="(item , idx) in i" :key="idx" :class="{spanActive : item.isAl}">{{item.txt}}</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="content">

      <div class="ct-card clearfix" @click="ready(i)" v-for="(i , index) in data" :key="index">
        <div class="card-lt fl">
          <img class="img-auto" :src="i.cover" alt="">
        </div>
        <div class="card-rt fl">
          <div class="card-rt-tlt">{{i.name}}</div>
          <div class="information-box">
            <span>{{i.author}} · </span>
            <span>25万字 · </span>
            <span>{{i.time}}</span>
          </div>
          <div class="brief-introduction">{{i.introduce}}</div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {classDatas} from '../../data/classData.js'
  import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
        labelJson:[
          [
            {txt:'全部小说',isAl:true},
            {txt:'玄幻奇幻',isAl:false},
            {txt:'武侠仙侠',isAl:false},
            {txt:'都市言情',isAl:false},
            {txt:'现实百态',isAl:false},
            {txt:'军事历史',isAl:false},
            {txt:'科幻网游',isAl:false},
            {txt:'恐怖灵异',isAl:false},
            {txt:'轻小说',isAl:false},
            {txt:'女生小说',isAl:false},
            {txt:'短篇其他',isAl:false}
          ],
          [
            {txt:'全部字数',isAl:true},
            {txt:'20万以下',isAl:false},
            {txt:'25万 ~ 50万',isAl:false},
            {txt:'50万 ~ 100万',isAl:false},
            {txt:'100万 ~ 200万',isAl:false},
            {txt:'200万以上',isAl:false}
          ],
          [
            {txt:'全部榜单',isAl:false},
            {txt:'周点击量',isAl:true},
            {txt:'周打赏榜',isAl:false},
            {txt:'周收藏榜',isAl:false},
            {txt:'周鲜花榜',isAl:false},
            {txt:'周月票榜',isAl:false}
          ],
          [
            {txt:'默认榜单',isAl:true},
            {txt:'VIP小说',isAl:false},
            {txt:'最新入库',isAl:false},
            {txt:'连载小说',isAl:false},
            {txt:'完本小说',isAl:false}
          ]
        ]
        ,
        allData:[],
        data:[]
      };
		},
    created(){
      this.allData = classDatas
      for(let j in this.allData){

        for(let i =0 ;i<this.allData[j].length;i++){
          this.data.push(this.allData[j][i]);
        }

      }

    },
    methods:{
      goState(o){
      	this.$router.push(o)
      },

      searchs(o){
        this.$router.push(o)
        this.$store.commit('changeSearchBack','stackroom')
      },

      clickClassify(index,idx){

        if(index == 0){

          this.data = []

          let txt = this.labelJson[index][idx].txt

          for(let i =0 ;i<this.allData[txt].length;i++){
            this.data.push(this.allData[txt][i]);
          }
        }

        for(let i = 0;i < this.labelJson[index].length; i++){
          this.labelJson[index][i].isAl = false
        }
        this.labelJson[index][idx].isAl = true

      },

      ready(a){
        this.$router.push({name:'detailsPage'})
        this.$store.commit('changeSearch',{url:a.url,location:'stackroom'});
      },
    },
	}
</script>

<style scoped lang="less">
  .stackroom{
    width: 100%;
    margin: 0 auto;
    padding-bottom: 1rem;
    >.header{
      width: calc(100% - 8%);
      margin: 0 auto;
      padding:0 4%;
      position: sticky;
      top: 24px;
      background: #fff;
      height: 50px;
      line-height: 50px;
      >.tlt{
        color: #333;
        font-size: .586rem;
        font-family: "微软雅黑";
        font-weight: 600;
        letter-spacing: .053rem;
      }
      >.search{
        width: .586rem;
        height: .586rem;
        background: url(../../assets/selected/search.png) no-repeat center center/cover;
        margin-top: .373rem;
      }
    }
    >.label-box{
      width: calc(100% - 8%);
      margin: 0 auto;
      position: sticky;
      padding: 0 4%;
      top: 74px;
      background: #fff;
      >.label-classify{
        white-space: nowrap;
        padding: .266rem 0;
        overflow-x: auto;
        >span{
          margin-right: .4rem;
          font-size: 14px;
          color: #666;
          font-family: "黑体";
        }
        >.spanActive{
          color: #1989FA;
        }
      }
    }
    >.content{
      width: 92%;
      margin: 0 auto;
      padding-top: .266rem;
      >.ct-card{
        width: 100%;
        margin: 0 auto .533rem;
        >.card-lt{
          width: 20%;
          margin-right: 2%;
        }
        >.card-rt{
          width: calc(100% - 22%);
          >.card-rt-tlt{
            color: #333;
            font-weight: 600;
            font-size: 16px;
          }
          >.information-box{
            color: #999;
            font-size: 12px;
            margin-top: 6px;
            >span:last-child{
              color:#0570DB;
            }
          }
          >.brief-introduction{
            color: #666;
						word-break:break-all;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						overflow:hidden;
            margin-top: 6px;
          }
        }
      }
    };
  }
</style>
