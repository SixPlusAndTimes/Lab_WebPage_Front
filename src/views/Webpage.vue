<template>
  <div>
    <el-row>
      <div style="margin: 10px;"></div>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="24" class="back">
        <h2 class="art_title">{{ res_data.title }}</h2>
        <div class="art_time">
          <span>{{ res_data.created | format_time }}</span>
        </div>
        <div class="art_content" v-html="res_data.content"></div>
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
      res_data: {
        id: 0,
        title: "",
        type: null,
        content: "",
        created: null,
        status: 0,
      },
    };
  },
  props: ["id"],
  //监听属性 类似于data概念
  filters: {
    format_time(str) {
      let current_datetime = new Date(str);
      return (
        "时间：" +
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
    format_type(name) {
      let types_dict = {
        researcher: "研究人员",
        research: "科学研究",
        news: "新闻",
        board: "公告",
        webpage: "页面专栏",
      };
      return types_dict[name];
    },
  },
  //监控数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const _this = this;
    this.$axios.get("/ArticleGet/" + _this.id).then((res) => {
      _this.res_data = res.data.data;
      document.title = _this.res_data.title;
    });
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
.art_title {
  text-align: center;
  /* font-size: 30px; */
}
.art_time {
  color: #909090;
  font-size: 13px;
  text-align: center;
}
.back {
  background-color: #fff;
  padding: 20px 40px 10px 40px;
  /* #ffffff */
}
.art_content {
  padding: 20px 100px 100px 100px;
}
</style>