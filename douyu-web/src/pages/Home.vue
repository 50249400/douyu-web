<template>
  <div id="home">
    <header class="home-hd">
      <span @click="back">&lt;</span>
      <div class="bt-zlt">
        <img src="../assets/imgs/touxiang.png" alt />
        <div class="bt-ztl-child">
          <p class="user-name" @click="cookiePd && noUser()">{{userName}}</p>
          <p class="zlt-text">斗鱼-每个人的直播平台</p>
        </div>
      </div>
    </header>
    <group>
      <cell value-align="left" :is-link="true">我的收藏</cell>
      <cell value-align="left" :is-link="true">我的客服</cell>
      <cell value-align="left" :is-link="true">推荐有奖</cell>
    </group>
    <x-button @click.native="removeCookies">退出登录</x-button>
  </div>
</template>
<script>
import HeaderBar from "../components/HeaderBar";
import { Cell,Group,XButton } from 'vux'
export default {
  name: "Home",
  components: {
    HeaderBar,
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      userName: '',
      cookiePd: true
    };
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    noUser(){
      this.$router.push({ path: "/login" })
    },
    removeCookies(){
      alert("退出成功");
      this.$cookies.remove("user");
      this.$router.go(0);
    }
  },
  created(){
    var usName = this.$cookies.get("user");
    this.userName = usName.tel;
    if(this.userName == '' || this.userName == null){
      this.userName = "登录后享受完整体验"
      this.cookiePd = true;
    }
  }
};
</script>
<style>
nav .router-link-active .log-box3 {
  background-image: url("../assets/imgs/yonghu-2.png");
}
#home {
  height: 100%;
}
.home-hd {
  height: 11.25rem;
  background-image: linear-gradient(to right, #ff8d29, #ffb26e);
}
.home-hd > span {
  font-size: 1.875rem;
  color: white;
  display: inline-block;
  padding: 0.625rem;
}
.bt-zlt {
  padding: 0 1.25rem;
}
.home-hd img {
  width: 6.25rem;
  border-radius: 50%;
  margin-right: 1.25rem;
  float: left;
  position: relative;
  top: -0.625rem;
}
.user-name,
.zlt-text {
  color: white;
}
.user-name {
  font-size: 1.5625rem;
}
.bt-ztl-child p {
  margin: 0.3125rem 0;
}
.zlt-text,.weui-cells {
  font-size: 1.25rem;
}
.weui-btn{
  margin: 1.25rem 0;
}
.weui-btn_default{
  background-color: #ff8d29 !important;
  color: white !important;
}
</style>