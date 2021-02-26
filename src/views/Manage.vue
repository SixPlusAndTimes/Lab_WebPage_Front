<template>
  <div class>
    <el-table :key="view_record" :data="articles" v-if="articles">
      <el-table-column prop="created" label="创建时间" min-width="15%">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>

          <span class="time_display">{{ scope.row.created | format_time }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名字" min-width="40%"></el-table-column>

      <!-- <el-table-column prop="type" label="类别">
        <template slot-scope="scope">{{ scope.row.type | format_type }}</template>
      </el-table-column>-->

      <el-table-column label="操作" min-width="40%">
        <template slot-scope="scope">
          <el-button
            @click="view_article(scope.row.type, scope.row.id)"
            type="info"
            size="small"
            icon="el-icon-view"
            plain
            round
          >查看</el-button>
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="取消置顶"
            placement="top"
            autofocus="true"
          >
            <el-button
              @click="cancel_top_article(scope.row.id)"
              type="warning"
              size="small"
              icon="el-icon-upload2"
              plain
              round
            >
              <span>取消</span>
            </el-button>
          </el-tooltip> -->
          <el-button
            @click="top_article(scope.row.id)"
            type="success"
            size="small"
            icon="el-icon-upload2"
            plain
            round
          >置顶</el-button>
          <el-button
            @click="up_article(scope.row.id)"
            type="success"
            size="small"
            icon="el-icon-arrow-up"
            plain
            round
          >上移</el-button>
          <el-button
            @click="edit_article(scope.row.id)"
            type="primary"
            size="small"
            icon="el-icon-edit"
            plain
            round
          >编辑</el-button>
          <el-button
            @click="delete_article(scope.row.id)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            plain
            round
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px"></div>

    <el-pagination
      class="mpage"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="page"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件

export default {
  name: "Manage",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    type_name: String,
  },
  data() {
    //这里存放数据
    return {
      currentPage: 1,
      total: 0,
      pageSize: 7,
      articles: [],
      view_record: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {
    $route: "page",
  },
  //方法集合
  filters: {
    format_time(str) {
      let current_datetime = new Date(str);
      return (
        " " +
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds()
      );
    },
    format_type(name) {
      let types_dict = {
        researcher: "研究人员",
        research: "科学研究",
        news: "新闻",
        board: "公告",
        special: "页面",
        issue: "技术咨询",
      };
      return types_dict[name];
    },
  },

  methods: {
    // format_data(records){
    //   for(let i of records){
    //     i.created = this.format_time(i.created);
    //   }
    // },
    top_article(id) {
      const _this = this;
      this.$axios.get("/ArticleSet/top/" + id).then((res) => {
        _this.page(_this.currentPage);
        _this.view_record++;
      });
    },
    up_article(id) {
      const _this = this;
      this.$axios.get("/ArticleSet/up/" + id).then((res) => {
        _this.page(_this.currentPage);
        _this.view_record++;
      });
    },
    view_article(type, id) {
      if(type == "webpage"){
        
        this.$router.push("/webpage?id=" + id);
      }
      else
        this.$router.push("/view?id=" + id);
    },
    edit_article(id) {
      this.$router.push("/admin/article?id=" + id);
    },
    delete_article(id) {
      const _this = this;
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/ArticleDelete/" + id, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              _this.$message({
                type: "success",
                message: "删除成功!",
              });
              _this.page(_this.currentPage);
            })
            .catch((res) => {
              _this.$message({
                type: "warning",
                message: res.data,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    page(currentPage = "1") {
      const _this = this;
      _this.$axios
        .get(
          "/ArticleList?currentPage=" +
            currentPage +
            "&typeName=" +
            _this.type_name
        )
        .then((res) => {
          _this.articles = res.data.data.records;
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
    this.page();
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
.time_display {
  color: gray;
  font-size: 12px;
}
</style>