<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="white"
    text-color="#000"
  >
    <el-menu-item index="1" @click.native="push('/')">首页</el-menu-item>
    <el-menu-item index="3" @click.native="push('/our_team')">研究团队</el-menu-item>
    <el-menu-item index="4" @click.native="push('/news')">新闻动态</el-menu-item>
    <el-menu-item index="5" @click.native="push('/research')">科学研究</el-menu-item>
    <el-menu-item index="6" @click.native="push('/board')">公告栏</el-menu-item>

    <el-menu-item index="7" @click.native="push('/issue')">技术咨询</el-menu-item>

    <el-menu-item
      v-for="(item, index) in pages"
      :key="index"
      :index="(index + 8).toString()"
      @click.native="push('/webpage?id=' + item.id)"
    >{{item.title}}</el-menu-item>


  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      pages: []
    };
  },

  methods: {
    push: function (url) {
      this.$router.push(url);
    },
    init() {
      const _this = this;
      _this.$axios
        .get("/Index/webpage/1000")
        .then((res) => {
          _this.pages = res.data.data;
        });
    },
  },
  mounted(){
    this.init();
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  color: #006cff;
}
</style>