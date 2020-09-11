<template>
  <el-dialog
    title="考核打分"
    :visible.sync="scoreResultVisible"
    width="60%"
    :before-close="scoreResultClose"
  >
    <div class="dialogDiv">
      <el-form :model="score" label-width="280px">
        <div v-for="(item, index) in this.detailData" :key="index">
          <el-form-item :label="item.examineContent">
            <el-input v-model="item.score" />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditResult(), scoreResultClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    scoreResultVisible: {
      type: Boolean
    },
    scoreData: {
      type: Object
    }
  },
  inject: ["reload"],
  data() {
    return {
      ScoreData: {},
      detailData: [],
      score: {}
    };
  },
  created() {
    this.detailInit();
  },
  methods: {
    // 对话框父子组件传值
    scoreResultClose() {
      this.$emit("scoreClose");
    },
    //初始化
    detailInit() {
      this.getRequest(
        "/examine/resultDetail/selectByRId?examineResultId=" +
          this.scoreData.examineRId
      ).then(resp => {
        if (resp) {
          this.detailData = resp.data;
        }
      });
    },
    // 保存
    saveEditResult() {
      this.postRequest(
        "/examine/resultDetail/insertResultDetail",
        this.score
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "打分成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("打分失败，请重新提交!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 400px;
}
</style>
