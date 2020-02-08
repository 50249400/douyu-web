<template>
  <div id="#Reg">
    <header>
      <span class="reg-douyu">登录斗鱼</span>
      <div class="rtReg">
        <span>已有账号？</span>
        <router-link to="/login" class="reRegto">马上登录&gt;</router-link>
      </div>
    </header>
    <div class="lg-form">
      <form @submit.prevent="submit">
        <input type="text" placeholder="请输入手机号码" name="tel" v-model="telNum" @blur="telPd" />
        <p v-if="telError">手机号格式不正确，请重新输入</p>
        <input type="password" placeholder="请输入密码" name="pwd" v-model="pwdNum" @blur="pwdPd" />
        <p v-if="pwdError">密码格式不正确，正确格式：数字字母8-15位</p>
        <input type="password" placeholder="请输入验证码" name="yzm" v-model="yzmNum" />
        <button class="yzm-btn" type="button" @click="yzmBtn">短信验证</button>
        <aside>
          <input type="checkbox" name="hsd" v-model="hsd" />
          阅读并同意以下服务条款和协议
          {{hsd}}
        </aside>
        <button type="submit" class="lg-button">立即注册</button>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from "./bus";
import qs from "qs";
export default {
  name: "Reg",
  data() {
    return {
      telNum: "",
      pwdNum: "",
      telError: "",
      pwdError: "",
      yzmNum: "",
      hsd: false
    };
  },
  methods: {
    telPd() {
      var telExp = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!telExp.test(this.telNum)) {
        this.telError = true;
      } else {
        this.telError = false;
      }
    },
    pwdPd() {
      var pwdExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
      if (!pwdExp.test(this.pwdNum)) {
        this.pwdError = true;
      } else {
        this.pwdError = false;
      }
    },
    yzmBtn() {
      this.$http.get("/node/yzm").then(function(resData) {
        setTimeout(() => {
          this.yzmNum = resData.data;
          console.log(resData.data);
        }, 2000);
      });
    },
    submit() {
      if (this.telError == true || this.pwdError == true) {
        alert("请输入正确格式信息");
      } else if(this.telNum == "" || this.pwdNum == "" || this.yzmNum == ""){
          alert("手机号、密码、验证码不能为空")
      }else if(this.hsd == false){
          alert("请阅读并勾选服务条款和协议")
      }else {
        var data = {
          tel: this.telNum,
          password: this.pwdNum,
        };
        this.$http
          .post("/node/reg", data, { emulateJSON: true })
          .then(function(resData) {
            alert(resData.body);
          });
      }
    }
  },
  created() {
    Vue.$emit("nav-show", false);
  }
};
</script>
<style scoped>
#Reg {
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
.reg-douyu {
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
input[name="yzm"] {
  width: 70%;
  float: left;
}
.lg-form ::-webkit-input-placeholder {
  padding-left: 1.25rem;
  color: rgb(201, 201, 201);
  /* position: relative;
    top: -10px; */
}
.lg-form button {
  height: 3.125rem;
  line-height: 3.125rem;
  color: white;
  background-color: #ff7703;
  margin-top: 0.9375rem;
  font-size: 1.125rem;
}
.lg-form .yzm-btn {
  width: calc(30% - 1px);
}
aside {
  clear: both;
}
.lg-form .lg-button {
  width: 100%;
}
</style>