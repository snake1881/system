<template>
<el-dialog title="考核指标明细编辑" :visible.sync="editDetailVisible" width="50%" :before-close="editDetailClose">
  <div class="editDetail">
    <el-form :model="editData" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="考核内容">
            <el-input v-model="editData.examineContent" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作要求">
            <el-input v-model="editData.requirement" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="考核标准">
            <el-input v-model="editData.examineStandard" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分值">
            <el-input v-model="editData.score" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排列顺序">
            <el-input v-model="editData.sequence" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有效">
            <el-select v-model="editData.active">
              <el-option label="无效" value="0" />
              <el-option label="有效" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <el-button type="primary" @click="saveEditDetail(), editDetailClose()" class="editDetaillButton"> 提交</el-button>
  <el-button type="info" @click=" editDetailClose()"> 取消</el-button>
</el-dialog>
</template>

<script>
export default {
  props: {
    editDetailVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editDetailClose() {
      this.$emit("editClose");
    },
    // 保存修改后的信息
    saveEditDetail() {
      this.putRequest(
        "/examine/IndexDetail/bizExamineIndexDetail",
        this.editData
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "信息更改成功!",
            type: "success"
          });
        } else {
          this.$message.error("信息更改失败，请重新提交!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.editDetail {
  height: 230px;
  overflow: auto;
}
.editDetail .el-input {
  width: 220px;
}
.editDetaillButton {
  margin-left: 240px;
}
</style>
