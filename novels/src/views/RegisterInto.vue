<template>
  <div class="register">
    <div class="system"></div>
		<div class="header clearfix">
			<div class="sign fr" @click="goState({name:'register'})">注册</div>
			<div class="sign fl" @click="youke({name:recharge})">游客登录</div>
			<div class="logo">BAD</div>
		</div>
		<div class="reg-form">
			<van-cell-group>
				<van-field
					placeholder="请输入用户名"
					:error-message="err.user"
					v-model="regis.user"
					@focus="inpVerificationF('user')"
				/>
				<van-field
					:type="typep"
					placeholder="请输入密码"
					:error-message="err.pwd"
					right-icon="eye-o"
					v-model="regis.pwd"
					@click-right-icon="noneBlock(['typep',typep])"
					@focus="inpVerificationF('pwd')"
				/>
			</van-cell-group>
			<van-button
				class="reg-btn"
				:loading="isBlock"
				type="danger"
				loading-text="登录中..."
				text="登录"
				block
				@click="registerInto"
			/>
			<div class="tip">{{tips}}</div>
		</div>
		<div class="footer">
			<van-divider :style="{ color: '#333', borderColor: '#ddd', padding: '0 10px' }">小说阅读</van-divider>
		</div>
  </div>
</template>


<script>
  import {mapState,mapMutations} from 'vuex'
	export default {
		created(){
			this.registerInformation = JSON.parse(localStorage.getItem('register'))
		},
    computed:{
      ...mapState({
        recharge:'recharge'
      })
    },
		data() {
			return {
				regis:{
					user:'',
					pwd:''
				},
				typep:'password',
				isBlock:false,
				registerInformation:'',
				err:{
					user:'',
					pwd:''
				},
				tips:''
			};
		},
		methods:{

			goState(o){
        this.$router.push(o);
			},

      youke(o){
        this.$router.push(o);

        this.$store.commit('changeRecharge','selected')
      },

			noneBlock(i){
				this[i[0]] = i[1] === 'text' ? 'password' : 'text';
			},

			inpVerificationF(i){
				this.err[i] = ''
				this.tips = ''
			},

			registerInto(){
				if(this.regis.user == ''){
					this.err.user = '请输入账号';
					return;
				}else if(this.regis.pwd == ''){
					this.err.pwd = '请输入密码';
					return;
				}

				if(!this.registerInformation){

					this.$dialog.confirm({
						confirmButtonColor:'#e4393c',
						message: '你好像还没注册哦，是否现在就去注册'
					}).then(() => {
						this.$router.push({name:'register'});
						return
					}).catch(() => {
						return;
					});
					return;
				}


        let flag = false

        for(let i=0;i<this.registerInformation.length;i++){
          if(this.regis.user != this.registerInformation[i].user){
          	this.tips = '账号输入错误!'
            flag = true
            continue;
          }

          if(this.regis.pwd != this.registerInformation[i].pwd){
          	this.tips = '密码输入错误!'
            flag = true
          	continue;
          }

          flag = false
          break;
        }

        if(flag){
          this.$notify('账号或密码输入错误');
          return
        }


        this.$toast('登录成功');
				this.$router.push({name:this.recharge})
        this.$store.commit('changeRegister',{idx:0,user:this.regis.user})
        this.$store.commit('changeRecharge','selected')
			}
		}
	}
</script>

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
	.tip{
		font-size: .373rem;
		color: #EE0A24;
		text-align: center;
		margin-top: .266rem;
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
