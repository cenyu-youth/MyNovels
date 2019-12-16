<template>
	<div class="bookshelf">
    <div class="header clearfix">
    	<div class="tlt fl">书架</div>
    	<div class="search fr" @click="searchs({name:'search'})"></div>
    </div>
    <div class="recent-reading">
      <div class="drop-down">
        <van-collapse v-model="activeNames" :border="false">
          <van-collapse-item title="最近阅读" name="1">
            <ul class="dc-list">
              <li @click='clickBooks(i)' v-for="(i , index) in  nearbyRead" :key="index">
                <img :src="i.cover" alt="">
                <div>{{i.name}}</div>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <div class="line"></div>
    <div class="collection">
      <div class="cn-header clearfix">
        <div class="collection-txt fl">在追的书</div>
        <div class="collection-icon fr" :class="{animate : isAnimate}" @click="changeCollection"></div>
      </div>
      <ul class="cn-list">
        <li @click="clickBooks(i)" class="clearfix" v-for="(i , index) in readData" :key="index">
          <div class="cn-lis-lt fl">
            <img class="img-auto" :src="i.cover" alt="">
          </div>
          <div class="cn-lis-rt fl">
            <div class="lis-rt-tlt">{{i.name}}</div>
            <div class="information">
              <span>{{i.author}} · </span>
              <span>{{i.tag}} · </span>
              <!-- <span>{{i.list.length * 4000 / 10000}}万字 · </span> -->
              <span>{{i.time.slice(5,11)}}日</span>
            </div>
            <div class="speed-of-progress">
              <span>
                <span>116</span>
                <span>/</span>
                <span>126</span>
              </span>
              <span> | </span>
              <!-- <span>第{{i.list.length + 1}}章 </span> -->
              <span> {{i.num}}</span>
            </div>
            <div class="operation-box">
              <span v-show="!isDel" class="operation" @click.stop="changDel"></span>
              <span v-show="isDel" class="on-del">
                <button @click.stop="onDel(i,index)">删除</button>
                <button  @click.stop="changDel">取消</button>
               </span>
            </div>
          </div>
        </li>



      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
        isDrop:true,
        isShow:true,
        isAnimate:false,
        isDel:false,
        activeNames:['1'],
        recentlyJson:[{
          name:''
        }],
        nearbyRead:[{cover:'asdas',name:'1231'}],
        readData:[
          {
            author: '123',
            cover: '123',
            introduce: '123',
            name: '123',
            num: '123',
            tag: '123',
            time: '123',
            url: '123',
          }
        ]
			};
		},
    created(){

      let self = this
      
      
      this.readData = []
      
      this.nearbyRead=[]

      let myBookShelf = JSON.parse(localStorage.getItem('bookShelfs'));
      if(myBookShelf){
        this.recentlyJson = myBookShelf;

        this.readData = []

        this.nearbyRead=[]


        for(let i=0;i<this.recentlyJson.length;i++){
          this.ajax(this.recentlyJson[i].name).then(result => {
            self.readData.push(JSON.parse(result).list[0])
            if(i < 4){
              self.nearbyRead.push(JSON.parse(result).list[0])
            }
          })
        }


      }
    },
    computed:{
      ...mapState(['searchBack'])
    },
    methods:{
      clickBooks(i){
        let self = this
        this.XsAjax(i.url).then(result => {

          let res = JSON.parse(result)

          self.$store.commit('changeList',{location:'bookshelf',list:res.list,name:res.data.name});
          self.$store.commit('changeSearchBack','bookshelf');
          self.$router.push({name:'read'})

        })
      },
      searchs(o){
        this.$router.push(o);
        this.$store.commit('changeSearchBack','bookshelf')
      },
      goState(o){
      	this.$router.push(o);
      },
      changeDrop(){
        this.isDrop = !this.isDrop;
        this.isShow = !this.isShow;
      },
      changeCollection(){
        let self = this
        this.isAnimate = true;
        setTimeout(function(){
            self.isAnimate = false;
        },5000)
      },
      changDel(){
        this.isDel = !this.isDel;
      },
      onDel(i,idx){
        let myBookShelf = JSON.parse(localStorage.getItem('bookShelfs'));
        myBookShelf.splice(i,1)
        localStorage.setItem('bookShelfs',JSON.stringify(myBookShelf))
        this.recentlyJson = myBookShelf

        let self = this
        self.nearbyRead = []
        self.readData = []


        this.readData = []

        this.nearbyRead=[]


        for(let i=0;i<this.recentlyJson.length;i++){
          this.ajax(this.recentlyJson[i].name).then(result => {
            self.readData.push(JSON.parse(result).list[0])
            if(i < 4){
              self.nearbyRead.push(JSON.parse(result).list[0])
            }
          })
        }

      },
      async ajax(o){
        return await new Promise((resolve,reject) => {

          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
              resolve(this.responseText)
            }
          }

          xhr.open('Get' ,'http://api.pingcc.cn/?xsname=' + o,false)

          xhr.send(null)
        })
      },
      //获取数据
      XsAjax(o){
        return new Promise((resolve,reject) => {

          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
              resolve(this.responseText)
            }
          }

          xhr.open('Get' ,'http://api.pingcc.cn/?xsurl1=' + o,true)

          xhr.send(null)
        })
      }
    }
	}
</script>

<style scoped lang="less">
  .bookshelf{
    padding-bottom: .7rem;
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
    .recent-reading{
      width: 92%;
      margin: 0 auto;
      padding: 0 0 .4rem;
      >.drop-down{
        >.drop-tlt{
          >.tlt-txt{
            font-size: .426rem;
            color: #333;
            font-weight: 700;
          }
          >.tlt-arrow{
            width: .426rem;
            height: .426rem;
            background: url(../../assets/bookshelf/down.png) no-repeat center center/cover;
          }
          >.tltArrowActive{
            background: url(../../assets/bookshelf/up.png) no-repeat center center/cover;
          }
        }
          .dc-list{
            width: 100%;
            margin: 0 auto;
            padding: .266rem 0;
            >li{
              width: 18%;
              float: left;
              margin:0 3.5% ;
              >img{
                width: 100%;
                display: block;
              }
              >div{
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }

      }
    }
    .collection{
      width: 92%;
      margin: 0 auto;
      padding: .266rem 0;
      >.cn-header{
        >.collection-txt{
          font-size: .426rem;
          color: #333;
          font-weight: 700;
        }
        >.collection-icon{
          width: .4rem;
          height: .4rem;
          background: url(../../assets/bookshelf/refresh.png) no-repeat center center/cover;
          margin-top: .08rem;
        }
        >.animate{
          animation:myfirst 5s linear;
        }
      }
      >.cn-list{
        width: 100%;
        margin: 0 auto;
        padding: .266rem 0;
        >li{
          width: 100%;
          margin: 0 auto .533rem;
          position: relative;
          >.cn-lis-lt{
            width: 20%;
            margin-right: 2%;
          }
          >.cn-lis-rt{
            width: calc(100% - 22%);
            >.lis-rt-tlt{
              color: #333;
              font-size: .426rem;
              font-weight: 600;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            >.information{
                color: #999;
                font-size: .32rem;
                margin-top: .266rem;
                >span:last-child{
                  color: #00D0FF;
                }
            }
            >.speed-of-progress{
              color: #666;
              margin-top: .266rem;
              >span:first-child{
                color: #999;
              }
            }
            >.operation-box{
              >.operation{
                display: block;
                width: .4rem;
                height: .4rem;
                background: url(../../assets/bookshelf/operation.png) no-repeat center center/cover;

                  position: absolute;
                  bottom: .266rem;
                  right: 0;
              }
              >.on-del{
                  position: absolute;
                  bottom: .133rem;
                  right: 0;
                >button{
                  width: .8rem;
                  height: .533rem;
                  border: none;
                  background: #eee
                }
                >button:last-child{
                  background: #3890F1;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
  @-webkit-keyframes myfirst /* Safari and Chrome */
  {
  	0% {
      transform:rotate(0deg);
      background: url(../../assets/bookshelf/refresh-active.png) no-repeat center center/cover;
    }
    100%{
      transform:rotate(720deg);
      background: url(../../assets/bookshelf/refresh.png) no-repeat center center/cover;
    }
  }
</style>
