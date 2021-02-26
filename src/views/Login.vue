<template>
  <div style="margin:0 auto;width:30%">
      <el-form ref="loginForm" :model="account" :rules="rules" >
        <h3 class="login-title">账号登录</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="account.username"
            placeholder="用户名或邮箱"
            prefix-icon="el-icon-user-solid"
          />

        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="account.password"
            placeholder="密码"
            show-password
            prefix-icon="el-icon-s-goods"
          />
        </el-form-item>

        <el-form-item>
          <div style="width:20%; float:left">
            <el-button type="primary" size="medium" @click="submitForm('loginForm')">登录</el-button>
          </div>
          <div style="float:left">
            <el-button type="plain" size="medium" @click="resetForm('loginForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
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
      account: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },

          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post("/SettingServiceLogin", _this.account).then((res) => {
            // console.log(res.data);
            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;

            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt);
            _this.$store.commit("SET_USERINFO", userInfo);

            // 获取
            console.log(_this.$store.getters.getUser);
            _this.$router.push("/admin");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    
    },
    resetFor(formName) {
      this.$refs[formName].resetFields();
    },
  },

  //监听属性 类似于data概念
  computed: {},
  //监控数据变化
  watch: {},

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
</style>