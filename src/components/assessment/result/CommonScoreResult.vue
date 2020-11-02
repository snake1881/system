<template>
  <el-dialog
    title="考核打分"
    :visible.sync="scoreResultVisible"
    width="60%"
    :before-close="scoreResultClose"
  >
    <div class="dialogDiv">
      <el-form label-width="300px">
        <el-form-item
          v-for="(item, index) in this.scoreData"
          :key="index"
          :label="item.examineContent"
        >
          <i style="margin:100px 100px">{{ item.score }}</i>
          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" v-model="item.singleScore"  />
        </el-form-item>
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
      type: Array
    }
  },
  inject: ["reload"],
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    scoreResultClose() {
      this.$emit("scoreClose");
    },
    // 保存
    saveEditResult() {
      this.postRequest(
        "/examine/resultDetail/insertResultDetail",
        this.scoreData
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
  width: 100px;
}
</style>
