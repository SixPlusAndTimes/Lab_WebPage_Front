<template>
  <div>
    <el-row>
      <div style="margin: 10px;"></div>
    </el-row>
    <el-row>

      <el-card className="box-card" shadow="always">
        <div slot="header" className="clearfix" style="height: 15px">
          <h2>教师</h2>
        </div>
        <el-row :gutter="100">

          <el-col :span="12" align="middle">
            <img :src="teacherTangDunBing" width="190" height="240"  >
            <br>
            <el-link type="primary" style="text-align: center" href="http://cmee.nuaa.edu.cn/2019/1126/c11684a189146/page.htm">唐敦兵 教授</el-link>
          </el-col>

          <el-col :span="12" align="middle">
            <img :src="teacherZhuHaiHua" width="190" height="240"/>
            <br>
            <el-link type="primary" style="text-align: center" href="http://faculty.nuaa.edu.cn/zhh2/en/index/61326/list/">朱海华 副教授</el-link>
          </el-col>


        </el-row>

      </el-card>

    </el-row>
  </div>
</template>

<script>

import teacherZhuHaiHua from '@/assets/taechersImg/zhu_hai_hua.png'
import teacherTangDunBing from '@/assets/taechersImg/tang_dun_bing.png'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      teacherTangDunBing,
      teacherZhuHaiHua
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  methods: {

    // page(currentPage = "1") {
    //   const _this = this;
    //   _this.$axios
    //       .get("/ArticleList?currentPage=" + currentPage + "&typeName=board")
    //       .then((res) => {
    //         // console.log(res);
    //         _this.articles = res.data.data.records;
    //         // _this.articles = this.format_data(res.data.data.records);
    //         _this.currentPage = res.data.data.current;
    //         _this.total = res.data.data.total;
    //         _this.pageSize = res.data.data.size;
    //       });
    // },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.page(1);
  },
  beforeCreate() {
  }, //生命周期 - 创建之前
  beforeMount() {
  }, //生命周期 - 挂载之前
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>


a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.box-card {
  width: 100%;
  padding: 0px;
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
</style>
