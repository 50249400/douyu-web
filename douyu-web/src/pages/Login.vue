<template>
  <div id="#Login">
    <header>
      <span class="login-douyu">登录斗鱼</span>
      <div class="rtReg">
        <span>没有账号？</span>
        <router-link to="/reg" class="reRegto">马上注册&gt;</router-link>
      </div>
    </header>
    <div class="lg-form">
      <form @submit.prevent="submit">
        <input type="text" placeholder="请输入手机号码" name="tel" v-model="tel" />
        <p v-if="telError">{{msg}}</p>
        <input type="password" placeholder="请输入密码" name="pwd" v-model="password" />
        <p v-if="pwdError">{{msg}}</p>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from "./bus";
export default {
  name: "Login",
  data() {
    return {
      tel: "",
      password: "",
      telError: false,
      pwdError: false,
      msg: "",
    };
  },
  methods: {
    submit() {
      this.$http.post(
          "/node/login",
          { tel: this.tel, password: this.password },
          { emulateJSON: true }
        )
        .then(function(resData) {
          console.log(resData);
          this.telError = resData.body.telError;
          this.pwdError = resData.body.pwdError;
          this.msg = resData.body.msg;
          if(resData.data.code == 1){
            alert(resData.body.msg);
            var keyName = {
              tel: this.tel,
              password: this.password
            }
            this.$cookies.set("user",keyName,{expires:7})
            this.$router.push({ path: '/gamelist' })
            this.$router.go(0)
          }
        });
    }
  },
  created() {
    Vue.$emit("nav-show", false);
  }
};
</script>
<style scoped>
#Login {
  height: 100%;
}
header,
.lg-form {
  padding: 0 2.5rem;
}
header {
  height: 3.75rem;
  line-height: 3.75rem;
  border-bottom: 0.5px solid gainsboro;
}
.login-douyu {
  font-size: 1.5625rem;
  color: lightslategrey;
}
.rtReg {
  float: right;
  font-size: 1rem;
}
.reRegto {
  color: #ff7703;
}
.lg-form form {
  margin-top: 1.875rem;
}
.lg-form input[type="text"],
input[type="password"] {
  width: 100%;
  height: 3.125rem;
  margin: 0.9375rem 0;
  background-color: transparent;
  outline: none;
  border: 0.5px solid rgb(201, 201, 201);
  font-size: 1.125rem;
}
.lg-form ::-webkit-input-placeholder {
  padding-left: 1.25rem;
  color: rgb(201, 201, 201);
  /* position: relative;
    top: -10px; */
}
.lg-form button {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  color: white;
  background-color: #ff7703;
  margin-top: 0.9375rem;
}
</style>