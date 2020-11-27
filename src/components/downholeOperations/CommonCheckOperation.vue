<template>
  <el-dialog
    title="查看"
    :visible.sync="checkOperVisible"
    width="50%"
    :before-close="checkOperClose"
  >
    <div class="checkOperDiv" :data="checkData">
      <el-steps
        :active="checkData.nodeSequence"
        class="checkOperDiv_top"
        align-center
      >
        <el-step
          title="上报"
          @click.native="submit()"
          :description="
            operAllNodeSource.submitTime +
            ' ' +
            operAllNodeSource.submitUserName
          "
        >
          <i class="step01" slot="icon"></i>
        </el-step>
        <el-step
          title="派工"
          @click.native="send()"
          :description="
            operAllNodeSource.sendTime + ' ' + operAllNodeSource.sendUserName
          "
        >
          <i class="step02" slot="icon"></i>
        </el-step>
        <el-step
          title="现场作业"
          @click.native="scene()"
          :description="
            operAllNodeSource.dispatchTime +
            ' ' +
            operAllNodeSource.dispatchUserName
          "
        >
          <i class="step03" slot="icon"></i>
        </el-step>
        <el-step
          title="效果评价"
          @click.native="effect()"
          :description="
            operAllNodeSource.measureTime +
            ' ' +
            operAllNodeSource.measureUserName
          "
        >
          <i class="step04" slot="icon"></i>
        </el-step>
      </el-steps>
      <div class="checkOperDiv_bottom">
        <div v-if="nodalPoint === 0" class="checkOperDiv_submit_table">
          <table
            class="Reporting"
            cellspacing="0"
            border="1"
            bordercolor="#bcc0bf"
          >
            <tr>
              <td class="Reporting_td">作业名称</td>
              <td class="Reporting_td">作业类型</td>
              <td class="Reporting_td">上报人</td>
              <td class="Reporting_td_time">上报时间</td>
              <td class="Reporting_td">备注</td>
              <td class="Reporting_td">
                附件<i class="el-icon-paperclip" style="font-size: 15px" />
              </td>
            </tr>
            <tr>
              <td class="Reporting_td">{{ checkData.operationName }}</td>
              <td class="Reporting_td">
                {{ checkData.operationType == 0 ? "常规检泵" : "技改井" }}
              </td>
              <td class="Reporting_td">{{ checkData.dealUserName }}</td>
              <td class="Reporting_td_time">{{ checkData.dealDate }}</td>
              <td class="Reporting_td_time">{{ checkData.remark }}</td>
              <td class="Reporting_td">
                <span
                  class="el-icon-bottom"
                  style="font-size: 15px; color: #2485e0"
                />
              </td>
            </tr>
          </table>
        </div>
        <div v-if="nodalPoint === 1" class="checkOperDiv_submit_table">
          <table class="work" cellspacing="0" border="1" bordercolor="#bcc0bf">
            <tr>
              <td colspan="4" class="Reporting_td">上次</td>
            </tr>
            <tr>
              <td class="Reporting_td">作业名称</td>
              <td class="Reporting_td">作业队伍</td>
              <td class="Reporting_td_time">作业时间</td>
              <td class="Reporting_td">距现在(天)</td>
            </tr>
            <tr>
              <td class="Reporting_td">{{ sendLastData.lastOperationName }}</td>
              <td class="Reporting_td">{{ sendLastData.lastTeamName }}</td>
              <td class="Reporting_td_time">
                {{ sendLastData.lastFinishDate }}
              </td>
              <td class="Reporting_td">{{ sendLastData.dateCount }}</td>
            </tr>
          </table>
          <table class="work" cellspacing="0" border="1" bordercolor="#bcc0bf">
            <tr>
              <td colspan="5" class="Reporting_td">本次</td>
            </tr>
            <tr>
              <td class="Reporting_td">作业名称</td>
              <td class="Reporting_td">作业队伍</td>
              <td class="Reporting_td">派工单编号</td>
              <td class="Reporting_td">备注</td>
              <td class="Reporting_td">
                附件<i class="el-icon-paperclip" style="font-size: 15px" />
              </td>
            </tr>
            <tr>
              <td class="Reporting_td">{{ sendNowData.lastOperationName }}</td>
              <td class="Reporting_td">{{ sendNowData.lastTeamName }}</td>
              <td class="Reporting_td">{{ sendNowData.formNum }}</td>
              <td class="Reporting_td">{{ sendNowData.remark }}</td>
              <td class="Reporting_td">
                <span
                  class="el-icon-bottom"
                  style="font-size: 15px; color: #2485e0"
                />
              </td>
            </tr>
          </table>
        </div>
        <div v-if="nodalPoint === 2" class="checkOperDiv_submit_table">
          <table class="tool" cellspacing="0" border="1" bordercolor="#bcc0bf">
            <tr>
              <td class="tool_td_left">上报次数</td>
              <td class="tool_td_right">
                <span
                  v-for="item in constructionData"
                  :key="item.conspId"
                  @click="constNum(item)"
                  class="tool_td_right_a"
                >
                  {{ item.rownum }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="tool_td_left">上报日期</td>
              <td class="tool_td_right">{{ constNumData.recordDate }}</td>
            </tr>
            <tr>
              <td class="tool_td_left">上报人</td>
              <td class="tool_td_right">{{ constNumData.recorder }}</td>
            </tr>
            <tr>
              <td class="tool_td_left">进度描述</td>
              <td class="tool_td_right">{{ constNumData.progressDesc }}</td>
            </tr>
            <tr>
              <td class="tool_td_left">现场照片</td>
              <td class="tool_td_right">
                <el-image
                  style="width: 45px; height: 45px; margin: 0.5% %"
                  :src="url"
                  :preview-src-list="srcList"
                >
                </el-image>
              </td>
            </tr>
            <tr>
              <td class="tool_td_left">
                附件<i class="el-icon-paperclip" style="font-size: 15px" />
              </td>
              <td class="tool_td_right"></td>
            </tr>
          </table>
        </div>
        <div v-if="nodalPoint === 3" class="checkOperDiv_submit_table">
          <table
            class="measure"
            cellspacing="0"
            border="1"
            bordercolor="#bcc0bf"
          >
            <tr>
              <td class="Reporting_td">评价结果</td>
              <td class="Reporting_td_time">评价日期</td>
              <td class="Reporting_td">评价结论</td>
            </tr>
            <tr>
              <td class="Reporting_td">
                {{
                  measureEffectData.evaluationResult == 0
                    ? "失败"
                    : measureEffectData.evaluationResult == 1
                    ? "正常"
                    : "较差"
                }}
              </td>
              <td class="Reporting_td_time">
                {{ measureEffectData.evaluationDate }}
              </td>
              <td class="Reporting_td">{{ measureEffectData.resultDesc }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <el-button type="info" @click="checkOperClose()" class="checkOperButton"
      >关闭</el-button
    >
  </el-dialog>
</template>

<script>
import template from "../../views/assessment/template.vue";
export default {
  components: { template },
  props: {
    checkOperVisible: {
      type: Boolean,
    },
    //各节点填报信息
    operAllNodeSource: {
      type: Object,
    },
    //当前作业信息
    checkData: {
      type: Object,
    },
    //当前节点
    nodalPoint: {
      type: Number,
    },
    //上次派工信息
    sendLastData: {
      type: Object,
    },
    //当前派工信息
    sendNowData: {
      type: Object,
    },
    //施工过程信息
    constructionData: {
      type: Array,
    },
    //某次施工信息
    constNumData: {
      type: Object,
    },
    //效果评价信息
    measureEffectData: {
      type: Object,
    },
  },
  created() {
    this.checkHistory();
  },
  data() {
    return {
      checkNode: this.checkData.nodeSequence,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
  methods: {
    // 对话框父子组件传值
    checkOperClose() {
      this.$emit("checkRowClose");
    },
    // 查看上报节点
    submit() {
      //如果当前节点处于上报节点或已完成上报，可以查看历史信息
      if (this.checkData.nodeSequence >= 0) {
        this.nodalPoint = 0;
        //调用节点信息
        this.checkHistory();
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看派工节点
    send() {
      if (this.checkData.nodeSequence >= 1) {
        this.nodalPoint = 1;
        //调用节点信息
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看现场作业节点
    scene() {
      if (this.checkData.nodeSequence >= 2) {
        this.nodalPoint = 2;
        //调用节点信息
        this.checkHistory();
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看效果评价节点
    effect() {
      if (this.checkData.nodeSequence >= 3) {
        this.nodalPoint = 3;
        //调用节点信息
        this.checkHistory();
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 获取某个节点历史信息
    checkHistory() {
      this.getRequest(
        "/operation/operationInfo/queryNodeSourceByNode?nodeSequence=" +
          this.nodalPoint +
          "&wellOperationId=" +
          this.checkData.wellOperationId
      ).then((resp) => {
        if (resp) {
          //操作人信息填充
          this.checkData.dealUserName = resp.data.dealUserName;
          this.checkData.dealDate = resp.data.dealDate;
        }
      });
    },
    //获取某次进度信息
    constNum(val) {
      this.constNumData = val;
    },
  },
};
</script>

<style lang="less" scoped>
.checkOperDiv {
  height: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_top {
  width: 98%;
  height: 28%;
  padding: 0 1%;
}
.checkOperDiv_bottom {
  width: 98%;
  height: 72%;
  padding: 2% 1%;
}
.checkOperDiv_submit_table {
  width: 100%;
  height: 86%;
  margin: 4% 2%;
}
.checkOperButton {
  margin: 2% 0 0 40%;
}

.Reporting {
  width: 100%;
  height: 100%;
}
.Reporting_td {
  width: 10%;
  height: 8%;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}
.Reporting_td_time {
  width: 22%;
  height: 8%;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}
.measure {
  width: 90%;
  height: 80%;
  margin: 5% 5%;
}
.tool {
  width: 90%;
  height: 100%;
  margin: 0 5%;
}
.tool_td_left {
  width: 5%;
  height: 15%;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}
.tool_td_right {
  width: 20%;
  height: 15%;
  font-size: 14px;
  font-weight: 600;
}
.tool_td_right_a {
  margin: 0 3%;
}
.work {
  width: 90%;
  height: 45%;
  margin: 4% 5% 0 5%;
}
</style>
<style>
.step01,
.step02,
.step03,
.step04 {
  width: 40%;
  height: 40%;
  background-size: 100% 100%;
}
.step01 {
  background-image: url("../../assets/images/reporte.png");
  width: 70%;
  height: 70%;
}
.step02 {
  background-image: url("../../assets/images/work.png");
  width: 70%;
  height: 70%;
}
.step03 {
  background-image: url("../../assets/images/tool.png");
  width: 70%;
  height: 70%;
}
.step04 {
  background-image: url("../../assets/images/evaluate.png");
  width: 70%;
  height: 70%;
}
.el-steps {
  width: 90%;
}
.el-step.is-horizontal .el-step__line {
  top: 50%;
  width: 95%;
}
.el-step__head.is-process {
  border-color: #dedede !important;
}
.el-step__head.is-finish {
  border-color: #2485e0 !important;
}
.el-step__title.is-process {
  color: #dedede !important;
}
.el-step__title.is-finish {
  color: #2485e0 !important;
}

.el-step__icon {
  width: 56px;
  height: 56px;
  /* background-color: #2485e0; */
}
.is-finish .step01 {
  background-image: url("../../assets/images/reporte_finish.png");
  width: 70%;
  height: 70%;
}
.is-finish .step02 {
  background-image: url("../../assets/images/work_finish.png");
  width: 70%;
  height: 70%;
}
.is-finish .step03 {
  background-image: url("../../assets/images/tool_finish.png");
  width: 70%;
  height: 70%;
}
.is-finish .step04 {
  background-image: url("../../assets/images/evaluate_finish.png");
  width: 70%;
  height: 70%;
}
</style>