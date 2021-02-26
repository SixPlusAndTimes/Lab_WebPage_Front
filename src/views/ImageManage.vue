
<template>
  <div>
    <el-row v-if="imglist.length != 0">
      <el-card
        :body-style="{ padding: '0px' }"
        class="card"
        shadow="hover"
        v-for="(item, key) in imglist"
        :key="key"
      >
        <div class="single_img">
          <img :src="'/image/' + item.url" alt="" />
        </div>

        <div style="padding: 14px">
          <span class="filetitle">{{ item.url }} </span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="showImage(item.url)"
              >查看</el-button
            >
            <el-button type="text" class="button"
            @click="deleteImage(item.url)">删除</el-button>
          </div>
        </div>
      </el-card>
    </el-row>

    <el-row v-else>
      <h3>暂无图片</h3>
    </el-row>

    <div style="margin-top: 20px"></div>

    <el-pagination
      v-if="imglist.length != 0"
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
  //import引入的组件需要注入到对象中才能使用

  data() {
    //这里存放数据
    return {
      currentPage: 1,
      total: 0,
      pageSize: 16,
      imglist: [],
      view_record: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  filters: {},

  methods: {
    showImage(url) {
      let current_img = "/image/" + url;
      this.$router.resolve(current_img);
      let routeData = this.$router.resolve({
        path: current_img
      });
      window.open(routeData.href, "_blank");
    },

    deleteImage(url) {
      const _this = this;
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/ImageDelete/" + url, {
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
      _this.$axios.get("/ImageListGet").then((res) => {
        _this.imglist = res.data.data.records;
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

.card {
  width: 23%;
  float: left;
  margin: 5px;
}

.single_img {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 180px;
}

.single_img > img {
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.filetitle {
  font-size: 13px;
  color: gray;
}
</style>