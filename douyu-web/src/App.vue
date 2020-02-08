<template>
  <div id="app">
    <nav v-show="show">
      <router-link to="/livelist">
        <div class="log-box1"></div>
        <p>直播列表</p>
      </router-link>
      <router-link to="/gamelist">
        <div class="log-box2"></div>
        <p>游戏列表</p>
      </router-link>
      <router-link to="/home">
        <div class="log-box3"></div>
        <p>用户中心</p>
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from './pages/bus'
export default {
  name: 'app',
  data(){
    return{
      show:true
    }
  },
  created(){
    var usCookie = this.$cookies.get('user');
    if(usCookie == '' || usCookie == null){
      alert('您还未登录，请登录后使用')
      this.$router.push({ path: '/login' })
    }
    Vue.$on('nav-show',(flag)=>{
      this.show = flag
    })
    console.log(this.$cookies.get("user"))
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app,body,html{
  width: 100%;
  height: 100%;
  margin: 0;
}
#app::after{
  height: 65px;
  display: block;
  content: '';
}
nav{
  width:100%;
  height: 3.75rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  padding-top: .3125rem;
}
nav>a{
  float: left;
  width: 33.33%;
  text-align: center;
  color: rgb(43, 43, 43);
}p{
  font-size: .875rem;
}
.router-link-active{
  color: #ff7703;
}
.log-box1,.log-box2,.log-box3{
  width: 2rem;
  height: 2rem;
  background-size: 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
}
.log-box1{
    background-image: url('./assets/imgs/douyu.png');
}
.log-box2{
    background-image: url('./assets/imgs/tubiaozhizuomoban-x-.png');
}
.log-box3{
    background-image: url('./assets/imgs/yonghu.png');
}

</style>
