<template>
  <div>
    <el-row>
      <el-col
        :span="10"
        :offset="1"
        v-for="(item, index) in researchers"
        :key="index"
        class="card_info"
      >
        <el-card shadow="hover" class="box-card" body-style="padding: '10px';">
          <div slot="header" class="clearfix">
            <h3>{{ item.title }}</h3>
          </div>
          <div class="head_img">
            <img v-show="head_imgs[index]" :src="head_imgs[index]" alt="导师头像" />
          </div>
          <div class="bottom clearfix">
            <span>{{ filterHtml(item.content) }}…</span>
            <span>
              <el-button style="padding: 5px 10px; font-size:16px" type="text">
                <router-link :to="'/view?id=' + item.id">更多</router-link>
              </el-button>
            </span>
          </div>
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
      researchers: [],
      head_imgs: [],
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const _this = this;
    _this.$axios.get("/Index/researcher/1000").then((res) => {
      _this.researchers = res.data.data;
      _this.get_imglist();
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
</style>