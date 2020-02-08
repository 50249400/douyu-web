<template>
  <div id="livelist">
    <header-bar>
      <span>直播列表</span>
    </header-bar>
    <div class="live-box">
      <ul class="live-list">
        <li v-for="(value,index) in liveData" :key="index">
          <img :src="value.room_src" :alt="value.room_name" />
          <p>{{value.room_name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderBar from "../components/HeaderBar";
export default {
  name: "LiveList",
  components: {
    HeaderBar
  },
  data() {
    return {
      liveData: [],
      offset: 0,
      limit: 20
    };
  },
  methods: {
    getData() {
      this.$http
        .get("/douyu/live", {
          params: {
            offset: this.offset,
            limit: this.limit
          }
        })
        .then(function(resData) {
          console.log(resData.body.data);
          this.liveData = this.liveData.concat(resData.body.data);
        });
    },
    handleScroll() {
      var documentHeight = document.documentElement.clientHeight;
      //console.log(documentHeight); //文档窗口高度
      var scrollHeight = document.documentElement.scrollHeight;
      //console.log(scrollHeight); //文档总高度
      var livelist = document.getElementById("livelist");
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollTop + documentHeight == scrollHeight){
        //   alert("到底了")
        this.offset += 20;
        this.getData();
      }
    }
  },
  created() {
    this.getData();
    window.onscroll = () => {
      window.addEventListener("scroll", this.handleScroll);
    };
  }
};
</script>
<style>
nav .router-link-active .log-box1 {
  background-image: url("../assets/imgs/douyu-2.png");
}
.live-box {
  padding: 0.625rem 0;
}
ul {
  list-style: none;
  padding: 0;
}
.live-box {
  overflow: auto;
}
.live-list li {
  width: calc(50% - 2.5rem);
  float: left;
  margin: 0.625rem 1.25rem;
  text-align: center;
}
.live-list li p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.live-list li img {
  width: 100%;
}
.live-list{
    overflow: auto;
}
</style>