<template>
  <el-row>
    <el-row>
      <el-col :span="24">
        <el-input v-model="trans_data.title" placeholder="标题不应为空"></el-input>
      </el-col>
      <el-col :span="24">
        <div style="margin-top:20px;"></div>
      </el-col>

      <el-col :span="24" class="editor_theme">
        <div ref="editorForm" style="text-align:left"></div>
      </el-col>

      <el-col :span="24">
        <div style="margin-top:10px;"></div>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <span>封面图片</span>
          </div>

          <div style="position:relative;">
            <div>
              <i v-show="!cover_img && cover_img.length == 0" class="el-icon-picture-outline"></i>
              <span v-show="!cover_img && cover_img.length == 0" class="img_tips">封面图片为文章第一张图片</span>

              <img class="cover_img" :key="cover_img" v-bind:src="cover_img" />
            </div>

            <el-tooltip
              v-show="cover_img && cover_img.length != 0"
              class="item"
              effect="dark"
              content="清除"
              placement="top"
            >
              <el-button
                style="position:absolute;left:10px;top:10px; margin:20px 10px 10px 10px;"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteCover"
              ></el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <span>发表时间</span>
          </div>
          <el-date-picker
            style="margin:20px 20px 20px 0;"
            v-model="trans_data.created"
            type="datetime"
            placeholder="选择日期时间"
            align="left"
          ></el-date-picker>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <span>类型</span>
          </div>
          <el-select style="margin:20px 20px 20px 0;" v-model="trans_data.type" placeholder="请选择">
            <el-option
              v-for="item in type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <span>完成</span>
          </div>

          <el-button
            style="padding:20px;margin:12px;"
            type="primary"
            size="medium"
            @click="transfer"
          >
            <i class="el-icon-document-add"></i>
            提交
          </el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <div style="margin-top:20px;"></div>
    </el-row>

    <el-row>
      <div style="margin-top:20px;"></div>
    </el-row>

    <el-row></el-row>
  </el-row>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editorElem",
  data() {
    return {
      editor: null,
      img_list: [],
      cover_img: "",
      trans_data: {
        id: this.id,
        title: this.title,
        type: this.type,
        content: this.content,
        created: this.created,
        status: this.status,
        sorttime: this.sorttime,
      },
      type_options: [
        {
          label: "新闻",
          value: "news",
        },
        {
          label: "研究人员",
          value: "researcher",
        },
        {
          label: "研究",
          value: "research",
        },
        {
          label: "公告栏",
          value: "board",
        },
        {
          label: "网站页面",
          value: "webpage",
        },
        {
          label: "技术咨询",
          value: "issue",
        },
      ],
    };
  },
  props: ["id", "content", "title", "created", "type", "status", "sorttime"],
  computed: {
    img_list_length() {
      return this.img_list.length;
    },
    get_props() {
      return {
        id: this.id,
        title: this.title,
        type: this.type,
        content: this.content,
        created: this.created,
        status: this.status,
        sorttime: this.sorttime,
      };
    },
  },
  watch: {
    //  单向数据流 content 改变则更新
    content() {
      this.trans_data = this.get_props;
      this.editor.txt.html(this.content);
      this.get_imglist();
    },
    img_list_length() {
      if (this.img_list.length != 0)
        this.cover_img = "/image/" + this.img_list[0];
    },
  },
  methods: {
    deleteCover() {
      let rgx = /<img.*?src=".*?".*?\/?>/i;
      let str = this.editor.txt.html().replace(rgx, "");
      this.editor.txt.html(str);
      this.cover_img = "";
    },
    get_imglist: function () {
      let rgx = /<img.*?src="(.*?)".*?\/?>/gi;
      let url_reg = /image\/(\d*\.[a-zA-Z]*)/i;
      let str = this.editor.txt.html();
      let results = Array.from(str.matchAll(rgx));
      let img_list_tmp = [];
      for (let i of results) {
        let tmp = i[1].match(url_reg);
        img_list_tmp.push(tmp[1]);
      }
      this.img_list = img_list_tmp;
      if (this.img_list.length != 0)
        this.cover_img = "/image/" + this.img_list[0];
    },
    transfer() {
      if (this.trans_data.title.length >= 1) {
        this.trans_data.content = this.editor.txt.html();
        this.get_imglist();
        this.$emit("get:article", this.trans_data);
        this.$emit("get:imglist", this.img_list);
      } else {
        this.$message.error("标题不应为空");
      }
    },
  },
  mounted() {
    this.editor = new E(this.$refs.editorForm);
    this.editor.customConfig.debug = true;
    this.editor.customConfig.uploadImgHeaders = {
      Authorization: localStorage.getItem("token"),
    };
    this.editor.customConfig.uploadImgServer = "/ImageUpload";

    const _this = this;
    this.editor.customConfig.uploadImgHooks = {
      success: function () {
        _this.get_imglist();
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        _this.$message({
          type: "warning",
          message: result.data,
        });
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function () {
        _this.$message({
          type: "warning",
          message: "未知错误",
        });
      },
      timeout: function () {
        _this.$message({
          type: "warning",
          message: "超时",
        });
      },
    };

    this.editor.customConfig.showLinkImg = false;
    this.editor.customConfig.uploadImgMaxLength = 5;
    this.editor.customConfig.zIndex = 0;
    this.editor.create();

    if (this.trans_data.created == null) {
      this.trans_data.created = new Date();
    }
    if (this.trans_data.type == null) {
      this.trans_data.type = "news";
    }
  },
};
</script>

<style scoped>
.editor_theme {
  background-color: #ffffff;
}

.cover_img {
  max-width: 100%;
}

.cover_img img {
  max-width: 100%;
  max-height: auto;
  display: block;
  margin: auto;
}
.img_tips {
  font-size: 13px;
  color: gray;
}
</style>
