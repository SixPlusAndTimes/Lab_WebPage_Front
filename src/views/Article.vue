<template>
  <div>
    <editorElem
      @get:imglist="saveImglist"
      @get:article="saveUpdateArticle"
      :id="res_data.id"
      :content="res_data.content"
      :title="res_data.title"
      :created="res_data.created"
      :type="res_data.type"
      :status="res_data.status"
      :sorttime="res_data.sorttime"
    />
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件
import editorElem from "@/components/Editor";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    editorElem,
  },
  props: ["id"],
  data() {
    //这里存放数据
    return {
      now_id: 0,
      now_type: "",
      img_name_list: [],
      res_data: {
        id: 0,
        title: "",
        type: null,
        content: "",
        created: null,
        status: 0,
        sorttime: null,
      },
    };
  },
  //监听属性 类似于data概念 new Date("1998/02/03 20:00:00")
  computed: {},
  //监控数据变化
  watch: {},
  //方法集合
  methods: {
    saveImglist(img_name_list) {
      this.img_name_list = img_name_list;
    },
    saveUpdateArticle(data) {
      const _this = this;
      this.$axios
        .post("/ArticleEdit", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let compelete_data = res.data.data;

          _this.img_name_list.unshift(compelete_data.id + "");

          _this.$axios.post("/ImageSave", _this.img_name_list, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
          });
          _this.$alert("操作成功", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              _this.$router.push(
                "/admin/manage?type_name=" + compelete_data.type
              );
            },
          });
        })
    },
    test(data) {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (this.id != 0) {
      const _this = this;
      this.$axios.get("/ArticleGet/" + this.id).then((res) => {
        _this.res_data = res.data.data;
      });
    }
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
</style>