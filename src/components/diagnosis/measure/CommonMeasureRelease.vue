<template>
  <el-dialog
    title="措施发布"
    :visible.sync="measuresReleaseVisible"
    width="42%"
    :before-close="measuresReleaseClose"
    @opened="opens()"
  >
    <div class="dialogDiv">
      <el-form :model="releaseData"   label-width="120px">
        <el-form-item :inline="true">
          <span>井号： {{this.releaseData.wellCommonName}}</span>
          <span>日期： {{this.releaseData.prodDate}}</span>
          <span>措施： {{this.releaseData.measure}}</span>
        </el-form-item>
      </el-form>
      <el-form :model="releaseData1" label-width="120px"  >
        <el-form-item label="日期" >
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
          <el-select
          v-model="releaseData.designee"
          clearable
          filterable
          placeholder="请选择"
          size="medium"
        >
          <el-option
            v-for="(item,index)  in this.designeeOptions"
            :key="index"
            :label="item.userName"
            :value="item.userName"
          >
          </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
      <el-button
        type="primary"
        class="saveMeasureReleaseButton"
        @click="saveMeasureRelease(), measuresReleaseClose()"
      >
        提交
      </el-button>
      <el-button
        type="info"
        @click="measuresReleaseClose()"
      >
        取消
      </el-button>
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
      designeeOptions:[],
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
    measuresReleaseClose() {
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
    },
    //指派人拉框数据查询
    designeeInit() {
      this.getRequest("/system/sysUser/users").then(resp => {
        this.loading = false;
        if (resp) {
          this.designeeOptions = resp.data;
        }
      });
    },
    opens(){
      this.designeeInit();
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  width: 600px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 350px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 420px;
  height: 2px;
}
.saveMeasureReleaseButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
