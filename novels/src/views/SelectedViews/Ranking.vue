<template>
	<div>
    <div class="system"></div>
    <div class="ranking">
      <div class="header clearfix">
        <span class="back fl" @click="goState({name:'selected'})"></span>
        <div class="tlt">排行</div>
      </div>
      <div class="title">
        <van-tabs sticky :offset-top='74' animated  swipeable v-model="activeName" title-active-color="#1B81ED" color="#1B81ED">
          <van-tab title="标新榜" name="标新榜" >
            <div class="ranking-list" v-for="(i ,index) in keyName" :key="index">
              <div class="line"></div>
              <div class="ranking-content">
                <div class="rc-header clearfix">
                  <div class="rc-header-lt fl">{{i}}</div>
                  <div class="rc-header-rt fr clearfix"><span class="fl">更多</span><i class="fl"></i></div>
                </div>
                <div class="rc-content">
                  <div class="rc-content-first clearfix" @click="details(datas[i][0])">
                    <div class="serial-number fl">1</div>
                    <div class="rc-pic fl">
                      <img class="img-auto" :src="datas[i][0].cover" alt="">
                    </div>
                    <div class="book-information fl">
                      <div class="book-name">{{datas[i][0].name}}</div>
                      <div class="book-author"></div>
                      <div class="book-jieshao">{{datas[i][0].introduce}}</div>
                    </div>
                  </div>
                  <div class="other clearfix" @click="details(datas[i][1])">
                    <div class="number-two fl">2</div>
                    <div class="other-name fl">{{datas[i][1].name}}</div>
                    <div class="other-author fr">{{datas[i][1].author}}</div>
                  </div>
                  <div class="other clearfix"  @click="details(datas[i][2])">
                    <div class="number-three fl">3</div>
                    <div class="other-name fl">{{datas[i][2].name}}</div>
                    <div class="other-author fr">{{datas[i][2].author}}</div>
                  </div>
                  <div class="other clearfix"  @click="details(datas[i][3])">
                    <div class="number-frou fl">4</div>
                    <div class="other-name fl">{{datas[i][3].name}}</div>
                    <div class="other-author fr">{{datas[i][3].author}}</div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="总榜" name="总榜">
            <div class="ranking-list" v-for="(i ,index) in keyName" :key="index">
              <div class="line"></div>
              <div class="ranking-content">
                <div class="rc-header clearfix">
                  <div class="rc-header-lt fl">{{i}}</div>
                  <div class="rc-header-rt fr clearfix"><span class="fl">更多</span><i class="fl"></i></div>
                </div>
                <div class="rc-content">
                  <div class="rc-content-first clearfix" @click="details(datas[i][0])">
                    <div class="serial-number fl">1</div>
                    <div class="rc-pic fl">
                      <img class="img-auto" :src="datas[i][0].cover" alt="">
                    </div>
                    <div class="book-information fl">
                      <div class="book-name">{{datas[i][0].name}}</div>
                      <div class="book-author"></div>
                      <div class="book-jieshao">{{datas[i][0].introduce}}</div>
                    </div>
                  </div>
                  <div class="other clearfix" @click="details(datas[i][1])">
                    <div class="number-two fl">2</div>
                    <div class="other-name fl">{{datas[i][1].name}}</div>
                    <div class="other-author fr">{{datas[i][1].author}}</div>
                  </div>
                  <div class="other clearfix"  @click="details(datas[i][2])">
                    <div class="number-three fl">3</div>
                    <div class="other-name fl">{{datas[i][2].name}}</div>
                    <div class="other-author fr">{{datas[i][2].author}}</div>
                  </div>
                  <div class="other clearfix"  @click="details(datas[i][3])">
                    <div class="number-frou fl">4</div>
                    <div class="other-name fl">{{datas[i][3].name}}</div>
                    <div class="other-author fr">{{datas[i][3].author}}</div>
                  </div>
                </div>
              </div>
            </div>

          </van-tab>
          <van-tab title="分类榜" name="分类榜">
            <div class="ranking-list" v-for="(i ,index) in keyName" :key="index">
              <div class="line"></div>
              <div class="ranking-content">
                <div class="rc-header clearfix">
                  <div class="rc-header-lt fl">{{i}}</div>
                  <div class="rc-header-rt fr clearfix"><span class="fl">更多</span><i class="fl"></i></div>
                </div>
                <div class="rc-content">
                  <div class="rc-content-first clearfix" @click="details(datas[i][0])">
                    <div class="serial-number fl">1</div>
                    <div class="rc-pic fl">
                      <img class="img-auto" :src="datas[i][0].cover" alt="">
                    </div>
                    <div class="book-information fl">
                      <div class="book-name">{{datas[i][0].name}}</div>
                      <div class="book-author"></div>
                      <div class="book-jieshao">{{datas[i][0].introduce}}</div>
                    </div>
                  </div>
                  <div class="other clearfix" @click="details(datas[i][1])">
                    <div class="number-two fl">2</div>
                    <div class="other-name fl">{{datas[i][1].name}}</div>
                    <div class="other-author fr">{{datas[i][1].author}}</div>
                  </div>
                  <div class="other clearfix"  @click="details(datas[i][2])">
                    <div class="number-three fl">3</div>
                    <div class="other-name fl">{{datas[i][2].name}}</div>
                    <div class="other-author fr">{{datas[i][2].author}}</div>
                  </div>
                  <div class="other clearfix"  @click="details(datas[i][3])">
                    <div class="number-frou fl">4</div>
                    <div class="other-name fl">{{datas[i][3].name}}</div>
                    <div class="other-author fr">{{datas[i][3].author}}</div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
        activeName: '总榜',
        rankingListData:{
          '点击榜':[
            '庆余年',
            '诡秘之主',
            '九星毒奶',
            '第一序列'
          ],
          '鲜花榜':[
            '诡秘之主',
            '太初',
            '凡人修仙之仙界篇',
            '警医夜行'
          ],
          '收藏榜':[
            '我师兄实在太稳健了',
            '魔临',
            '庆余年',
            '汉阙'
          ],
          '打赏榜':[
            '重生过去当传奇',
            '这号有毒',
            '北宋大丈夫',
            '诡秘之主'
          ],
          '月票榜':[
            '诡秘之主',
            '九星毒奶',
            '从我是特种兵开始打卡',
            '第一序列'
          ],
        },
        datas:{
          '点击榜':[
            {
            author: '',
            cover: '',
            introduce: '',
            name: '',
            num: '',
            tag: '',
            time: '',
            url: '',
            }
          ],
          '打赏榜':  [
            {
            author: '',
            cover: '',
            introduce: '',
            name: '',
            num: '',
            tag: '',
            time: '',
            url: '',
            }
          ],
          '收藏榜':  [
            {
            author: '',
            cover: '',
            introduce: '',
            name: '',
            num: '',
            tag: '',
            time: '',
            url: '',
            }
          ],
          '月票榜':  [
            {
            author: '',
            cover: '',
            introduce: '',
            name: '',
            num: '',
            tag: '',
            time: '',
            url: '',
            }
          ],
          '点击榜':  [
            {
            author: '',
            cover: '',
            introduce: '',
            name: '',
            num: '',
            tag: '',
            time: '',
            url: '',
            }
          ],
          '鲜花榜':  [
            {
            author: '',
            cover: '',
            introduce: '',
            name: '',
            num: '',
            tag: '',
            time: '',
            url: '',
            }
          ],
        },
        keyName:[]
			};
		},
    created(){
      let self = this
      for(let i in this.rankingListData){
        this.datas[i]=[]
        this.keyName.push(i)

        for(let j = 0 ;j<this.rankingListData[i].length;j++){

            this.ajax(this.rankingListData[i][j]).then(result => {

              self.datas[i].push(JSON.parse(result).list[0])

            })
        }

        localStorage.setItem('rankingLoca',JSON.stringify(self.datas))
      }

        this.datas = JSON.parse(localStorage.getItem('rankingLoca'))

    },
    methods:{
      goState(o){
        this.$router.push(o)
      },
      details(a){
        this.$router.push({name:'detailsPage'})
        this.$store.commit('changeSearch',{url:a.url,location:'ranking'});
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
      }
    }
	}
</script>

<style scoped lang="less">
  .ranking{
    height: calc(100% - 24px);
    >.header{
      width: 100%;
      margin: 0 auto;
      height: 50px;
      line-height: 50px;
      position: relative;
      position: sticky;
      top: 24px;
      background: #fff;
      z-index: 2;
      >.back{
        width: .533rem;
        height: .533rem;
        background: url(../../assets/detailsPage/prev.png) no-repeat center center/cover;
        margin-left: 4%;
        margin-top: .4rem;
      }
      >.tlt{
        font-size: 22px;
        font-family: "微软雅黑";
        width: 48px;
        position: absolute;
        top: 0rem;
        left: 20px;
        right: 20px;
        margin: 0 auto;
      }
    }
    >.title{
      margin:  0 auto;
    }
    .ranking-list{
      width: 100%;
      margin: 0 auto;
      >.ranking-content{
        width: 92%;
        margin: 0 auto;
        padding: .133rem 0 .533rem;
        >.rc-header{
          widows: 100%;
          margin: 0 auto;
          padding: .4rem 0;
          >.rc-header-lt{
            font-size: 16px;
            font-weight: 700;
          }
          >.rc-header-rt{
            font-size: 14px;
            color: #1989FA;
            >i{
              width: 12px;
              height: 12px;
              background: url(../../assets/ranking/rankingnext.png) no-repeat center center/cover;
              margin-top: 3.5px;
              margin-left: 5px;
            }
          }
        }
        >.rc-content{
          width: 92%;
          margin: 0 auto;
          >.rc-content-first{
            >.serial-number{
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #EC4C3E;
              color: #fff;
              text-align: center;
              font-size: 14px;
            }
            >.rc-pic{
              width: 88px;
              margin-left: 5px;
              box-shadow: 0 1px 3px 1px #E4E4E4;
            }
            >.book-information{
              width: calc(100% - 20px - 105px);
              margin-left: 10px;
              >.book-name{
                font-size: 16px;
                color: #333;
                font-weight: 700;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              >.book-author{
                font-size: 14px;
                color: #A9A9A9;
                margin-top: 5px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              >.book-jieshao{
                font-size: 16px;
                color: #666;
                word-break:break-all;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                overflow:hidden;
                margin-top: 10px;
              }
            }
          }
          >.other{
            width: 100%;
            margin: 0 auto;
            padding: .533rem 0 0;
            >.number-two{
              width: 20px;
              height: 20px;
              background: #E9B967;
              color: #fff;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              font-size: 16px;
            }
            >.number-three{
              width: 20px;
              height: 20px;
              background: #7DC7EC;
              color: #fff;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              font-size: 16px;
            }
            >.number-frou{
              width: 20px;
              height: 20px;
              background: #CFCFCF;
              color: #fff;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              font-size: 16px;
            }
            >.other-name{
              font-size: 16px;
              margin-left: 10px;
              font-weight: 700;
              width: 30%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            >.other-author{
              width: calc(100% - 20px - 30% - 10px);
              font-size: 16px;
              color: #8A8A8A;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
