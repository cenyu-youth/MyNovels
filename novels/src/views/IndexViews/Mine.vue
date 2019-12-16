<template>
	<div class="mine">
    <div class="header clearfix">
    	<div class="tlt fl">我的</div>
    	<div class="search fr"></div>
    </div>
    <div class="user-information">
      <div class="un-header clearfix">
        <div class="head-portrait fl" @click="logon">
          <img :src='state.src' alt="">
        </div>
        <div class="un-name fl">
          <div class="un-name-tp clearfix">
            <div class="name-tp-lt fl">{{state.name}}</div>
            <div class="name-tp-rt fl">{{state.vip}}</div>
          </div>
          <div class="un-name-bt">
            <span>登录ID : </span>
            <span>{{state.ID}}</span>
          </div>
        </div>
      </div>
      <div class="un-down">
        <div class="balance">
          <div class="fl">
            <div>{{state.vipdian}}</div>
            <div>VIP点</div>
          </div>
          <div class="bar"></div>
          <div class="fl">
            <div>{{state.dianquan}}</div>
            <div>点券</div>
          </div>
          <div class="bar"></div>
          <div class="fl">
            <div>{{state.yuepiao}}</div>
            <div>月票</div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="function-block">
      <div class="fb-box clearfix" @click="goState({name:'quickRecharge'})">
        <i class="recharge fl"></i>
        <span class="fl">快速充值</span>
        <i class="fr"></i>
      </div>
      <div class="fb-box clearfix">
        <i class="sign-in fl"></i>
        <span class="fl">签到有礼</span>
        <i class="fr"></i>
      </div>
      <div class="fb-box clearfix">
        <i class="collection fl"></i>
        <span class="fl">我的收藏</span>
        <i class="fr"></i>
      </div>
      <div class="fb-box clearfix">
        <i class="help fl"></i>
        <span class="fl">帮助</span>
        <i class="fr"></i>
      </div>
    </div>
    <div class="line"></div>
    <div class="switch-account clearfix" @click="switchUser">
      <i class="fl"></i>
      <span class="fl">切换账号</span>
      <i class="fr"></i>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
        state:{
          src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576159262952&di=d784bcc6a137f39e48c6e8a620167e61&imgtype=0&src=http%3A%2F%2Fstatic.hoto.cn%2Fhdwx%2Fcommon%2Ficon_headport_default.png',
          name:'--',
          vip:'未登录',
          ID:'未登录',
          vipdian:'0.00',
          dianquan:'0.00',
          yuepiao:1
        }
			};
		},
    created(){
      if(this.register == 0){
        let users = JSON.parse(localStorage.getItem('register'));

        for(let i =0; i<users.length;i++){
          if(this.user == users[i].user){


            this.state.src = users[i].src
            this.state.name = users[i].user
            this.state.vipdian = users[i].vipDian
            this.state.dianquan = users[i].dianquan
            this.state.yuepiao = users[i].yuepiao
            this.state.vip = users[i].vipLevel
            this.state.ID = users[i].ID
          }
        }

      }
    },
    computed:{
      ...mapState({
        register:'register',
        user:'user'
      })
    },
    methods:{
      logon(){
        if(this.register == 1){
          this.$router.push({name:'registerInto'})
        }
      },
      switchUser(){
        this.$router.push({name:'registerInto'})
        this.$store.commit('changeRegister',{idx:1,user:''})
      },
      goState(o){
        this.$router.push(o)
      }
    }
	}
</script>

<style scoped lang="less">
  .mine{
    width: 100%;
    margin: 0 auto;
    padding-bottom: 1rem;
    .header{
      width: 92%;
      margin: 0 auto .133rem;
    	padding:.133rem 0 .266rem;
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
    	background: url(../../assets/mine/opction.png) no-repeat center center/cover;
      margin-top: .093rem;
    }
    .user-information{
      width: 92%;
      margin: 0 auto .533rem;
      >.un-header{
        margin-bottom: .6rem;
       >.head-portrait{
         width: 45px;
         height: 45px;
         border-radius: 50%;
         overflow: hidden;
         border: 1px solid #ccc;
         box-shadow: -3px 5px 5px 5px #ECEFF8;
         >img{
          display: block;
          width: 100%;
         }
       }
       >.un-name{
          margin-left: 20px;
          >.un-name-tp{
            >.name-tp-lt{
              color: #333;
              font-size: 16px;
              font-weight: 600;
              margin-right: 5px;
            }
            >.name-tp-rt{
              width: 80px;
              height: 15px;
              background: linear-gradient(to right,#42A9F9,#1CD3F8);
              font-size: 12px;
              color: #fff;
              text-align: center;
              line-height: 15px;
              font-weight: 100;
              margin-top: 3px;
            }
          }
          >.un-name-bt{
            width: 100%;
            margin:2px auto 0;
            >span{
              font-size: 12px;
              color: #666;
            }
          }
       }
      }
      >.un-down{
        >.balance{
          display: flex;
          >div{
            margin: 0 auto;
            text-align: center;
            >div:first-child{
              font-size: 16px;
              font-weight: 600;
              color: #333;
              margin-bottom: 2px;
            }
            >div:last-child{
              font-size: 12px;
              color: #666;
              font-weight: 200;
            }
          }
          >.bar{
            display: block;
            content: '';
            width: 2px;
            height: 18px;
            background: #D3D3D3;
            margin-left: 30px;
            float: left;
            margin-top: 7px;
          }
        }
      }
      }
    }
    .function-block{
      width: 92%;
      margin: 0 auto;
      >.fb-box{
        padding: .533rem 0;
        >i:nth-child(1){
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        >span:nth-child(2){
          color: #333;
          font-size: 16px;
          font-family: "黑体";
          line-height: 22px;
        }
        >i:nth-child(3){
          width: 16px;
          height: 16px;
          background: url(../../assets/mine/next.png) no-repeat center center/cover;
          margin-right: 5px;
          margin-top: 3px;
        }
        >.recharge{
          background: url(../../assets/mine/recharge.png) no-repeat center center/cover;
          box-shadow: -1px 1px 5px 1px #F9E4E3;
        }
        >.sign-in{
          background: url(../../assets/mine/Sign-in.png) no-repeat center center/cover;
          box-shadow: -1px 1px 5px 1px #FEF3C6;
        }
        >.collection{
          background: url(../../assets/mine/collection.png) no-repeat center center/cover;
        }
        >.help{
          background: url(../../assets/mine/help.png) no-repeat center center/cover;
        }
    }

  }
  .switch-account{
    width: 92%;
    margin: 0 auto;
    padding: .266rem 0;
    >i:nth-child(1){
      width: 22px;
      height: 22px;
      margin-right: 10px;
      background: url(../../assets/mine/switch.png) no-repeat center center/cover;
    }
    >span:nth-child(2){
      color: #333;
      font-size: 16px;
      font-family: "黑体";
      line-height: 22px;
    }
    >i:nth-child(3){
      width: 16px;
      height: 16px;
      background: url(../../assets/mine/next.png) no-repeat center center/cover;
      margin-right: 5px;
      margin-top: 3px;
    }
  }
</style>
