<template>
  <div class="box" :class="{boxNigth:isNigthMode}" :style="[{'backgroundColor':'#' + backColor}]">
    <div class="system" v-show="isShow"></div>
    <div class="read">
      <div class="header" v-show="isShow" :class="{headerNigth:isNigthMode}">
        <i @click="goState()" :class="{nigthModesBackI:isNigthMode}"></i>
      </div>
      <div class="content">
        <div class="ct-header"  :style="[{'backgroundColor':'#' + backColor}]"  :class="{ctHeaderNigth:isNigthMode}">{{title}}</div>
        <div class="context" @scroll="scrolls" @click="showHide" ref="context">
          <div class="text-box" ref="textBox" v-for="(item , idx) in context" :key="idx">
            <p :style="[{'color':'#' + fontColor}]"  :class="{ctPNigth:isNigthMode}" class="context-tlt">{{item.title}}</p>
            <p :style="[{'font-size':fontSize + 'px'},{'color':'#' + fontColor}]" :class="{ctPNigth:isNigthMode}" v-for="(i , index) in item.ct" :key="index">{{i}}</p>
          </div>
        </div>
        <div class="ct-footer"  :style="[{'backgroundColor':'#' + backColor}]" :class="{ctHeaderNigth:isNigthMode}">
          <span class="fl">{{times}}</span>
          <span class="fr">{{percentage}}%</span>
        </div>
      </div>
      <div class="footer" v-show="isShow" :class="{footerNigth:isNigthMode}">
        <div @click="changeLiseShow">
          <i class="catalog" :class="{catalogNigth:isNigthMode}"></i>
          <span>目录</span>
        </div>
        <div @click="nightMode">
          <i class="at-night" :class="{atNigth:isNigthMode}"></i>
          <span>夜间</span>
        </div>
        <div>
          <i class="set-up" :class="{setNigth:isNigthMode}" @click="changeOpactionShow"></i>
          <span>设置</span>
        </div>
      </div>
    </div>
    <div class="opation-box" :class="{opactionNigth:isNigthMode}" v-show="isOpaction">
      <div class="fontSize clearfix" :class="{fontSizeNigth:isNigthMode}">
        <span :class="{fontSizeSpanNigth:isNigthMode}" class="fl" @click="changeSize('reduce')">A-</span>
        <span class="fl" @click="changeSize('add')">A+</span>
      </div>
      <div class="style-box clearfix" :class="{styleNight:isNigthMode}">
        <div>背景颜色 : </div>
        <span v-for="(i , index) in backColorJson" :style="[{'background-color':'#' + i}]" class="fl" @click="changeBack(i)" :key="index"></span>
      </div>
      <div class="fontColor style-box" :class="{styleNight:isNigthMode}">
         <div>字体颜色 : </div>
         <span v-for="(i , index) in backColorJson" :style="[{'background-color':'#' + i}]" class="fl" @click="changeFontColor(i)" :key="index"></span>
      </div>
      <!-- 阅读模式，先不做， -->
      <!-- <div class="readMode"></div> -->
    </div>
    <div class="chapter-catalogue" v-show="listShow" :class="{chapterNigth:isNigthMode}">
      <div class="cc-header" :class="{ccHeaderNigth:isNigthMode}">目录</div>
      <div class="cc-content" :class="{ccContentNigth:isNigthMode}">
        <p v-for="(i , index) in list" :key="index" @click="clickLists(index)">{{i.num}}</p>
      </div>
    </div>
    <div class="prev-chpater" v-show="isShow" @click="pushPrev">上一章</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    data(){
      return{
        isShow:false,
        context:[],
        times:'',
        list:{},
        title:'',
        arr:[],
        sum:0,
        percentage:0.00,
        idx:0,
        fiveH:0,
        isNigthMode:false,
        fontSize:16,
        backColor:'D1EDD1',
        backColorJson:[
          'DBCCA7',
          'CAD9E8',
          'D1EDD1',
          'E6E6E6',
          '000',
          '333',
          'eee',
          'fff',
          'ccc',
          'aaa'
        ],
        fontColor:'333',
        isOpaction:false,
        listShow:false,
        leader:0,
        target:4,
        readHis:[],
        contextScroll:0,
        reapter:this.idx,
        iss:0,
        start:0,
        prevChapter:0
      }
    },
    computed:{
      ...mapState({
        listPage:'listPage',
        readBack:'readBack',
        stateIndex:'index'
      })
    },
    created(){

      let self = this

      //渲染之前从本地取出保存好的样式
      let styleJson = JSON.parse(localStorage.getItem('readStyle'));



      //通过目录跳转，不读取历史记录 20
      if(self.stateIndex.success == 0){
        self.idx = self.start = this.stateIndex.index
      }

      //读取上一次保存的样式
      if(styleJson){
       this.isNigthMode=styleJson.isNigthMode,
       this.fontSize=styleJson.fontSize,
       this.backColor=styleJson.backColor,
       this.fontColor=styleJson.fontColor
      }

      //实时更新时间
      this.time()
      setInterval(this.time,1000);

      //获取目录
      this.list = this.listPage.list;
      // this.location = this.listPage.location

      //通过按钮跳转,可以读取历史记录
      if(self.stateIndex.success == 1){


        let readProgress = JSON.parse(localStorage.getItem('readProgress'));
        if(readProgress){
          self.readHis=readProgress;

          for(let i = 0;i<self.readHis.length;i++){
            if(self.listPage.name == self.readHis[i].bookName){
              self.leader = 0
              self.target = self.readHis[i].index - 6
              self.contextScroll = self.readHis[i].scrollTop
              self.idx = self.readHis[i].index
              self.context = self.readHis[i].content
              self.start = self.readHis[i].start
              self.prevChapter = self.idx

              // for(let z = 0;z<5;z++){
              //   this.ajax(self.list[self.idx].url).then(result => {

              //     self.context.push({ct:JSON.parse(result).content,title:JSON.parse(result).num});
              //   })

              //   self.idx++;
              //   if(self.idx == self.list.length){
              //     return;
              //   }
              // }

              return;
            }
          }
        }
      }

      for(let i = this.idx; i<this.idx + 10; i++){

        this.ajax(this.list[i].url).then(result => {

          self.context.push({ct:JSON.parse(result).content,title:JSON.parse(result).num});

        })
      }

      this.idx += 10
    },

    updated(){
        let context = this.$refs.context;
        let self = this
        if(self.iss == 0){
          this.$nextTick(() => {

              context.scrollTop = self.contextScroll;

              // if(self.stateIndex.success == 0){
              //   self.clickLists(self.start)
              // }


          })
          self.iss = 1
        }
    },

    methods:{
      pushPrev(){
        if(this.prevChapter -10 <= 0){
          return
        }


        this.prevChapter -= 1

        let context = this.$refs.context;

        let self = this

        this.ajax(this.list[this.prevChapter - 10].url).then(result => {

          self.context.unshift({ct:JSON.parse(result).content,title:JSON.parse(result).num});
        })

        context.scrollTop = 0

      },
      //选择目录章节 20
      clickLists(index){
        let context = this.$refs.context;
        let textBox = this.$refs.textBox;
        let self = this;

        // let num =Math.ceil(index/10) * 10+10

        self.idx = self.start = index

        self.context = []

      for(let i = index; i< index + 10; i++){

          if(i >= self.list.length){
            break;
          }

          this.ajax(this.list[i].url).then(result => {

            self.context.push({ct:JSON.parse(result).content,title:JSON.parse(result).num});
          })


        }

        self.idx += 10

        context.scrollTop =0

        self.listShow = false;

        self.leader = 0;
        self.target = index - 6;

        self.fiveH = 0;
        // self.tenH = 0;



      },
      //打开目录
      changeLiseShow(){
        this.listShow = !this.listShow
      },
      //样式存储本地
      locaStor(){
        localStorage.setItem('readStyle',JSON.stringify({
          isNigthMode:this.isNigthMode,
          fontSize:this.fontSize,
          backColor:this.backColor,
          fontColor:this.fontColor
        }))
      },
      //打开设置
      changeOpactionShow(){
        this.isOpaction = !this.isOpaction;
        this.listShow  = false
        this.locaStor();
      },
      //夜间模式
      nightMode(){
        this.isNigthMode = !this.isNigthMode;
        this.isOpaction = false;
        this.listShow  = false
        this.locaStor()
      },
      //更改字体颜色
      changeFontColor(a){
        this.fontColor = a
        this.locaStor()
      },
      //改变背景
      changeBack(a){
        this.backColor = a
        this.locaStor()
      },
      //改变字体大小
      changeSize(a){
        if(a === 'add'){
          if(this.fontSize >= 26){
            return
          }
          this.fontSize += 2;
          this.locaStor()
        }else if(a === 'reduce'){
          if(this.fontSize <= 12){
            return
          }
          this.fontSize -= 2;
          this.locaStor()
        }
      },
      //请求事件
      async ajax(o){
        return await new Promise((resolve,reject) => {

          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
              resolve(this.responseText)
            }
          }

          xhr.open('Get' ,'http://api.pingcc.cn/?xsurl2=' + o,false)

          xhr.send(null)
        })
      },
      time(){
        let times = new Date();
        this.times = (times.getHours() >= 10 ? times.getHours(): '0' + times.getHours())+':'+(times.getMinutes() >= 10?times.getMinutes():'0' + times.getMinutes())
      },

      //跳转路由
      goState(){
        this.$router.push({name:this.readBack})
      },
      //是否显示状态栏
      showHide(){
        this.isShow = !this.isShow
        this.isOpaction = false
      },
      //滑块事件
      scrolls(){
        let context = this.$refs.context;
        let textBox = this.$refs.textBox;

        this.isShow = false
        let scrollH = context.scrollTop;


        let self = this;

        if(self.fiveH == 0){


          for(let j = self.leader; j<self.target;j++){
            self.fiveH += textBox[j].offsetHeight
          }

          self.leader = self.target + 1
          self.target += 5

        }




        var timer = setTimeout(function () {

          for (var j = 1; j < self.arr.length; j++) {
            clearTimeout(self.arr[j]);
          }



          //匹配标题
          for(let i = 0 ;i<self.context.length;i++){

            self.sum += textBox[i].offsetHeight

            if(context.scrollTop <= self.sum){
              self.title = self.context[i].title


              self.sum = 0;

              self.percentage = (i/self.list.length * 100).toFixed(2)
              break;
            }

          }

          //每阅读到五章时，追加后面五章
          if(context.scrollTop >= self.fiveH && textBox.length <= self.idx+10){
            // self.context = self.context.slice(1)
            for(let z = self.idx; z < ( 5 + self.idx ); z++){

              if(z >= self.list.length){
                break;
              }

              self.ajax(self.list[z].url).then(result => {

                self.context.push({ct:JSON.parse(result).content,title:JSON.parse(result).index});
              })


            }
            self.idx += 5

            //重置章节高度计算
            // self.tenH = 0;
            // self.fiveH = 0;

            for(let j = self.leader; j<self.target;j++){
              self.fiveH += textBox[j].offsetHeight
            }

            self.leader = self.target + 1
            self.target += 5


          }

          //清空所有定时器序号
          self.arr = [];

        }, 350)

        this.arr.push(timer);

      }
    },
    beforeRouteLeave(to,from,next){
      let context = this.$refs.context;
      let textBox = this.$refs.textBox;
      let self = this

      for(let i = 0;i<self.readHis.length;i++){
        if(self.listPage.name == self.readHis[i].bookName){
          self.readHis.splice(i,1)
          break;
        }
      }

      self.readHis.push({
        scrollTop:context.scrollTop,
        bookName:self.listPage.name,
        index:self.idx,
        start:self.start,
        content:self.context
      })


      localStorage.setItem('readProgress',JSON.stringify(this.readHis))

      self.iss = 0;
      this.$store.commit('changeIndexSuccess',1)
      next()
    }
  }
</script>

<style scoped lang="less">
  .box{
    width: 100%;
    height: 100%;
    background: #D0BFA3;
    .system{
      width: 100%;
      height: 24px;
      position: fixed;
      top: 0;
      left: 0;
    }
    >.read{
      height: calc(100% - .64rem);
      >.header{
        width: 100%;
        margin: 0 auto;
        padding: .133rem 0;
        position: fixed;
        top: .64rem;
        left: 0;
        // box-shadow: 0 1px 5px 3px #F6F6F6;
        background: #fff;
        >i{
          display: block;
          width: .533rem;
          height: .533rem;
          background: url(../assets/reading/prev.png) no-repeat center center/cover;
          margin-left: .133rem;
        }
        >.nigthModesBackI{
          background: url(../assets/reading/prev-white.png) no-repeat center center/cover;
        }
      }
      >.headerNigth{
        background: #030303;
      }
      >.content{
        width: calc(92% - .8rem);
        margin: 0 auto;
        padding: .266rem 0 .4rem;
        height: calc(100% - .533rem);
        overflow-y: auto;
        >.ct-header{
          position: fixed;
          top: 0px;
          left: .133rem;
          background: #fff;
          width: 100%;
          height: .533rem;
          padding: .133rem 0 0;
          background: #D0BFA3;
        }
        >.ctHeaderNigth{
          color: #82888D;
          background: #1A1A1A !important;
        }
        >.ct-footer{
          position: fixed;
          bottom: 0;
          left: 0;
          background: #fff;
          width: 100%;
          height: .533rem;
          background: #D0BFA3;
          font-size: .373rem;
          padding: .133rem;
          >span:last-child{
            margin-right: .266rem;
          }
        }
        >.context{
          margin-top: .533rem;
          height: calc(100% - .533rem);
          overflow-y: auto;
          width: 100%;
          >.text-box:first-child{
            margin-top: 0;
          }
          >.text-box{
            margin-top: 2.6rem;
            width: 100%;
            >.context-tlt{
              font-weight: 600;
              font-size: .48rem;
            }
            >p{
              width: 100%;
              overflow: hidden;
              font-size: .426rem;
              color: #333;
              padding: .266rem 0;
              line-height: 1.06rem;
            }
            >.ctPNigth{
              color: #82888D !important;
            }
          }
        }
      }
      >.contentNigth{
        background: #1B1B1B;
      }
      >.footer{
        position: fixed;
        bottom: 0;
        left: .0;
        display: flex;
        width: 100%;
        padding:.133rem 0 .266rem;
        // box-shadow: 0 -1px 5px 3px #F6F6F6;
        background: #fff;
        >div{
          width: auto;
          margin: 0 auto;
          text-align: center;
          font-size: .32rem;
          color: #999;
          font-weight: 200;
          >i{
            display: block;
            width: .64rem;
            height: .64rem;
            margin-bottom: .133rem;
          }
          >.catalog{
            background: url(../assets/reading/lists.png) no-repeat center center/cover;
          }
          >.catalogNigth{
            background: url(../assets/reading/lists-white.png) no-repeat center center/cover;
          }
          >.at-night{
            background: url(../assets/reading/ningth.png) no-repeat center center/cover;
          }
          >.atNigth{
            background: url(../assets/reading/ningth-white.png) no-repeat center center/cover;
          }
          >.set-up{
            background: url(../assets/reading/Aa.png) no-repeat center center/cover;
          }
          >.setNigth{
            background: url(../assets/reading/Aa-white.png) no-repeat center center/cover;
          }
        }
      }
      >.footerNigth{
        background: #030303;
      }
   }
  }
  .boxNigth{
    background: #1A1A1A !important;
  }
  .opation-box{
    width: 100%;
    margin: 0 auto;
    background: #fff;
    position: fixed;
    bottom: 1.6rem;
    left: 0;
    padding: .266rem 0;
    >.fontSize{
      >span{
        width:49%;
        height: .8rem;
        text-align: center;
        line-height: .8rem;
        font-size: .6999rem;
        color: #666;
      }
      >span:first-child{
        border-right: 1px solid #333;
      }
    }
    >.fontSizeNigth{
      >span{
        color: #ccc;
      }
      >.fontSizeSpanNigth{
        border-right: 1px solid #fff;
      }
    }
    >.style-box{
      width: 92%;
      margin:  0 auto;
      padding: .1333rem 0;
      >span{
        width: 24%;
        height: .8rem;
        margin: 0 auto;
        border-radius: .133rem;
        margin-right: 1%;
        margin-top: .133rem;
      }
    }
    >.styleNight{
      color: #ccc;
    }
  }
  .opactionNigth{
    background: #030303;
  }
  .chapter-catalogue{
    width: 100% ;
    margin: 0 auto;
    height: calc(100% - .64rem - 1.6rem) ;
    background: rgba(0,0,0,.6);
    overflow-y: auto;
    position: fixed;
    top: .64rem;
    left: 0;
    border-bottom: .0266rem .133rem solid #eee;
    z-index: 3;
    >.cc-header{
      width: 80%;
      background: #fff;
      text-align: center;
      padding: .266rem 0;
      border-bottom: .0266rem.133rem solid #e4393c;
      font-size: 16px;
    }
    >.ccHeaderNigth{
      background: #030303 !important;
    }
    >.cc-content{
      width: 80%;
      background: #fff;
      min-height: calc(100% - 1.12rem);
      >p{
        padding: .266rem .133rem;
        border-bottom: 1px solid #eee;
        font-size: .426rem;
      }
    }
    >.ccContentNigth{
        background: #030303;
        >p{
          border-bottom: 1px solid #aaa;
        }
    }
  }
  .chapterNigth{
    color: #6D6C6D;
  }
  .prev-chpater{
    position: sticky;
    bottom: 3rem;
    width: 60px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 8px;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    z-index: 1;
    background: #eee;
  }
</style>
