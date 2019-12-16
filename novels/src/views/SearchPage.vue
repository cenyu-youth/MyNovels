<template>
  <div>
    <div class="system"></div>
    <div class="search">
      <div class="header clearfix">
        <div class="inp fl">
          <i></i>
          <input type="text" placeholder="搜索..." v-model="val" @input="changeInp">
        </div>
        <div class="cancel fl" v-show="isTrue" @click="cancel">取消</div>
        <div class="cancel fl" v-show="!isTrue" @click="searchActive">搜索</div>
      </div>
      <div v-show="isShow">
        <div class="recommend">
          <div class="rd-tlt">大家都在搜</div>
          <ul class="rd-list clearfix">
            <li @click="hotSearch(i)" v-for="(i , index) in hotRecommendation" :key="index">{{i}}</li>
          </ul>
        </div>
        <div class="history">
          <div class="his-tlt">搜索历史</div>
          <ul class="rd-list clearfix">
            <li @click="hotSearch(i)"  v-for="(i , index) in history" :key="index">{{i}}</li>
          </ul>
        </div>
      </div>
      <div class="search-result" v-show="!isShow">
        <div class="result-sum">搜索“<span>{{tlt}}</span>”共<span>{{data.length}}</span>条结果</div>
        <div class="sr-card clearfix" v-for="(i , index) in data" :key="index" @click="goState(i)">
          <div class="sr-pic fl">
            <span></span>
            <img class="img-auto" :src="i.cover" alt="">
          </div>
          <div class="sr-txt-box fl">
            <div class="txt-box-tlt">{{i.name}}</div>
            <div class="box-brief-introduction">{{i.introduce}}</div>
            <div class="author-information clearfix">
              <div class="author fl">{{i.author}}著</div>
              <div class="information-box fr">
                <span class="fl">{{i.tag}}</span>
                <span class="fr">{{i.num}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="devceTip" v-show="tipShow">未获取到“{{tipContent}}”相关的书籍</div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default{
    data(){
      return{
        isTrue:true,
        val:'',
        isShow:true,
        tlt:'',
        data:{},
        history:[],
        tipShow:false,
        tipContent:'',
        hotRecommendation:[
          '手术直播间',
          '绝对一番',
          '最初金华',
          '手术直播间',
        ]
      }
    },
    created(){

      let his = JSON.parse(localStorage.getItem('searchHistory'));
      if(his){
        this.history = this.history.concat(his)
      }
    },
    computed:{
      ...mapState(['search']),
      ...mapState(['searchBack'])
    },
    methods:{
      hotSearch(i){
        this.val = i
        this.searchActive()
      },
      cancel(){

        if(!this.isShow){
          this.isShow = true;
          this.data = {}
          this.tipShow = false
          return;
        }

        self.tipShow = false
        this.data = {}
        this.$router.push({name:this.searchBack})
      },
      searchActive(){


        let self = this;

        let flag = false

        this.ajax(this.val).then(result => {

          if(JSON.parse(result).code == 1){
            self.tipShow = true
            self.isShow = false;
            self.tipContent = self.val
            flag = true
            self.$toast.clear();
            self.val = ''
            return
          }

          self.data = JSON.parse(result).list;
          self.isShow = false;
          self.tipShow = false
          self.tlt = self.val;
          self.val = ''
          self.isTrue = true;
          self.$toast.clear();
        })

        if(flag){
          return
        }

        this.history.unshift(this.val)

        if(this.history.length > 20){
            this.history = this.history.slice(5)
        }

        localStorage.setItem('searchHistory',JSON.stringify(this.history))

        // this.$toast({
        //   message: '加载中...',
        //   forbidClick: true
        // });
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration:0
        });

      },
      changeInp(){
        let val = this.val;

        this.data={}
        self.tipShow = false
        self.isShow = false;

        if(val.trim() == ''){
          this.isTrue = true
        }else if(val.trim() != ''){
          this.isTrue = false
        }
      },
      goState(a){
        this.$router.push({name:'detailsPage'})
        this.$store.commit('changeSearch',{url:a.url,location:'search'});
      },
      ajax(o){
        return new Promise((resolve,reject) => {

          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
              resolve(this.responseText)
            }
          }

          xhr.open('Get' ,'http://api.pingcc.cn/?xsname=' + o,true)

          xhr.send(null)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .search{
    .header{
      width: 92%;
      margin: 0 auto;
      padding: .133rem 0;
      position: sticky;
      top: 24px;
      z-index: 10;
      background: #fff;
      >.inp{
        width: 88%;
        height: .96rem;
        background: #F2F2F2;
        border-radius: .533rem;
        position: relative;
        margin-right: 2%;
        >i{
          position: absolute;
          top: 50%;
          left: .266rem;
          width: .533rem;
          height: .533rem;
          margin-top: -.266rem;
          background: url(../assets/selected/search.png) no-repeat center center/cover;
        }
        >input{
          border: none;
          width: 100%;
          height: 100%;
          background: transparent;
          text-indent: 3em;
          color: #666;
        }
      }
      >.cancel{
        width: 10%;
        font-size: .426rem;
        line-height: .96rem;
        color: #666;
      }
    }

    .recommend{
      width: 92%;
      margin: 0 auto;
      >.rd-tlt{
        color: #666;
        padding: .266rem 0;
      }
    }

    .rd-list{
      width: calc(100% - .266rem);
      margin: 0 auto;
      background: #F7F7F7;
      padding: .266rem .133rem;
      >li{
        border: .026rem solid #969BA3;
        font-size: .373rem;
        color: #969BA3;
        border-radius: .4rem;
        padding: .133rem .266rem;
        text-align: center;
        float: left;
        margin: .133rem .133rem;
      }
    }
    .history{
      width: 92%;
      margin: 0 auto;
      >.his-tlt{
        color: #666;
        padding: .266rem 0;
      }
    }


    .search-result{
      width: 92%;
      margin: .266rem auto 0;
      >.result-sum{
        font-size: .426rem;
        color: #333;
        text-align: center;
        margin-bottom: .266rem;
        >span{
          color: #00D0FF;
        }
      }
      >.sr-card{
        width: 100%;
        margin: .266rem 0;
        >.sr-pic{
          width: 25%;
          margin-right: 2%;
          position: relative;
          height: 3.2rem;
          >span{
            display: block;
            width: 80%;
            height: 2.66rem;
            position: absolute;
            top: 0;
            left: 10%;
            background: #C8C9CC;
            z-index: -1;
          }
        }
        >.sr-txt-box{
          width: calc(100% - 27%);
          >.txt-box-tlt{
            color: #333;
            font-size: .426rem;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          >.box-brief-introduction{
            word-break:break-all;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            overflow:hidden;
            color: #969BA3;
            font-size: .373rem;
            margin-top: .266rem;
          }
          >.author-information{
            margin-top: .266rem;
            >.author{
              color: #666;
              font-size: .32rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 30%;
            }
            >.information-box{
              text-align: right;
              width: 70%;
              display: flex;
              >span{
                color: #00D0FF;
                margin-right: .133rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              >span:first-child{
                display: block;
                border: .026rem solid #E5E6E8;
                color: #D6C6C3;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    .devceTip{
      text-align: center;
      color: #666;
      font-size: 20px;
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
