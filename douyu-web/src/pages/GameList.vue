<template>
  <div id="gamelist">
    <header-bar>
      <span>游戏列表</span>
    </header-bar>
    <ul class="game-list">
      <li v-for="(value,index) in pageData" :key="index">
        <img :src="value.game_src" :alt="value.game_name" />
        <p>{{value.game_name}}</p>
      </li>
    </ul>
    <div class="pageBox">
      <span class="pgNum" v-for="(value,index) in pageNum" :key="index" @click="page=index">
        {{value}}
      </span>
    </div>
  </div>
</template>
<script>
import HeaderBar from "../components/HeaderBar";
export default {
  name: "GameList",
  components: {
    HeaderBar
  },
  data() {
    return {
      getData: [],
      pageSize: 30,
      page: 1
    };
  },
  created() {
    this.$http.get("/douyu/game").then(function(resData) {
      console.log(resData);
      this.getData = resData.body.data;
    });
  },
  computed: {
    pageNum() {
      return Math.ceil(this.getData.length / this.pageSize);
    },
    pageData(){
      var start = (this.page - 1) * this.pageSize;
      var end = this.page * this.pageSize;
      return this.getData.slice(start,end);
    }
  }
};
</script>
<style>
nav .router-link-active .log-box2 {
  background-image: url("../assets/imgs/tubiaozhizuomoban-x--2.png");
}
#gamelist {
  height: 100%;
  overflow: auto;
}
ul {
  list-style: none;
  padding: 0;
}
.game-list li {
  width: calc(50% - 1.25rem * 2);
  margin: 0.625rem 1.25rem;
  float: left;
  text-align: center;
}
.game-list li img {
  width: 100%;
}
.pageBox{
  width: 100%;
  clear: both;
}
.pgNum{
  width: 5%;
  height: 5%;
  display: inline-block;
  border: 1px solid black;
  text-align: center;
  cursor: pointer;
}
</style>