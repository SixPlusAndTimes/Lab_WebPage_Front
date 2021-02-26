<template>
  <div>
    <el-row>
      <div style="margin-top: 20px"></div>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(item, key) in news" :key="key">
            <div class="carousel_view">
              <div class="news_title">
                <router-link :to="{ path: '/view', query: { id: item.id } }">{{
                  item.title
                }}</router-link>
              </div>

              <router-link :to="{ path: '/view', query: { id: item.id } }">
                <img
                  class="news_img"
                  v-show="news_heads[key]"
                  :src="news_heads[key]"
                />
              </router-link>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-row :gutter="4">
      <el-col :span="12">
        <el-card
          shadow="hover"
          :body-style="{ height: '250px', padding: '20px' }"
        >
          <div slot="header" class="clearfix">
            <span>研究团队</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.native="$router.push('/our_team')"
              >更多</el-button
            >
          </div>
          <div>
            <li v-for="(item, index) in researchers" :key="index">
              <router-link :to="{ path: '/view', query: { id: item.id } }">
                <span class="researcher_name">{{ item.title }}</span>
                <span class="researcher_brief">{{
                  item.content | filterHtml
                }}</span>
              </router-link>
            </li>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          shadow="hover"
          :body-style="{ height: '250px', padding: '20px' }"
        >
          <div slot="header" class="clearfix">
            <span>公告栏</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >更多</el-button
            >
          </div>
          <div>
            <li class="board" v-for="(item, index) in board" :key="index">
              <router-link :to="{ path: '/view', query: { id: item.id } }">
                <span class="board_style">{{ item.title }}</span>
              </router-link>
            </li>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-divider></el-divider>
      <h2>研究动态</h2>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8" v-for="(item, key) in research" :key="key" :offset="0">
        <el-card :body-style="{ height: '300px' }">
          <div class="head_img" @click="push_view(item.id)">
            <img :src="research_heads[key]" />
            <div class="back_img" v-show="research_heads[key] == null"></div>
          </div>

          <div style="padding: 14px; float: left">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.created | format_time }}</time>
              <el-button type="text" class="button" @click="push_view(item.id)"
                >更多</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      researchers: [],
      board: [],
      news: [],
      research: [],
      research_heads: [],
      news_heads: [],
    };
  },
  filters: {
    filterHtml(val) {
      let length = 80;
      let text = val.replace(/<[^>]*>/g);
      text = text.replace(/undefined/g, "");
      if (text.length < length) return text;
      else return text.substr(0, length);
    },
    format_time(str) {
      let current_datetime = new Date(str);
      return (
        current_datetime.getFullYear() +
        "年" +
        (current_datetime.getMonth() + 1) +
        "月" +
        current_datetime.getDate() +
        "日 " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds()
      );
    },
  },
  methods: {
    get_imglist: function (items) {
      let rgx = /<img.*?src="(.*?)".*?\/?>/gi;
      let url_reg = /image\/(\d*\.[a-zA-Z]*)/i;
      let head_list = [];
      for (let item of items) {
        let str = item.content;
        let results = str.match(rgx);
        if (results != null && typeof results != "undefined") {
          let tmp = results[0].match(url_reg);
          head_list.push(tmp[0]);
        }
      }
      return head_list;
    },
    push_view(id) {
      this.$router.push("/view?id=" + id);
    },
    getHomeArticles(type, limit) {
      return this.$axios.get("/Index/" + type + "/" + limit);
    },
    filterHtml(val, length = 80) {
      let text = val.replace(/<[^>]*>/g);
      text = text.replace(/undefined/g, "");
      if (text.length < length) return text;
      else return text.substr(0, length);
    },
  },
  mounted() {
    this.getHomeArticles("researcher", "5").then((res) => {
      this.researchers = res.data.data;
    });
    this.getHomeArticles("board", "7").then((res) => {
      this.board = res.data.data;
    });
    this.getHomeArticles("news", "5").then((res) => {
      this.news = res.data.data;
      this.news_heads = this.get_imglist(this.news);
    });
    this.getHomeArticles("research", "3").then((res) => {
      this.research = res.data.data;
      this.research_heads = this.get_imglist(this.research);
      console.log(this.research_heads);
    });
  },
  components: {
    // HelloWorld,
  },
};
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

a {
  text-decoration: none;
  color: aliceblue;
}
a:hover {
  text-decoration: underline;
  color: #99a9bf;
}

/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
} */

.carousel_view {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
.carousel_view > .news_img {
  position: absolute;
  width: 100%;
  height: auto;
  top: 0%;
  left: 0%;
  z-index: 1;
  /* transform: translate(-50%, -50%); */
}

.news_title {
  background-color: black;
  opacity: 60%;
  padding: 10px;
  color: aliceblue !important;
  position: absolute;
  bottom: 10%;
  left: 2%;
  z-index: 100;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
li {
  list-style: none;
  margin: 5px;
}
.researcher_name {
  color: #565a69;
  font-size: 16px;
  font-weight: bold;
  padding-right: 15px;
}
.researcher_brief {
  font-size: 14px;
  line-height: 150%;
  color: #99a9bf;
}

.board_style {
  font-size: 16px;
  line-height: 180%;
  color: #565a69;
}

.head_img {
  overflow: hidden;
  position: relative;
  width: 320px;
  height: 180px;
  float: left;
  margin: 8px;
}

.head_img > img {
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.time {
  font-size: 13px;
  color: #d3dce6;
}

.button {
  margin: 0px 5px 0px 10px;
}

.back_img {
  background-color: aliceblue;
  width: 320px;
  height: 180px;
}
</style>