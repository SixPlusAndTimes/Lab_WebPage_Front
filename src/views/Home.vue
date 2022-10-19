<template>
  <div>
    <el-row> </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card-mid">
            <div slot="header" class="clearfix">
              <h2 style="font-weight: bold;">团队简介</h2>
            </div>
            <div >
              <p style="text-indent:2em">团队在国家重点研发计划、国家自然科学基金（重点、面上）、江苏省杰出青年基金、霍英东青年教师基金、新世纪优秀人才计划、国家万人计划（科技创新领军人才）等资助下，在智能制造系统研究领域已获得了较好的研究成果，特别是申请人提出的基于神经-体液调节机制的类生物化智能制造系统得到了国际同行广泛认可。申请人在智能制造系统领域已发表100多篇学术论文，其中60多篇SCI论文发表在制造工程领域的国际权威刊物上，如：International Journal of Production Research, International Journal of Computer Integrated Manufacturing, International Journal of Advanced Manufacturing Technology, Computers in Industry, Journal of Intelligent Manufacturing, Robotics & Computer Integrated Manufacturing等，他引600多次。
            团队近年在智能制造系统领域已取得的部分典型研究工作成绩如下：</p>
            <p style = "text-indent:2em">  （1）	团队负责人作为通讯作者在Robotics & Computer Integrated Manufacturing发表的论文“Energy-efficient scheduling for a flexible flow shop using an improved genetic-simulated annealing algorithm”被评为该期刊2015-2019年的最佳论文。</p>
              <div align="center">
                <img :src="best_paper" width="400" height="300" align="center" />
              </div>
              <p style = "text-indent:2em"> （2）	团队负责人在智能制造系统领域的部分研究成果已出版多专著。 </p>
              <div align="center">
                <img :src="zhuanzhu" width="600" height="380" align="center" />
              </div>
             <p style = "text-indent:2em"> （3）	在国际会议CIRP DET 2016中，申请人围绕所撰写的论文“Using Autonomous Intelligence to Build a Smart Shop Floor ”被评为最佳论文。 </p>
             <p style = "text-indent:2em"> （4）  团队负责人的研究成果应用于汽车装配领域，成果获国家科技进步二等奖1项(2011年，排名3)和“十二五”机械工业优秀科技成果奖1项(2016年，排名1) 。 </p>
             <p style = "text-indent:2em"> （5）	团队负责人2020-2021连续两年被评为“爱思唯尔中国高被引学者”（2022年未出）。 </p>
              <div align="center">
                <img :src="ai_si_wei_er_gao_bei_ying_xuezhe" width="600" height="230" align="center" />
              </div>
             <p style = "text-indent:2em"> 目组目前已建设了一套可实现工业应用的物联制造系统平台，包括两台西门子数控车床、两台发那科数控铣床、两台台湾宝源数控雕刻机，两台AGV、两套自动化立体仓库，这为团队项目的顺利进行提供了良好的软硬件平台条件。 </p>

              <div align="center">
                <img :src="shiyanpingtai1" width="600" height="400" align="center" />
              </div>
              <br>
              <div align="center">
                <img :src="shiyanpingtai2" width="600" height="400" align="center" />
              </div>

            </div>
          </el-card>
       </div></el-col>

    </el-row>

  </div>
</template>

<script>
import best_paper from '@/assets/HomePage/2019_best_paper.png'
import shiyanpingtai1 from '@/assets/HomePage/shiyanpingtai1.jpg'
import shiyanpingtai2 from '@/assets/HomePage/shiyanpingtai2.jpg'
import ai_si_wei_er_gao_bei_ying_xuezhe from '@/assets/HomePage/ai_si_wei_er_gao_bei_ying_xuezhe.png'
import zhuanzhu from '@/assets/HomePage/zhuanzhu.png'
export default {
  name: "Home",
  data() {
    return {
      best_paper,
      shiyanpingtai1,
      shiyanpingtai2,
      ai_si_wei_er_gao_bei_ying_xuezhe,
      zhuanzhu,
      researchers: [],
      board: [],
      news: [],
      research: [],
      research_heads: [],
      news_heads: [],
    };
  },
  filters: {
    filterHtml(val) {
      let length = 80;
      let text = val.replace(/<[^>]*>/g);
      text = text.replace(/undefined/g, "");
      if (text.length < length) return text;
      else return text.substr(0, length);
    },
    format_time(str) {
      let current_datetime = new Date(str);
      return (
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
  },
  methods: {
    get_imglist: function (items) {
      let rgx = /<img.*?src="(.*?)".*?\/?>/gi;
      let url_reg = /image\/(\d*\.[a-zA-Z]*)/i;
      let head_list = [];
      for (let item of items) {
        let str = item.content;
        let results = str.match(rgx);
        if (results != null && typeof results != "undefined") {
          let tmp = results[0].match(url_reg);
          head_list.push(tmp[0]);
        }
      }
      return head_list;
    },
    push_view(id) {
      this.$router.push("/view?id=" + id);
    },
    getHomeArticles(type, limit) {
      return this.$axios.get("/Index/" + type + "/" + limit);
    },
    filterHtml(val, length = 80) {
      let text = val.replace(/<[^>]*>/g);
      text = text.replace(/undefined/g, "");
      if (text.length < length) return text;
      else return text.substr(0, length);
    },
  },
  mounted() {
    this.getHomeArticles("researcher", "5").then((res) => {
      this.researchers = res.data.data;
    });
    this.getHomeArticles("board", "7").then((res) => {
      this.board = res.data.data;
    });
    this.getHomeArticles("news", "5").then((res) => {
      this.news = res.data.data;
      this.news_heads = this.get_imglist(this.news);
    });
    this.getHomeArticles("research", "3").then((res) => {
      this.research = res.data.data;
      this.research_heads = this.get_imglist(this.research);
      console.log(this.research_heads);
    });
  },
  components: {
    // HelloWorld,
  },
};
</script>

<style scoped>
/*.clearfix:before,*/
/*.clearfix:after {*/
/*  display: table;*/
/*  content: "";*/
/*}*/
/*.clearfix:after {*/
/*  clear: both;*/
/*}*/

/*a {*/
/*  text-decoration: none;*/
/*  color: aliceblue;*/
/*}*/
/*a:hover {*/
/*  text-decoration: underline;*/
/*  color: #99a9bf;*/
/*}*/

/*!* .el-carousel__item h3 {*/
/*  color: #475669;*/
/*  font-size: 14px;*/
/*  opacity: 0.75;*/
/*  line-height: 200px;*/
/*  margin: 0;*/
/*} *!*/

/*.carousel_view {*/
/*  overflow: hidden;*/
/*  position: relative;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/
/*.carousel_view > .news_img {*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: auto;*/
/*  top: 0%;*/
/*  left: 0%;*/
/*  z-index: 1;*/
/*  !* transform: translate(-50%, -50%); *!*/
/*}*/

/*.news_title {*/
/*  background-color: black;*/
/*  opacity: 60%;*/
/*  padding: 10px;*/
/*  color: aliceblue !important;*/
/*  position: absolute;*/
/*  bottom: 10%;*/
/*  left: 2%;*/
/*  z-index: 100;*/
/*}*/

/*.el-carousel__item:nth-child(2n) {*/
/*  background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n + 1) {*/
/*  background-color: #d3dce6;*/
/*}*/
/*li {*/
/*  list-style: none;*/
/*  margin: 5px;*/
/*}*/
/*.researcher_name {*/
/*  color: #565a69;*/
/*  font-size: 16px;*/
/*  font-weight: bold;*/
/*  padding-right: 15px;*/
/*}*/
/*.researcher_brief {*/
/*  font-size: 14px;*/
/*  line-height: 150%;*/
/*  color: #99a9bf;*/
/*}*/

/*.board_style {*/
/*  font-size: 16px;*/
/*  line-height: 180%;*/
/*  color: #565a69;*/
/*}*/

/*.head_img {*/
/*  overflow: hidden;*/
/*  position: relative;*/
/*  width: 320px;*/
/*  height: 180px;*/
/*  float: left;*/
/*  margin: 8px;*/
/*}*/

/*.head_img > img {*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: auto;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  transform: translate(-50%, -50%);*/
/*  z-index: 1;*/
/*}*/

/*.time {*/
/*  font-size: 13px;*/
/*  color: #d3dce6;*/
/*}*/

/*.button {*/
/*  margin: 0px 5px 0px 10px;*/
/*}*/

/*.back_img {*/
/*  background-color: aliceblue;*/
/*  width: 320px;*/
/*  height: 180px;*/
/*}*/

/* .el-row {*/
/*   margin-bottom: 20px;*/
/*&:last-child {*/
/*   margin-bottom: 0;*/
/* }*/
/*}*/
/*.el-col {*/
/*  border-radius: 4px;*/
/*}*/
/*.bg-purple-dark {*/
/*  background: #99a9bf;*/
/*}*/
/*.bg-purple {*/
/*  background: #d3dce6;*/
/*}*/
/*.bg-purple-light {*/
/*  background: #e5e9f2;*/
/*}*/
/*.grid-content {*/
/*  border-radius: 4px;*/
/*  min-height: 36px;*/
/*}*/
/*.row-bg {*/
/*  padding: 10px 0;*/
/*  background-color: #f9fafc;*/
/*}*/


/* !*研究室简介样式*!*/
/* .text {*/
/*   font-size: 14px;*/
/* }*/

/*.item {*/
/*  margin-bottom: 18px;*/
/*}*/

/*.clearfix:before,*/
/*.clearfix:after {*/
/*  display: table;*/
/*  content: "";*/
/*}*/
/*.clearfix:after {*/
/*  clear: both*/
/*}*/

/*!*.box-card-left {*!*/
/*!*  width: 260px;*!*/
/*!*}*!*/

/*!*.box-card-mid {*!*/
/*!*  width: 530px;*!*/
/*!*}*!*/
</style>
