<template>
  <el-dialog
    title="功图诊断参数编辑"
    :visible.sync="editYlYccsVisible"
    width="42%"
    :before-close="editYlYccsClose"
    @opened="opened"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="440px">
        <el-form-item label="类型描述">
          <el-input :disabled="true" v-model="editData.typeDesc"> </el-input>
        </el-form-item>
        <el-form-item label="1.含水率比昨日上升">
          <el-input v-model="editData.param1">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="2.单井液量3方以下，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.param2">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="3.单井液量3方-5方之间，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.param3">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="4.单井液量5方-10方之间，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.param4">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="5.单井液量10方以上，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.param5">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      class="saveEditYlYccsButton"
      type="primary"
      @click="saveEditYlYccs(), editYlYccsClose()"
      >提交</el-button
    >
    <el-button type="info" @click="editYlYccsClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editYlYccsVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      abnormalParamData: {
        typeDesc: "",
      },
    };
  },
  methods: {
    opened() {
      // this.select();
    },
    // 对话框父子组件传值
    editYlYccsClose() {
      this.$emit("ylYccsRowClose");
    },
    // 保存修改后的信息
    saveEditYlYccs() {
      this.putRequest(
        "/abnormalParam/selectByType?typeDesc=%E4%BA%A7%E6%B6%B2%E9%87%8F",
        this.editData
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "液量异常筛选条件信息修改成功!",
            type: "success",
          });
        } else {
          this.$message.error("液量异常筛选条件信息修改失败，请重新提交!");
        }
      });
    },
    //液量异常筛选参数初始化
    ylYccsInit() {
      this.getRequest(
        "/abnormalParam/selectByType?typeDesc=" +
          this.abnormalParamData.typeDesc
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.editData = resp.data;
        }
      });
    },

    select() {
      this.getRequest("/abnormalParam/select").then((resp) => {
        if (resp) {
          this.abnormalParamData = resp.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 100px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 100px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 100px;
  height: 2px;
}
.saveEditYlYccsButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
