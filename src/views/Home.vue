<template>
  <div>
    <el-row> </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-row :gutter="2">
            <el-card class="box-card-left">
              <div slot="header" class="clearfix">
                <span>研究室简介</span>
              </div>
              <div >
                阿松大后来后i哦吼吼好久哦i和耦合oh加哦就和OK加哦就哦哦偶就吼吼吼吼哦哦吼吼吼吼吼hi改善改变覅该俄红粉
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>
            </el-card>
          </el-row>

        <el-row :gutter="2">
            <el-card class="box-card-left">
              <div slot="header" class="clearfix">
                <span>热点新闻</span>
              </div>
              <div >
                阿松大后来后i哦吼吼好久哦i和耦合oh加哦就和OK加哦就哦哦偶就吼吼吼吼哦哦吼吼吼吼吼hi改善改变覅该俄红粉
              </div>
            </el-card>
        </el-row>

      </el-col>

      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card-mid">
            <div slot="header" class="clearfix">
              <span>研究室动态</span>
            </div>
            <div >
              阿松大后来后i哦吼吼好久哦i和耦合oh加哦就和OK加哦就哦哦偶就吼吼吼吼哦哦吼吼吼吼吼hi改善改变覅该俄红粉
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </div>
          </el-card>
       </div></el-col>


      <el-col :span="6">
        <el-row :gutter="6">
          <el-card class="box-card-left">
            <div slot="header" class="clearfix">
              <span>联系我们</span>
            </div>
            <div >
              阿松大后来后i哦吼吼好久哦i和耦合oh加哦就和OK加哦就哦哦偶就吼吼吼吼哦哦吼吼吼吼吼hi改善改变覅该俄红粉

            </div>
          </el-card>
        </el-row>

        <el-row :gutter="6">
          <el-card class="box-card-left">
            <div slot="header" class="clearfix">
              <span>友情链接</span>
            </div>
            <div >
              阿松大后来后i哦吼吼好久哦i和耦合oh加哦就和OK加哦就哦哦偶就吼吼吼吼哦哦吼吼吼吼吼hi改善改变覅该俄红粉

            </div>
          </el-card>
        </el-row>
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

 .el-row {
   margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


 /*研究室简介样式*/
 .text {
   font-size: 14px;
 }

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

/*.box-card-left {*/
/*  width: 260px;*/
/*}*/

/*.box-card-mid {*/
/*  width: 530px;*/
/*}*/
</style>
