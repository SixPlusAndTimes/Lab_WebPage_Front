<template>
  <div>

    <el-row :gutter="20">
      <el-row></el-row>
      <el-col :span="6">
          <el-row class="tac">
            <el-col :span="24">
              <!--<h5>智能制造实验室</h5>-->
              <el-menu
                  :default-active="this.$route.path"
                  router="true"
                  class="el-menu-vertical-demo"
                  >
  
                <!-- <el-submenu index="/our_team/lab_team">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>研究团队</span>
                  </template> -->
                  <el-menu-item-group >
                    <el-menu-item index="/our_team/lab_team_teachers" @click.native="push('/our_team/lab_team_teachers')">教师</el-menu-item>
                    <el-menu-item index="/our_team/lab_team_coresearchers" @click.native="push('/our_team/lab_team_coresearchers')">博士生</el-menu-item>
                    <el-menu-item index="/our_team/lab_team_graduate_students" @click.native="push('/our_team/lab_team_graduate_students')">研究生</el-menu-item>
                  </el-menu-item-group>
                <!-- </el-submenu> -->
              </el-menu>
            </el-col>
          </el-row>

      </el-col>

      <el-col :span="18">
          <router-view></router-view>
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
      routeCur : this.$router.path,
      submenuDefautlOpeneds : routeCur.substr(0,routeCur.lastIndexOf("_")),
      researchers: [],
      head_imgs: [],
      isCollapse: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  methods: {
    get_imglist: function () {
      let rgx = /<img.*?src="(.*?)".*?\/?>/gi;
      let url_reg = /image\/(\d*\.[a-zA-Z]*)/i;

      for (let item of this.researchers) {
        let str = item.content;
        let results = str.match(rgx);
        if (results != null && typeof results != "undefined") {
          // console.log(results[0]);
          let tmp = results[0].match(url_reg);
          this.head_imgs.push(tmp[0]);
        }
      }
    },
    filterHtml(val, length = 150) {
      let text = val.replace(/<[^>]*>/g);
      text = text.replace(/undefined/g, "");
      if (text.length < length) return text;
      else return text.substr(0, length);
    },
    push: function (url) {
      this.$router.push(url);
    },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.path)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  // mounted() {
  //   const _this = this;
  //   _this.$axios.get("/Index/researcher/1000").then((res) => {
  //     _this.researchers = res.data.data;
  //     _this.get_imglist();
  //   });
  // },
  // beforeCreate() {}, //生命周期 - 创建之前
  // beforeMount() {}, //生命周期 - 挂载之前
  // beforeUpdate() {}, //生命周期 - 更新之前
  // updated() {}, //生命周期 - 更新之后
  // beforeDestroy() {}, //生命周期 - 销毁之前
  // destroyed() {}, //生命周期 - 销毁完成
  // activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.card_info {
  margin-top: 20px;
}

.head_img {
  overflow: hidden;
  position: relative;
  width: 120px;
  height: 120px;
  float: left;
  margin: 8px;
}

.head_img > img {
  position: absolute;
  width: 120px;
  height: auto;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -20%); */
}

a,
a:visited {
  text-decoration: none;
  color: #409eff;
}

/*布局*/
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
  background: #ffffff;
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
