<template>
  <el-dialog
    title="措施发布"
    :visible.sync="measuresReleaseVisible"
    width="60%"
    :before-close="measuresReleaseClose"
  >
    <div class="dialogDiv">
      <el-form :model="releaseData"  label-position="left" label-width="200px">
        <el-form-item :inline="true">
          <span>井号： {{this.releaseData.wellCommonName}}</span>
          <span>日期： {{this.releaseData.prodDate}}</span>
          <span>措施： {{this.releaseData.measure}}</span>
        </el-form-item>
      </el-form>
      <el-form :model="releaseData1" :rules="rules" label-position="left" label-width="200px" >
        <el-form-item label="日期" size="medium">
          <el-date-picker
            v-model="termData.chooseDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item >
        <el-form-item label="指派人" prop="desigee">
          <el-input v-model="releaseData.designee" style="width: 300px" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveMeasureRelease(), measuresReleaseClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    measuresReleaseVisible: {
      type: Boolean
    },
    releaseData:{
      type: Object
    }
  },
  inject: ["reload"],
  data() {
    return {
      termData: {
        chooseDate: ""
      },
      releaseData1: {
        createTime: "",
        designee: "",
        endDate: "",
        measureid: "",
        publisher: "",
        startDate: ""
      },
      rules: {
        designee: [
          { required: true, message: "请输入指派人", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    measuresReleaseVisible() {
      this.$emit("measuresReleaseRowClose");
    },
    // 保存修改后的信息
    saveMeasureRelease() {
      this.releaseData1.startDate=this.termData.chooseDate[0];
      this.releaseData1.endDate=this.termData.chooseDate[1];
      this.releaseData1.designee=this.releaseData.designee;
      this.releaseData1.measureid=this.releaseData.measureid;
      this.postRequest("/measures/measure/measures", this.releaseData1).then(
        resp => {
          if (resp) {
            this.$message({
              message: "措施发布成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("措施发布失败，请重新提交!");
          }
        }
      );
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
  width: 700px;
}
</style>
