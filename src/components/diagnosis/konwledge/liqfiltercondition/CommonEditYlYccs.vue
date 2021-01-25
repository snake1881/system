<template>
  <el-dialog
    title="功图诊断参数编辑"
    :visible.sync="editYlYccsVisible"
    width="60%"
    :before-close="editYlYccsClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-position="right" label-width="480px">
        <el-form-item label="1.含水率比昨日上升">
          <el-input v-model="editData.cs1" size="small" style="width: 140px">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="2.单井液量3方以下，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.cs2" size="small" style="width: 140px">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="3.单井液量3方-5方之间，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.cs3" size="small" style="width: 140px">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="4.单井液量5方-10方之间，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.cs4" size="small" style="width: 140px">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="5.单井液量10方以上，和昨天/上月均值/三月前均值/任意天降低"
        >
          <el-input v-model="editData.cs5" size="small" style="width: 140px">
            <i slot="suffix">%</i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditYlYccs(), editYlYccsClose()"
        >提交</el-button
      >
    </span>
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
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editYlYccsClose() {
      this.$emit("ylYccsRowClose");
    },
    // 保存修改后的信息
    saveEditYlYccs() {
      this.putRequest("/knowledge/ylYcss/ylYcss", this.editData).then(
        (resp) => {
          if (resp) {
            this.$message({
              message: "液量异常筛选条件信息修改成功!",
              type: "success",
            });
          } else {
            this.$message.error("液量异常筛选条件信息修改失败，请重新提交!");
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style>
.el-input {
  width: 700px;
}
</style>
