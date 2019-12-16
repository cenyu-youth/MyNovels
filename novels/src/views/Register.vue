<template>
  <div class="register">
		<div class="system"></div>
		<div class="header clearfix">
			<div class="sign fr" @click="goState({name:'registerInto'})">登录</div>
			<div class="tourist fl" @click="goState({name:'selected'})">游客登录</div>
			<div class="logo">BAD</div>
		</div>
		<div class="reg-form">
			<van-cell-group>
				<van-field
					placeholder="请输入用户名"
					:error-message="err.user"
					v-model="regis.user"
					@focus="inpVerificationF('user')"
					@blur="inpVerificationB('user')"
				/>
				<van-field
					:type="typep"
					placeholder="请设置密码"
					:error-message="err.pwd"
					right-icon="eye-o"
					v-model="regis.pwd"
					@click-right-icon="noneBlock(['typep',typep])"
					@focus="inpVerificationF('pwd')"
					@blur="inpVerificationB('pwd')"
				/>
				<van-field
					:type="typep1"
					placeholder="请确认密码"
					:error-message="err.pwd1"
					right-icon="eye-o"
					v-model="regis.pwd1"
					@click-right-icon="noneBlock(['typep1',typep1])"
					@focus="inpVerificationF('pwd1')"
					@blur="inpVerificationB('pwd1')"
				/>
			</van-cell-group>
			<van-button
				class="reg-btn"
				:loading="isBlock"
				type="danger"
				loading-text="注册中..."
				text="注册"
				block
				@click="registers"
			/>
		</div>
		<div class="footer">
			<van-divider :style="{ color: '#333', borderColor: '#ddd', padding: '0 10px' }">小说阅读</van-divider>
		</div>
  </div>
</template>

<style scoped lang="less">

	.header{
		height:5.333rem;
		position:relative;
		>.logo{
			width: 2.133rem;
			height: 2.133rem;
			background: #F73637;
			border-radius: 8px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			line-height: 2.133rem;
			color: #fff;
			font-size: 1rem;
		}
		>.sign{
			padding: 0.2666rem;
			color: #999999;
			font-size: .3733rem;
		}
		>.tourist{
			padding: 0.2666rem;
			color: #999999;
			font-size: .3733rem;
		}
	}
	.reg-form{
		width: 85%;
		margin: 0 auto;
	}
	.reg-btn{
		width: 85%;
		border-radius: 1.2rem;
		margin: 0 auto;
		margin-top: 1rem;
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}

</style>

<script>
  import {mapMutations} from 'vuex'
export default {
  name: 'register',
	data(){
		return{
			isBlock:false,
			regis:{
				user:'',
				pwd:'',
				pwd1:''
			},
			typep:'password',
			typep1:'password',
			err:{
				user:'',
				pwd:'',
				pwd1:''
			},
			reg:{
				user:/^[a-zA-Z0-9_-]{4,16}$/,
				pwd:/^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/
			},
			isRegister:false,
      cloneRegis:{}

		}
	},
	methods:{
		//跳转路由到登录页面，顺便初始化
		goState(o){
			this.regis.user = ''
			this.regis.pwd = ''
			this.regis.pwd1 = ''
			this.typep = 'password'
			this.typep1 = 'password'

			this.isBlock = false
			this.$router.push(o)
		},
    //游客登录特别备注
    // tourist(o){
    //   this.$router.push(o)
    // },

		//明文密文密码转换
		noneBlock(i){
			this[i[0]] = i[1] === 'text' ? 'password' : 'text';
		},

		//获取焦点清空当前警报
		inpVerificationF(i){
			this.err[i] = ''
		},

		//失去焦点验证
		inpVerificationB(i){
			if(this.regis[i] == ''){
				this.err[i] = '输入不能为空'
				return;
			}

			if(i == 'pwd1'){
				if(this.regis[i] === this.regis.pwd){
					return;
				}else{
					this.err[i] = '两次密码不一致'
					return;
				}
			}

			if(!this.reg[i].test(this.regis[i])){
				this.err[i] = '输入格式不正确'
				return;
			}

			this.isRegister = true;
      this.cloneRegis.user = this.regis.user
      this.cloneRegis.pwd = this.regis.pwd
		},

    //点击注册按钮
		registers(){
			if(!this.isRegister){
				return
			}


			this.isRegister = false
			this.isBlock = true
      let resHis = [];

      if(JSON.parse(localStorage.getItem('register'))){
        resHis = JSON.parse(localStorage.getItem('register'))

        for(let i=0;i<resHis.length;i++){
          if(resHis[i].user == this.cloneRegis.user){
            this.$notify('账号或密码已被注册');
            this.isBlock = false
            return
          }
        }
      }

      this.cloneRegis.vipDian = '1000.00'
      this.cloneRegis.dianquan = '1000'
      this.cloneRegis.yuepiao = '100'
      this.cloneRegis.vipLevel = '尊贵VIP用户'
      this.cloneRegis.ID = new Date().getTime()
      this.cloneRegis.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576159806419&di=d1692128e0542a45a437ccb547d4d1ed&imgtype=0&src=http%3A%2F%2Fimg08.oneniceapp.com%2Fupload%2Fshow%2F2019%2F03%2F13%2Faef5b832c7b50b6756551461f80f5ba2-show.n640.jpg'

      resHis.push(this.cloneRegis)



			localStorage.setItem('register',JSON.stringify(resHis))

			this.$dialog.alert({
				confirmButtonColor:'#333',
				title: '注册成功',
				message: '亲爱的用户，恭喜你注册成功，现在就去登录吧！',
			}).then(() => {
        this.regis.user = ''
        this.regis.pwd = ''
        this.regis.pwd1 = ''
				this.isBlock = false
			});

		}
	}
}
</script>
