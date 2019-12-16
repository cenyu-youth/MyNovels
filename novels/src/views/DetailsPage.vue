<template>
	<div>
		<div class="system"></div>
		<div class="detailsPage" v-if="data.data">
			<div class="header clearfix">
				<div class="back fl" @click="back"></div>
				<div class="his fr" @click="his"></div>
			</div>
			<div class="information-box">
				<div class="information-header clearfix">
					<div class="pic fl">
            <img class="img-auto" :src="data.data.cover" alt="">
          </div>
					<div class="ih-txt-box fl">
						<div class="ih-tlt">{{data.data.name}}</div>
            <div class="star-rating">
              <van-rate
                v-model="value"
                :size="15"
                color="#ee0a24"
                void-icon="star"
                void-color="#eee"
                :gutter='2'
              />
            </div>
            <div class="author-box txt-box"><span>作者 ：</span><span class="author">{{data.data.author}}</span></div>
            <div class="word-number-box txt-box"><span>字数 ：</span><span class="word-number">{{data.list.length * 3000}}</span></div>
            <div class="updata-time-box txt-box"><span>更新时间 ： </span><span class="updata-time">{{data.data.time}}</span></div>
          </div>
				</div>
				<div class="information-heat">
          <ul class="iheat-list">
            <li>
              <div class="iheat-list-num">188</div>
              <div class="iheat-list-txt">月票</div>
            </li>
            <li>
              <div class="iheat-list-num">12.9万</div>
              <div class="iheat-list-txt">鲜花</div>
            </li>
            <li>
              <div class="iheat-list-num">22.6万</div>
              <div class="iheat-list-txt">打赏</div>
            </li>
            <li>
              <div class="iheat-list-num">2165</div>
              <div class="iheat-list-txt">催更</div>
            </li>
          </ul>
        </div>
			</div>
      <div class="line"></div>
			<div class="brief-introduction">
				<div class="bn-header">
					<div class="bn-tlt">简介</div>
					<div class="bn-txt">{{data.data.introduce}}</div>
				</div>
				<div class="chapter clearfix" @click="goState({name:'chapter'})">
          <div class="chapter-lt fl">
            <span>本书已写{{data.list.length}}章</span>
            <span>有158300人读过</span>
          </div>
          <div class="chapter-rt fr"></div>
        </div>
			</div>
       <div class="line"></div>
      <div class="guess-you-like">
        <div class="gyl-header clearfix">
          <div class="gyl-tlt fl">猜你喜欢</div>
          <div class="gyl-refresh fr">换一换</div>
        </div>
        <div class="gyl-more">
          <ul class="gyl-list">
            <li v-for="(i , index) in reLists" :key="index" @click="details(i)">
              <span :style="[{'backgroundImage':'url(' + i.cover + ')'}]"></span>
              <span>{{i.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="line"></div>
      <div class="book-review">
        <div class="br-header clearfix">
          <div class="br-tlt fl">书评</div>
          <div class="br-more fr clearfix"><span class="fl">136条</span><i></i></div>
        </div>
      </div>
      <div class="btn-box">
        <button @click="addBookShelf" :disabled="isDisable">{{addShelf}}</button>
        <button @click="read({name:'read'})">免费试读</button>
      </div>
    </div>
	</div>
</template>

<script>
  import {mapState,mapMutations} from'vuex'
  import {data} from '../data/firstPage.js'
	export default {
		data() {
			return {
        value:5,
        data:{},
        url:'',
        list:'',
        backLocation:'',
        iss:0,
        addShelf:'加入书架',
        isDisable:false,
        results:[],
        reLists:''
			};
		},
    computed:{
        ...mapState(['content']),
        ...mapState(['search']),
        ...mapState(['listPage'])
    },
    created(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      });
      let self = this;
      this.reLists = data

      this.url = this.search.url


      this.backLocation = this.search.location;

      this.ajax(self.url).then(result => {

        self.$toast.clear();

        self.data = JSON.parse(result)

        self.list = self.data.list
      })


    },
    mounted(){

    },
    updated(){
        let self = this
        if(self.iss == 0){
          this.$nextTick(() => {

              this.$store.commit('changeList',{location:'detailsPage',list:this.list,name:this.data.data.name});
              // this.$store.commit('changeReadBack','detailsPage')



              let myBookShelf = JSON.parse(localStorage.getItem('bookShelfs'));

              if(myBookShelf){

                self.results = myBookShelf;

                for(let i = 0;i<self.results.length;i++){
                  if(self.data.data.name == self.results[i].name){

                    self.addShelf = '已加入'
                    self.isDisable = true

                    break;
                  }
                }
              }

          })
          self.iss = 1
        }
    },
		methods: {
      details(a){
        let self = this;

        this.$store.commit('changeSearch',{url:a.url,location:'selected'});

        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });

        this.reLists = data

        this.url = this.search.url


        this.backLocation = this.search.location;

        this.ajax(self.url).then(result => {

           this.$toast.clear()

          self.data = JSON.parse(result)

          self.list = self.data.list
        })
      },
      addBookShelf(){
        let self = this
        let myBookShelf = JSON.parse(localStorage.getItem('bookShelfs'));

        if(myBookShelf){

        for(let i = 0;i<myBookShelf.length;i++){
          if(self.data.name == myBookShelf[i].name){
            myBookShelf.splice(i,1)
            break;
          }
        }
        }

        self.results.push({name:self.data.data.name});

        localStorage.setItem('bookShelfs',JSON.stringify(self.results))


        self.addShelf = '已加入'
        self.isDisable = true

      },
      read(o){
        this.$router.push(o);
        this.$store.commit('changeList',{location:'detailsPage',list:this.list,name:this.data.data.name});
      },
      //跳转
      goState(o){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        this.$router.push(o);
        this.$store.commit('changeContent',{list:this.data,location:'detailsPage',url:this.url});
        this.$toast.clear()
      },
      //返回
			back(){
				this.$router.push({name:this.backLocation});
			},
			his(){
			},
      //阅读
      // ready(){
      // },
      //获取数据
      ajax(o){
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
	.header{
		width: 100%;
		margin: 0 auto;
		padding: .133rem 0 .266rem;
		border-bottom: .08rem solid #fbfbfb;
    position: fixed;
    top: 24px;
    left: 0;
    background: #fff;
    z-index: 10;
		>.back{
			width: .533rem;
			height: .533rem;
			background: url(../assets/detailsPage/prev.png) no-repeat center center/cover;
			margin-left: .266rem;
		}
		>.his{
			width: .533rem;
			height: .533rem;
			background: url(../assets/detailsPage/detailsHis.png) no-repeat center center/cover;
			margin-right:  .266rem;
		}
	}
	.information-box{
		width: 92%;
		margin: 40px auto 0;
		>.information-header{
			width: 100%;
			margin: 0 auto;
			padding:.533rem 0;
			>.pic{
				width: 2.24rem;
				height: 2.98rem;
				margin-right: .4rem;
        box-shadow: -.0533rem .133rem .133rem .08rem #E8E8E8;
			}
			>.ih-txt-box{
				width: calc(100% - 2.24rem - .4rem);
        >.ih-tlt{
            font-size: .426rem;
            color: #333;
            font-weight: bold;
            letter-spacing: .0266rem;
            font-family: "黑体";
        }
        >.star-rating{
            padding: .133rem 0 0;
        }
        >.txt-box{
            font-size: .373rem;
            color: #999999;
            padding: .08rem 0 0;
            >span:last-child{
              color: #3890F1;
            }
            >.word-number{
              color: #999999 !important;
            }
        }
			}
		}
    >.information-heat{
       width: 100%;
       margin: 0 auto;
       >.iheat-list{
          width: 100%;
          margin: 0 auto;
          display: flex;
          padding: .266rem 0;
          >li{
              margin: 0 auto;
              text-align: center;
              >.iheat-list-num{
                color: #333;
                font-size: .426rem;
                font-weight: 600;
                padding: .133rem 0;
              }
              >.iheat-list-txt{
                color: #999;
                font-size: .32rem;
              }
          }
       }
    }
  }
  .brief-introduction{
    width: 92%;
    margin: 0 auto;
    >.bn-header{
      border-bottom: .0266rem solid #E5E5E5;
      padding-bottom: .5333rem;
      >.bn-tlt{
        font-size: .426rem;
        color: #333;
        font-weight: bold;
        padding: .266rem 0;
      }
      >.bn-txt{
        font-size: .373rem;
        color: #666;
        word-break:break-all;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
      }
    }
    >.chapter{
      padding: .4rem 0;
      >.chapter-lt{
        >span:first-child{
          font-size: .426rem;
          color: #333;
          font-family: "黑体";
          margin-right: .266rem;
          font-weight: 600;
        }
        >span:last-child{
          font-size: .32rem;
          color: #999;
        }
      }
      >.chapter-rt{
          width: .4rem;
          height: .4rem;
          background: url(../assets/selected/more.png) no-repeat center center/ cover;
          margin-top: .04rem;
      }
    }
  }
  .guess-you-like{
    width: 92%;
    margin: 0 auto;
    >.gyl-header {
      padding: .266rem 0;
      >.gyl-tlt{
        font-size: .48rem;
        font-weight: 600;
        font-family: "ms sans serif";
        color: #333;
        letter-spacing: .0133rem;
      }
      >.gyl-refresh{
        font-size: .32rem;
        color: #999;
      }
    }
    >.gyl-more{
      width: 100%;
      margin: 0 auto;
      padding-bottom: .4rem;
      >.gyl-list{
        width: 100%;
        margin: 0 auto;
        overflow-x: auto;
        display: flex;
        >li{
          width: auto;
          >span:first-child{
            display: block;
            width: 2.08rem;
            height: 2.72rem;
            background: url(//bookcover.yuewen.com/qdbimg/349573/1016758057/150) no-repeat center center/cover;
            margin: 0 .266rem .266rem 0;
          }
          >span:last-child{
            display: block;
            font-size: .32rem;
            color: #333;
            font-weight: 600;
            max-width: 2.08rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
        }
      }
    }
   }
  .btn-box{
     width: 100%;
     background: #fff;
     margin: 0 auto;
     // padding: .133rem 0;
     position: sticky;
     bottom:0;
     >button{
        outline: none;
        width: 50%;
        height: 1.33rem;
        border: transparent;
        text-align: center;
        font-size: .373rem;
        color: #00D0FF;
        text-align: center;
        line-height: .8rem;
        background: #fff;
     }
     >button:last-child{
        background: #3890F1;
        color: #fff;
     }
  }
  .book-review{
    width: 92%;
    margin: 0 auto;
    >.br-header{
      width: 100%;
      margin: 0 auto;
      padding: .4rem 0;
      >.br-tlt{
        font-size: .48rem;
        font-weight: bold;
        color: #333;
      }
      >.br-more{
        font-size: .32rem;
        color: #999;
        >i{
          float: left;
          width: .426rem;
          height: .426rem;
          background: url(../assets/selected/more.png) no-repeat center center/cover;
          margin-left: .08rem;
        }
      }
    }
  }
</style>
