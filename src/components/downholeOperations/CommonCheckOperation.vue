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
        finish-status="success"
        class="checkOperDiv_top"
        align-center
      >
        <el-step
          title="上报"
          @click.native="submit()"
          :description="operAllNodeSource.submitTime + ' ' + operAllNodeSource.submitUserName"
        />
        <el-step
          title="派工"
          @click.native="send()"
          :description="operAllNodeSource.sendTime + ' ' +operAllNodeSource.sendUserName"
        />
        <el-step
          title="现场作业"
          @click.native="scene()"
          :description="operAllNodeSource.dispatchTime + ' ' +operAllNodeSource.dispatchUserName"
        />
        <el-step
          title="效果评价"
          @click.native="effect()"
          :description="operAllNodeSource.measureTime + ' ' +operAllNodeSource.measureUserName"
        />
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
              <td colspan="4" style="text-align: center">上报</td>
            </tr>
            <tr>
              <td>作业名称: {{ checkData.operationName }}</td>
              <td>
                作业类型：{{
                  checkData.operationType == 0 ? "常规检泵" : "技改井"
                }}
              </td>
            </tr>
            <tr>
              <td>上报人: {{ checkData.dealUserName }}</td>
              <td>上报时间: {{ checkData.dealDate }}</td>
            </tr>
            <tr>
              <td colspan="4">备注: {{ checkData.remark }}</td>
            </tr>
            <tr>
              <td colspan="4">附件(下载、预览):</td>
            </tr>
          </table>
        </div>
        <div v-if="nodalPoint === 1" class="checkOperDiv_submit_table">
          <table
            class="Reporting"
            cellspacing="0"
            border="1"
            bordercolor="#bcc0bf"
          >
            <tr>
              <td colspan="4" style="text-align: center">派工</td>
            </tr>
            <tr>
              <td rowspan="2">上次</td>
              <td>作业名称: {{ sendLastData.lastOperationName }}</td>
              <td>作业队伍：{{ sendLastData.lastTeamName }}</td>
            </tr>
            <tr>
              <td>作业时间: {{ sendLastData.lastFinishDate }}</td>
              <td>距现在: {{ sendLastData.dateCount }} 天</td>
            </tr>
            <tr>
              <td rowspan="4">本次</td>
              <td>作业名称: {{ sendNowData.lastOperationName }}</td>
              <td>作业队伍：{{ sendNowData.lastTeamName }}</td>
            </tr>
            <tr>
              <td colspan="2">派工单编号: {{ sendNowData.formNum }}</td>
            </tr>
            <tr>
              <td colspan="2">备注: {{ sendNowData.remark }}</td>
            </tr>
            <tr>
              <td colspan="2" style="height: 30%">附件:</td>
            </tr>
          </table>
        </div>
        <div v-if="nodalPoint === 2" class="checkOperDiv_submit_table">
          <table class="scene" cellspacing="0" border="1" bordercolor="#bcc0bf">
            <tr>
              <td colspan="4" style="text-align: center">现场作业</td>
            </tr>
            <tr>
              <td>上报次数:</td>
              <td>
                <a
                  v-for="item in constructionData"
                  :key="item.conspId"
                  @click="constNum(item)"
                  >{{ item.rownum }}
                </a>
              </td>
            </tr>
            <tr>
              <td>上报日期: {{ constNumData.recordDate }}</td>
              <td>上报人: {{ constNumData.recorder }}</td>
            </tr>
            <tr>
              <td>进度描述: {{ constNumData.progressDesc }}</td>
              <td></td>
            </tr>
            <tr>
              <td>现场照片</td>
              <td style="height: 25%"></td>
            </tr>
            <tr>
              <td>附件</td>
              <td style="height: 30%"></td>
            </tr>
          </table>
        </div>
        <div v-if="nodalPoint === 3" class="checkOperDiv_submit_table">
          <table class="scene" cellspacing="0" border="1" bordercolor="#bcc0bf">
            <tr>
              <td colspan="2" style="text-align: center">效果评价</td>
            </tr>
            <tr>
              <td>评价结果:</td>
              <td>
                {{
                  measureEffectData.evaluationResult == 0
                    ? "失败"
                    : measureEffectData.evaluationResult == 1
                    ? "正常"
                    : "较差"
                }}
              </td>
            </tr>
            <tr>
              <td>评价日期:</td>
              <td>{{ measureEffectData.evaluationDate }}</td>
            </tr>
            <tr>
              <td>评价结论:</td>
              <td>{{ measureEffectData.resultDesc }}</td>
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
      type: Object,
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
  height: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_top {
  width: 88%;
  height: 20%;
  padding: 0 6%;
}
.checkOperDiv_bottom {
  width: 98%;
  height: 80%;
  padding: 0 1%;
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
.scene {
  width: 60%;
  height: 100%;
  margin: 0 20%;
}
</style>

