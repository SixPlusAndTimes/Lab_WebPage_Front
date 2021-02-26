<!--  -->
<template>
  <div class="page">
    <div class="column">
      <h3>Page Not Found</h3>
      <h3>找不到该页面</h3>

      <p>We couldn't find the page you were looking for.</p>
      <p>我们找不到你正在寻找的页面。</p>
      <p>
        You can return to our homepage by clicking
        <router-link to="/">here</router-link>.
      </p>
      <p>你可以返回<router-link to="/">首页 </router-link></p>
    </div>
    <div class="column">
      <img src="/Lissajous.gif" alt="" />
    </div>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.page {
  margin: 20px 0 20px 0;
  background-color: white;
  padding: 100px;
  height: 500px;
}
.column {
  float: left;
  margin-left: 60px;
}
</style>