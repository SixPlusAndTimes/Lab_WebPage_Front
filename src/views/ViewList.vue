<!--  -->
<template>
  <div>
    <el-row>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in articles"
          :key="item.id"
          class="card_news"
          :timestamp="item.created | format_time"
          placement="top"
          :color="getColor(index)"
          @mouseover.native="selectStyle(index)"
        >
          <!-- this.$router.push("/view?id=" + id); -->
          <el-card shadow="hover">
            <h3>
              <router-link :to="{ path: '/view', query: { id: item.id }}">{{ item.title }}</router-link>
            </h3>
            <div class="art_img">
              <img v-if="isNotNull(img_src[index])" v-bind:src="img_src[index]" />
            </div>

            <router-link :to="{ path: '/view', query: { id: item.id }}">
              <div class="brief">
                <span v-html="filterHtml(item.content)"></span>
                <span>……</span>
              </div>
            </router-link>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-row>
    <el-row>
      <el-col :offset="8" :span="8">
        <el-pagination
          class="mpage"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="page"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["type"],
  data() {
    //这里存放数据
    return {
      color_index: -1,
      img_src: [],
      activity_color: {},
      currentPage: 1,
      total: 0,
      pageSize: 7,
      articles: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  filters: {
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
    getColor(index) {
      if (index == this.color_index) return "#006cff";
      else return "#fff";
    },
    isNotNull(val) {
      return !(!val && typeof val != "undefined" && val != 0);
    },
    filterHtml(val, length = 150) {
      let text = val.replace(/<[^>]*>/g);
      text = "&emsp;&emsp;" + text.replace(/undefined/g, "");
      if (text.length < length) return text;
      else return text.substr(0, length);
    },
    selectStyle(index) {
      this.color_index = index;
    },
    page(currentPage = "1") {
      let reg = /<img.*?src="(.*?)".*?\/?>/i;
      const _this = this;
      _this.$axios
        .get(
          "/ArticleList?currentPage=" + currentPage + "&typeName=" + _this.type
        )
        .then((res) => {
          // console.log(res);
          _this.articles = res.data.data.records;
          _this.currentPage = res.data.data.current;
          _this.total = res.data.data.total;
          _this.pageSize = res.data.data.size;

          for (let i = 0; i < _this.articles.length; i++) {
            let tmp = _this.articles[i].content.match(reg);
            // console.log(tmp);
            if (_this.isNotNull(tmp)) {
              _this.img_src.push(tmp[1]);
            } else {
              _this.img_src.push(null);
            }
          }
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.page(1);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.card_news {
  margin-top: 16px;
}
img {
  margin: 5px 5px 20px 10px;
  max-width: 150px;
  height: auto;
  float: right;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: #006cff;
}

.brief {
  /* float: left; */
  width: 80%;
  padding: 10px 50px 10px 10px;
}

</style>