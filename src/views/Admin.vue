<!-- 管理页面 -->
<template>
  <div>
    <el-row>
      <div style="margin-top:10px"></div>
      <el-tag type="success">上次登录：{{format_time(this.$store.getters.getUser.lastlogin)}}</el-tag>
      <div style="margin-top:10px"></div>
    </el-row>
    <el-row :gutter="100">
      <el-col :span="4">
        <el-menu class="el-menu-vertical-demo" :default-active="activeIndex">
          <el-menu-item index="0" @click="$router.push('/admin/article?id=0')">
            <i class="el-icon-document-add"></i>
            <span slot="title">新建文章</span>
          </el-menu-item>
          <el-menu-item index="1" @click="$router.push('/admin/image_manage')">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">图库</span>
          </el-menu-item>
          <el-menu-item index="2" @click="push('webpage')">
            <i class="el-icon-document"></i>
            <span slot="title">网站页面</span>
          </el-menu-item>
          <el-menu-item index="3" @click="push('news')">
            <i class="el-icon-news"></i>
            <span slot="title">新闻</span>
          </el-menu-item>

          <el-menu-item index="4" @click="push('board')">
            <i class="el-icon-data-board"></i>
            <span slot="title">公告</span>
          </el-menu-item>
          <el-menu-item index="5" @click="push('research')">
            <i class="el-icon-search"></i>
            <span slot="title">科学研究</span>
          </el-menu-item>
          <el-menu-item index="6" @click="push('issue')">
            <i class="el-icon-s-promotion"></i>
            <span slot="title"></span>
        技术咨询
          </el-menu-item>
          <el-menu-item index="7" @click="push('researcher')">
            <i class="el-icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>

          <el-menu-item index="8" @click="logout()">
            <i class="el-icon-close"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" :offset="0">
        <!-- $route.fullPath -->
        <router-view :key="date_output()"></router-view>
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
    return {
      activeIndex: "1",
      isCollapse: true,
      handleSelect: "1",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  methods: {
    date_output() {
      return this.format_time(new Date().toString());
    },
    push: function (type_name) {
      this.$router.push("/admin/manage?type_name=" + type_name);
    },
    logout() {
      const _this = this;
      _this.$axios
        .get("/SettingServiceLogout", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          _this.$store.commit("REMOVE_INFO");
          this.hasLogin = false;
          _this.$router.push("/login");
        });
    },
    format_time(str) {
      let current_datetime = new Date(str);
      return (
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

  },
  mounted(){
    if( this.$store.getters.getUser == null || this.$store.getters.getUser.lastlogin == null){
      this.$router.push("/login");
    }
  },
  created() {},
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
a {
  text-decoration: none;
}
</style>