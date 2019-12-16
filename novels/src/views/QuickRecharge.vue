<template>
  <div>
    <div class="system"></div>
    <div class="quickRecharge">
      <div class="header clearfix">
      	<div class="back fl" @click="back"></div>
      	<div class="his fr" @click="rule">规则</div>
      </div>
      <div class="content">
        <div class="ct-header">
          <div class="ct-header-tp">充值</div>
          <div class="display-box">
            <div>
              <span>当前账号： </span>
              <span class="id">{{userInformation.id}}</span>
            </div>
            <div>
              <span>剩余VIP点： </span>
              <span class="vipDian">{{userInformation.vipDian}}</span>
            </div>
          </div>
        </div>
        <div class="amount-box">
          <ul class="amount-list clearfix">
            <li @click="activePic(i)" :class="{active:i.ac}" v-for="(i , index) in pic" :key="index">{{i.pic}}元</li>
          </ul>
        </div>
        <div class="btn-box">
          <div class="select-platform">
            <div class="clearfix" v-for="(i , index) in platform" :key="index" @click="selePlatform(i)">
              <i class="fl" :style="[{'backgroundImage':'url('+ i.logo +') '}]"></i>
              <span class="fl">{{i.txt}}</span>
              <i class="sele-rand fr" :class="{active:i.ac}"></i>
            </div>
          </div>
          <div class="confirm-btn">
            <div><span>点击充值即表示您已同意</span><span>《充值协议》</span></div>
            <button @click="immediately">立即充值</button>
          </div>
        </div>
      </div>
      <div ref="tdcb" class="two-dimensional-code-box">
        <div>
          <div class="tb-header">
            <div class="bd-header-rt" @click="cancelZhifu">取消</div>
          </div>
          <div class="inp-box">
            <ul class="inp-list clearfix">
              <li><input type="password" maxlength="1" readonly="true" :value="pwd[0]"></li>
              <li><input type="password" maxlength="1" readonly="true" :value="pwd[1]"></li>
              <li><input type="password" maxlength="1" readonly="true" :value="pwd[2]"></li>
              <li><input type="password" maxlength="1" readonly="true" :value="pwd[3]"></li>
              <li><input type="password" maxlength="1" readonly="true" :value="pwd[4]"></li>
              <li><input type="password" maxlength="1" readonly="true" :value="pwd[5]"></li>
            </ul>
          </div>
          <div class="keys">
            <ul class="keys-list">
              <li @click="pwdInp(i)" v-for="(i , index) in keysData" :key="index">{{i}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return{
        pic:[
          {pic:30,ac:true},
          {pic:50,ac:false},
          {pic:100,ac:false},
          {pic:200,ac:false},
          {pic:500,ac:false},
          {pic:1000,ac:false},
        ],
        platform:[
          {logo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADbklEQVRYR8WXXUgUURTH/+fOthUF5ZahaUTprGQPBX1AFmQEFVRQD3085FuhTvYSQdBLSg/2QQWVm9WLQUUfBBUV9BD50MdDFPRgYLOWpkEfOmsPYrQ798TV1nanmXUnNe/b3HvuOb8553+YM4RxXjTO8eEJMON8awFsKrSZJo8EUiPuh8ZdPdUln9z8uALkRMwnBJSPJLDzLgPNMUNf49z/CyAUMXk0Azt9WYaeFjPtIRQxbwLYNpYAAG5Zhr49GWMIIHTJLEQcnVkHJ2qCtDuUPZNY7atkEzDH2qN3qbt/AM6ZKyDwPFsAaWNN7z69Wdn71oxEmVWjv0gDmH7WLBcanvwPgFT4oQx4ASj1ukGxjbrUDHiBu5XGF4Ay9nKeBFDwXjZuWfUF4OV4JBrwD8CyzgkipWhOZiDU0FrrCkrisNu+b4BMZXAG+KOLd2cItG9UALLuDCEX91aVvPndmiYBxaMBEAdRN5h7GOgmQAdQ4OL4kWXoGwaDt20kyPvZ6MezDVX7CebLPXvDTU5Hhac6J/dN6tMFBcpZcgUIS1nKjbGakofKNhQxrwPYMRKAG5ah75wZiS5h4lIJyhdSRiXJ6JQfU8yu/XP605zXtgRRu/DnQPCGaBmIn2Uq2zAiZMsGlglo6wjyvIejZwy6KzHh9ndj7vtUm5wLbavIllsBbAEw37cGiHHV1uQJIcVTAFOHEyAD9TFDP+RmN73x/SKyE+sJ2AyiVUmbzBlgnJYS97L8Lgx9WqedMYu0IGZZVYMfGecKNZqlsLEehHXSxrFku7qJcMBpKGKqEWq2VwYYuBIz9Ap1ntvQMtWm4CMAZQB6AT5oGeGLXndzG9/q36pKTXXuBvATkjcxaf1E8iiAlamOCLgmwddiRvjBYPBosQ15HESq7mmLwWdjX+MHkgJ1A/JoQ2onae/uqSl5nNvwIS8uEvmUEAkE8TFWWfR9wFFtS3DGrImVDFb1z8ukFQbd0SQf6a7RXzvtMg8kjJMUCNxikfikJhg1NZEMFMBOrGVgF4AFw4nUcf4KxPVWdfh2cv/fRzKfkVPNNQ7kf9s773OaBtTD/xlK+aVlhJf/lYHkxhiP5S0Q2G5V6W89AdSB7yEzm3IQNUnE63qrF7Q7usr99qj9mgnRFxDc8aW6+GvGNszmJcbCZtz/jn8BmrazMH4E7+sAAAAASUVORK5CYII=',txt:'支付宝',ac:true},
          {logo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADaklEQVRYR9WXa0hTYRjH/ychM83NGdXUaTlzzmxqF7SCtMuHggzz8qXEskw/VAZOulCgouIF7IZFZn0J8UtqRhrhhxqimKkl3sg2MxUd3mo2U7Nw8Z50zLadc1Yu6f2wwfM+7/P8znM756Uwt1zLhIU6YBeATfMyK/13UEDdQKQ6kdinyI9LmVBnJWeMZgcj1RTlUi7Mhg6XlgIAFHIol1LhO1CQLAmADl3UUoV//oH/PwA/vh/GZ8bRP9m/KFljjcAKGztEu0cjZO1uBDkHQ2AroB1rZjRQapUo7XuE4p7iP4ZhBEiSnEe0RzQ8HTwZHbRqWlGovIuK/gqLQcwCZPpnIU4cZ5HBtNZUFKmKLDpjEiDWMxbZATl6Q1ntWVBq3yN/yzU42zrT8qHpIRR0FWDihxbXt97Q6158e8GilJgEeLlfAW9Hb73R4OdBdNEZyknYD744gACnAFTteabXnZdzDYMRAHFMHBku9ZQaI99GIOPLFsh7Jnqgwyw8HcTo1naje0KFNk07msYaUTNcw4nBCCBOfBKZ/pmcDhMlUnhtmla4rRTBhyehIQcmB9HyuQWNY69R8rGE0ZYRQJR7FG5uu8UJ4GzjGexdtw8Rogiz+rUjtXiguo9qdbVJHSMAMmgqQp7AzsaOEYJU+/D0EK74XWWF1X7/gjBFGD03fl8mizBZKodcKjdruPdrL/I6c3F7+x29TlRNJOS+cuxYvZOWnag/js18md6OYkiBY3VHuQEQrXRZOuK9TpuEePjhIQS2TjjkGkbvkw4hnZIbmIeYDTG0jHSID89nQYsSGekSw8U4CVNlaUjwSjCCiH91Chn+GRDaubCG31DB1IxgBAgUBKIytMrIifxNMlKkKRYDJDUloayvlHsEyIQT2bshvzMfKq0KUp4vfHm+dHslbEzQp4BrGAKq/Ol5wikF/OV8SB2lqB+tN2k/XBS+oAjZICoHniKxgf4O5QbAZpDskyIlxcq2zDkn51i/B9iMkyF0TpK04N1heKb5UzMOK351i6n11wDEKElXyJpQiFeJ6VE8ODUA4tjDfj09B1zLzXfLogAwRYm0qru9CA2jDdaLAFuamPatHgE2OALQ/g/ug+Y4Oqi5S6nxvGVDX4R9Cri39JfT+QehL6mzOGL1e6IOXViGx4MR6svE909F0kZlCcOljAAAAABJRU5ErkJggg==',txt:'微信',ac:false},
          {logo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEiUlEQVRYR+2Wb0xbVRjGn1Na2gGlLSvlX/grjDl1tPdC5obOuzGzjYHgzAxTk4FZUmOimwMpLGrv/IJR5lj0A5NEumkAjYk1jfMDmpSIYy4jgGNuoaHUoXFU52BqoI5xzbmw6k3vnXVf+MJJ+qXnPef9vc/7vPdegmVeZJnzYwVgRQFFBSZKSlLnb95cK2fSU6vyswLqxKQP4guGZU1sUCUhacGMFIwpmpxv9tI9WYBxm62LELJX7vATpjIMaVYrD889BEiOYrYIGYCzcVMEwDjD8ARwyl1xPP4+0J/iMgC493/YincQOYDTBNgpl+RZ48PwxqYpA2QAyIwSgOBrOB2bJdECx6knbty4CiBC43kQbDA/husqrTJAIQFMUci/GNIC3nFYAuC32TaDkD6T3Y7fPR4xSsey+MPjwTlNMmpMW+58O0vAP1oKQQCm5+ZwcmQU03Mh+TNEKIez6QspAMs2qNPS3sr0eDBZWQl9ZSVUej2utbaiI64QLQlFygB6wFqWAnfNbljbO3HdcQBbTvbAG7gifyZ0y4yWw9ekAAzzcRzH7Vnd0IDJigqkHD2K2cFBxHMchmY1eL57EG3PbcPB9i/BP/MQvN9dgTFBh6I8C0aCQUzrQjiwgcXw1SByTQa0nT2PohQL+n6YRPXaAhGGKuK+7BsG77BFjKGfYQImuz2byj5VX4+M7m784nSCtsRvykBH70Vw67OQk2KAq/cCqjetgTFeC/eAD9b1FiAWYnL3ZR+sqRZwOVnIMRrgGr6AzqpyjEwFwbm6KcS74B0vSAB8Ntu6GEIuxnGcWPlfY2OY6eqCJj0dv6m0yNu/D3VvnxblrN5YIELwH/bDVb8Lbe7zmDaGwG8rhbXdhcD0jFjxwQeL8Uh2JnKPn4C75nFREdfwKADhafBNXRIAP8vuhyB0yDXso1V5aNYXK/dfB8CqPH5UBW/tXuS0tS/eEUPW4NVGnwRggmHeF4A6uSyNiSX4RJcb3qKyd9bvEuX/bMCH2p0PAEvTyXu/QduOMhh1WlEJ2hLaDvo/bQ0IxuF05N++LIw9wbKjgiDIPua2J+2AT50YBqA+6DxUjsDUDGb+DCE70wCoIZqNJqY/serAovmoByjA4iKnwDfukwD4bLbkGEKCctXT/hebqyRbFODT13bjpRNfidPQ8/0lxMdp0HrmHPrqnsLQz1OYCYVEx9da7xd7HwYgwotwNr0jAZgoLq4SFhbccgC92gzYDaWSLWueRUxMzXfMXoaQ9hZ6Ri+Jkh/bvlWsnDqeVk+VoM+F8ANJwEYccZyVAPgZ5k0AL8sBvJFQhPfiCiMA6Ai6z4zBmKpDQn4s1CqV2G8xYapFjKc9v+2FJYAgMJsBnp+XArBsPwRBWuZSxB7TVgxqzMoTQF8+9CUU3focvKPi36GiCf0MIyidz7M8eeer1xHgH3/+B8bCEfDNfCSAzdYPQu5OgSwCpEdVfg94R8RHTngMfVYrp3TN63rGOhZr+vFbjflX2ZgslRXpC/KfZ/SAWuvDK4d+kjsb5ddDVBXeVdAKwIoCy67A32XIgzDGeKkQAAAAAElFTkSuQmCC',txt:'银联支付',ac:false}
        ],
        userInformation:{
          id:'未登录',
          vipDian:'--'
        },
        keysData:[1,2,3,4,5,6,7,8,9,'提交',0,"--"],
        pwd:[],
        money:30
      }
    },
    created(){
      if(this.register == 0){
        let users = JSON.parse(localStorage.getItem('register'));
        for(let i =0; i<users.length;i++){
          if(this.user == users[i].user){
            this.userInformation.id = users[i].ID;
            this.userInformation.vipDian = users[i].vipDian
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
      rule(){
        this.$dialog.alert({
          message: '100元可充值1000VIP点，VIP点可以购买VIP书籍，可以置换点券，100VIP点可置换100点券'
        }).then(() => {
          // on close
        });
      },
      pwdInp(a){
        if(a == '提交'){

          if(this.pwd.length < 6){
            this.$toast('请输入完整密码');
            return
          }

          let tdcb = this.$refs.tdcb;

          let leader= 0;
          let target = 302

          let setI = setInterval(function(){
            leader += (target - leader) / 10;
            tdcb.style.bottom = - leader + "px"
            if(target - leader <= 1){
              clearInterval(setI)
            }
          },20)

          this.$notify({ type: 'success', message: '充值成功' });

          let users = JSON.parse(localStorage.getItem('register'));
          for(let i =0; i<users.length;i++){
            if(this.user == users[i].user){
              this.userInformation.vipDian = (parseFloat(users[i].vipDian) + this.money * 100).toFixed(2)
              users[i].vipDian = (parseFloat(users[i].vipDian) + this.money * 100).toFixed(2)
            }
          }

          localStorage.setItem('register',JSON.stringify(users))

          this.pwd = []
          return
        }
        if(a === "--"){
          this.pwd.pop()
          return
        }
        if(this.pwd.length>=6){
          return
        }
        this.pwd.push(a)
      },
      back(){
        this.$router.push({name:'mine'})
      },
      activePic(a){
        for(let i=0;i<this.pic.length;i++){
          this.pic[i].ac = false
        }
        a.ac = true
        this.money = a.pic
      },
      selePlatform(a){
        for(let i=0;i<this.platform.length;i++){
          this.platform[i].ac = false
        }
        a.ac = true
      },
      immediately(){
        if(this.register == 1){
          this.$dialog.confirm({
            message: '您目前还未登录，是否马上登录'
          }).then(() => {
            this.$router.push({name:'registerInto'});
            this.$store.commit('changeRecharge','quickRecharge')
          }).catch(() => {
          });
          return
        }
        let tdcb = this.$refs.tdcb;

        let leader= -302;
        let target = 0

        let setI = setInterval(function(){
          leader += (target - leader) / 10;
          tdcb.style.bottom = leader + "px"
          if(leader >=-1 ){
            clearInterval(setI)
          }
        },20)
      },
      cancelZhifu(){
        let tdcb = this.$refs.tdcb;

        let leader= 0;
        let target = 302

        let setI = setInterval(function(){
          leader += (target - leader) / 10;
          tdcb.style.bottom = - leader + "px"
          if(target - leader <= 1){
            clearInterval(setI)
          }
        },20)
      }
    }
  }
</script>

<style scoped lang="less">
  .quickRecharge{
    height: calc(100% - 24px);
    >.header{
    	width: 92%;
    	margin: 0 auto;
    	padding: .133rem 0 .266rem;
      background: #fff;
    	>.back{
    		width: .533rem;
    		height: .533rem;
    		background: url(../assets/detailsPage/prev.png) no-repeat center center/cover;
    	}
    	>.his{
        line-height: .533rem;
        font-size: .373rem;
        color: #333;
    	}
    }
    >.content{
      width: 92%;
      margin: 0 auto;
      height: calc(100% - 1.013rem);
      >.ct-header{
        width: 100%;
        margin: 0 auto .8rem;
        >.ct-header-tp{
          font-size: .533rem;
          color: #333;
          font-weight: 700;
          padding: .266rem 0;
        }
        >.display-box{
          background: #1D89F5;
          padding: .533rem .533rem;
          border-radius: .213rem;
          box-shadow: -2px 3px 5px 1px #AED9FB;
          >div{
            padding: .133rem 0;
            color: #FFFDF7;
            font-size: .32rem;
            font-weight: 200;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            >.id{
              font-size: .426rem;
            }
            >.vipDian{
              font-size: .48rem;
              font-weight: 700;
            }
          }
        }
      }
      >.amount-box{
        width: 100%;
        >.amount-list{
          width: 100%;
          >li{
            width: 28%;
            height: 1.2rem;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 1.2rem;
            font-size: .426rem;
            border-radius: .133rem;
            float: left;
            box-sizing: border-box;
            margin: .133rem 0;
            font-family: "微软雅黑";
          }
          >li:nth-child(3n-1){
            margin: .133rem 8%;
          }
          >li.active{
            border: 1px solid #0570DB;
            box-shadow: 0px -0px 2px 1px #BAD6FB;
            background: #DDEEFE;
            color: #2A85F8;
          }
        }
      }
      >.btn-box{
        width: 100%;
        margin: .533rem 0;
        >.select-platform{
          >div{
            width: 100%;
            margin: 0 auto;
            border-bottom: 1px solid #D5D5D5;
            padding: .266rem 0;
            line-height: .533rem;
            font-size: .373rem;
            color: #333;
            font-family: "黑体";
            >i{
              width: .533rem;
              height: .533rem;
            }
            >i:first-child{
              background: url(../assets/mine/yin.png) no-repeat center center/cover;
              margin:0 .133rem;
            }
            >i:last-child{
              width: .4rem;
              height: .4rem;
              background: url(../assets/mine/notSelect.png) no-repeat center center/cover;
              margin-top: .066rem;
            }
            >i.active{
              background: url(../assets/mine/selectActive.png) no-repeat center center/cover;
            }
          }
        }
        >.confirm-btn{
          margin-top: .66rem;
          >div:first-child{
            text-align: center;
            font-size: .32rem;
            font-weight: 200;
            >span:first-child{
              color: #C8C8C8;
            }
            >span:last-child{
              color: #3890F1;
            }
          }
          >button{
            outline: noen;
            background: #3890F1;
            width: 100%;
            margin: 0 auto;
            text-align: center;
            height: 1.01rem;
            line-height: 1.01rem;
            border: none;
            color: #fff;
            border-radius: .133rem;
            font-size: .373rem;
            margin-top: .133rem;
            box-shadow: 2px 1px 3px 1px #A6CFFB;
          }
        }
      }
    }
  }
  .two-dimensional-code-box{
    width: 100%;
    height: 8rem;
    background: #fff;
    position: fixed;
    bottom: -8rem;
    left: 0;
    border-top: 1px solid #eee;
    >div{
      position: relative;
      width: 100%;
      height: 100%;
      >.tb-header{
        width: 100%;
        >.bd-header-rt{
          width: 98%;
          text-align: right;
          font-size: .426rem;
          padding: .133rem 0;
          margin: 0 auto;
        }
      }
      >.inp-box{
        width: 80%;
        margin: 0 auto;
        >.inp-list{
          >li{
            width: calc(100% / 6);
            height: 1.06rem;
            border: 1px solid #000;
            border-right: none;
            box-sizing: border-box;
            float: left;
            >input{
              border: none;
              width: 100%;
              height: 100%;
              font-size: 1.2rem;
              text-align: center;
              line-height: 1.06rem;
            }
          }
          >li:last-child{
            border-right: 1px solid #000;
          }
        }
      }
      >.keys{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        >.keys-list{
          width: 100%;
          >li{
            float: left;
            width: 33%;
            height: 1.33rem;
            line-height: 1.33rem;
            text-align: center;
            border-bottom: 1px solid #eee;
            font-size: .426rem;
          }
          >li:nth-child(3n-1){
            border-left:1px solid #eee;
            border-right:1px solid #eee;
          }
          >li:active{
            background: #eee;
          }
        }
      }
    }
  }
</style>
