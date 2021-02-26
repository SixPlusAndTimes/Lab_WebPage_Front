<template>
  <div id="app">
    <el-container>
      <!-- <el-header>
        <el-row :gutter="20"></el-row>
      </el-header> -->

      <el-main>
        <el-row :gutter="20">
          <el-col :span="span_body" :offset="offset_body">
            <h1 class="title">徐州大学计算机网络与人工智能研究室</h1>
          </el-col>
          <el-col :span="span_body" :offset="offset_body">
            <NavMenu></NavMenu>
          </el-col>

          <el-col :span="span_body" :offset="offset_body">
            <router-view :key="$route.fullPath"></router-view>
          </el-col>
        </el-row>
      </el-main>

      <el-footer>
        <el-row>
          <el-col :span="span_body" :offset="offset_body">
            <el-row :gutter="2">
              <el-col :span="10" :offset="10" class="annotate">苏公网安备 110402430053 号</el-col>
              <el-col :span="10" :offset="2" class="annotate">版权所有 © 徐州大学江苏智能工控重点实验室</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu.vue";

export default {
  name: "app",
  data() {
    //这里存放数据
    return {
      span_body: 22,
      offset_body: 1,
    };
  },
  components: {
    NavMenu,
  },
};
</script>

<style  scoped>
.title {
  font-size: 30px;
}

.annotate {
  color: grey;
  font-size: 13px;
  margin: 10px auto;
}

#app {
  background-color: #f6f6f6;
}

.front {
  background-color: #fff;
  padding-bottom: 50px;
}
</style>
