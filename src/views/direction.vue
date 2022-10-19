<template>
    <div>
      <br/>
      <el-row :gutter="20" >
        <el-col :span="30">
          <div class="grid-content bg-purple">
            <el-card class="box-card-mid">
              <div slot="header" class="clearfix" >
                <!--<span style="font-weight: bold;">面向云定制的多企业网络化协同平台</span>-->
                <h2 style="font-weight: bold;">面向云定制的多企业网络化协同平台</h2>
              </div>

            <br>
              <div align="center">
                <img :src="wang_luo_xie_tong_1" width="800" height="450" align="center" />
              </div>
              <br>
              <div align="center">
                <img :src="wang_luo_xie_tong_2"  width="800" height="400" align="center"/>
              </div>

              <div >
                <p style="text-indent:2em">目前大规模多企业跨地域协作难的主要原因是缺乏合适的跨地域多企业网络化协同运行平台，上下游企业信息联动与反馈困难。团队设计了面向云定制的开放式协同平台架构，突破基于边缘PaaS的云边协同、基于可信计算的云边网络信息安全等关键技术，实现分布式智能产线协同共享及制造任务的分布式调度。</p>
              </div>
            </el-card>
         </div>
        </el-col>
      </el-row>
      <br/>

      <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card-mid">
            <div slot="header" class="clearfix" >
              <!--<span style="font-weight: bold;">多智能体强化学习驱动的自组织调度</span>-->
              <h2 style="font-weight: bold;">多智能体强化学习驱动的自组织调度</h2>
            </div>
            <br>
            <div align="center">
              <img :src="zi_zhu_zhi_1" width="800" height="600" align="center" />
            </div>
            <div >

            <p >  （1）装备智能体构建</p>
            <p style="text-indent:2em">在加工装备智能化的基础上，构建装备智能体。为物联制造车间中的每一台制造装备都配备了边缘接口，作为上层软件模块与制造装备之间的通讯桥梁。同时，由于不同厂商生产的数控系统存在异构性和封闭性，在物联制造车间加工过程中产生的大量生产数据不能顺利交互，建立了适配层软件模块，提供了与不同数控系统的数据交互统一接口，以实现对不同数控系统的运动控制、状态信息的监测和获取以及与制造车间其他设备交互等功能。</p>

            <p > （2）基于计算节点的多智能体组网</p>
            <p style="text-indent:2em">
              通过网络，个体与个体之间可以进行信息交互，以“自治+协商”的方式完成任务工件的加工。独立个体需要拥有感知、分析和控制自身运动的能力，项目改变以往将智能体服务程序全部放在车间服务端的做法，通过嵌入式改造，为设备加装微处理器和统一的网络接口，形成智能体计算节点。该模式下设备接入网络后便可自主运作而不必对服务器做过多配置，完全达到即插即用的设计理念。
            </p>
              <p > （3）自组织生产技术</p>
              <p style="text-indent:2em">
                在离散车间设备具有一定自动化程度和对外通讯接口的基础上，采用有线加无线的形式构建本地物联制造网络。以RFID读写器为感知节点，得到订单状态，若需要进行下一步工序加工，则发布相应任务。此时,产线上能够进行加工的生产单元会进行回应，若回应的生产单元有多个，则选择较好的加工单元，同时触发物流执行系统搬运工件至指定设备完成加工。
              </p>
              <p > （4）自学习调度技术</p>
              <p style="text-indent:2em">
                调度智能体根据观测到制造系统的部分状态经过调度策略网络的处理后，得到调度动作。并利用制造值网络评估调度动作时，不仅输入调度智能体自己的状态-动作集，还输入其他调度智能体的状态-动作集，维持环境的稳定。调度智能体根据自己观测到的制造系统环境状态做出决策，并结合其他调度智能体与环境的交互数据进行学习，获取全局最优的调度效果，显著地提升制造系统运行的效率与稳定性。
              </p>


            </div>
          </el-card>
      </div>
      </el-col>
    </el-row>

    <br/>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card-mid">
            <div slot="header" class="clearfix" >
              <!--<span style="font-weight: bold;">数字孪生</span>-->
              <h2>数字孪生</h2>
            </div>

            <div align="center">
              <img :src="shu_zi_luan_sheng" width="800" height="600" align="center" />
            </div>

            <div >
              <p style="text-indent:2em">团队基于信息—物理深度融合技术，打造南航无锡研究院物联制造车间可视化智能管控平台。团队采用工厂三维快速建模引擎（3dME），在航空制造领域打造了工业互联网标杆（中国商飞5G全连接智能工厂），在汽车制造领域打造了工业互联网标杆（奇瑞集团设备集成平台），在发动机制造领域打造了工业互联网标杆（潍柴集团WGH产线数字孪生平台）。团队将深入融合5G与AI技术，打造“虚实融合”及“双向映射”为一体的工业互联网数字孪生平台，赋能工业制造转型升级和全面发展。</p>

            </div>
          </el-card>
      </div>
      </el-col>
    </el-row>
      <br/>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-card class="box-card-mid">
              <div slot="header" class="clearfix" >
                <!--<span style="font-weight: bold;">工业大数据与增强现实</span>-->
                <h2 >工业大数据与增强现实</h2>
              </div>

              <div align="center">
                <img :src="ar1" width="800" height="600" align="center" />
              </div>
              <p style="text-indent:2em">  团队长期从事AR人机协作相关研究，主要研究基础如下：</p>
              <p style="text-indent:2em">(1) AR辅助人员查看设备状态：AR巡查设备工况主要是工人佩戴Hololens头盔，巡逻整个物联制造车间，当需要查看。机器设备的工作状态时，点击设备信息图标，然后点击开始匹配按钮，Hololens头盔通过获取场景图像，上传至云端分析识别，并返回匹配结果，最后调取物联系统机器设备的数据库，可视化地显示在人员的视野中为巡视和检查设备提供了便利。</p>
              <p style="text-indent:2em">(2) AR辅助故障诊断与分析：设备发生故障时，系统通过采集设备传感器的数据，通过机器学习和模拟仿真快速定点出故障可能发生的位置，可视化地协助人员发现故障的来源。诊断系统基于历史维护的记录会建立设备故障维护的知识库，根据诊断出的故障来源，匹配出故障对应的解决方案。</p>
              <p style="text-indent:2em">(3) AR辅助人员执行任务：AR辅助操作主要发生在人员执行任务的时候，当工作人员确定了要执行的任务内容后，Hololens头盔会调出任务的工作流模型，连接相关的数据库，同步工作人员的操作进度，一步步地实时指导人员进行手动操作。同时，AR系统也存储着物联车间的技术资料，方便工作人员在操作时随时查阅。</p>
              <p style="text-indent:2em">(4) AR远程专家系统：远程专家系统主要发生在当前任务的难度超出工作人员的技能能力，而无法顺利被执行完成的情景下。AR系统通过WebRTC协议在局域网内构建与远程专家的视频通话，在远程专家的指导下，一步步排查问题所在。专家在找到问题之后，通过标注的形式告知工作人员，以协助人员继续操作。</p>



            </el-card>
          </div>
        </el-col>
      </el-row>

    </div>
  </template>

  <script>
import wang_luo_xie_tong_1 from '@/assets/directions/wangluoxietong1.png'
 import wang_luo_xie_tong_2 from '@/assets/directions/wangluoxietong2.png'
 import zi_zhu_zhi_1 from '@/assets/directions/zizuzhi1.png'
 import shu_zi_luan_sheng from '@/assets/directions/shuziluansheng1.png'
 import ar1 from '@/assets/directions/ar1.png'


export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      wang_luo_xie_tong_1,
      wang_luo_xie_tong_2,
      zi_zhu_zhi_1,
      shu_zi_luan_sheng,
      ar1
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
}
  </script>

  <style scoped>

  </style>
