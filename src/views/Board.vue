<!--  -->
<template>
  <div>
    <el-row>
      <div style="margin: 10px;"></div>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <h2>公告栏</h2>
          </div>
          <p v-if="articles.length == 0">
            暂无内容
          </p>
          <el-card v-for="item in articles" :key="item.id" class="bulletin" shadow="hover">
            <a @click="view_article(item.id)" > {{item.title}} </a>
          </el-card>

          <el-pagination
            class="mpage"
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="page"
          ></el-pagination>
        </el-card>
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
  data() {
    //这里存放数据
    return {
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
  methods: {
    view_article(id) {
      this.$router.push("/view?id=" + id);
    },
    page(currentPage = "1") {
      const _this = this;
      _this.$axios
        .get("/ArticleList?currentPage=" + currentPage + "&typeName=board")
        .then((res) => {
          // console.log(res);
          _this.articles = res.data.data.records;
          // _this.articles = this.format_data(res.data.data.records);
          _this.currentPage = res.data.data.current;
          _this.total = res.data.data.total;
          _this.pageSize = res.data.data.size;
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
.bulletin {
  font-size: 15px;
  margin-bottom: 18px;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.box-card {
  width: 100%;
  padding: 50px;
}
</style>