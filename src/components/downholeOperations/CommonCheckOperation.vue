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
      >
        <el-step
          title="上报"
          @click.native="submit()"
          description="2020-11-19，刘队"
        />
        <el-step
          title="派工"
          @click.native="send()"
          description="2020-11-19，刘队"
        />
        <el-step
          title="现场作业"
          @click.native="scene()"
          description="2020-11-19，刘队"
        />
        <el-step
          title="效果评价"
          @click.native="effect()"
          description="2020-11-19，刘队"
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
              <td>作业名称:</td>
              <td>作业队伍：</td>
            </tr>
            <tr>
              <td>作业时间:</td>
              <td>距现在:</td>
            </tr>
            <tr>
              <td rowspan="4">本次</td>
              <td>作业名称:</td>
              <td>作业队伍：</td>
            </tr>
            <tr>
              <td colspan="2">派工单编号:</td>
            </tr>
            <tr>
              <td colspan="2">备注:</td>
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
              <td>上报次数</td>
              <td></td>
            </tr>
            <tr>
              <td>上报日期</td>
              <td>上报人:</td>
            </tr>
            <tr>
              <td>进度描述</td>
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
              <td>评价结果</td>
              <td>基本满足要求</td>
            </tr>
            <tr>
              <td>评价日期</td>
              <td>2020-11-19</td>
            </tr>
            <tr>
              <td>评价结论</td>
              <td>挺好的</td>
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
    checkData: {
      type: Object,
    },
    nodalPoint: {
      type: Number,
    },
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
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看派工节点
    send() {
      if (this.checkData.nodeSequence >= 0) {
        this.nodalPoint = 1;
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
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
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

