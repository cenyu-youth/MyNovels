<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
	*{
		padding: 0;
		margin: 0;
	}
  #app{
    height: 100%;
    width: 100%;
  }
	html,body{
		height: 100%;
    background: #fff;
	}
  input,button{
    outline: none;
  }
	.system{
		height: 24px;
		background: #ddd;
    position: sticky;
    top:0;
    z-index: 9;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.clearfix::after{
		display: block;
		content:'';
		clear:both;
	}
	.img-auto{
		display: block;
		width: 92%;
		margin: 0 auto;
		border-radius: 5px;
	}

  .line{
    width: 100%;
    background: #F3F4F6;
    height: .266rem;
  }
</style>
