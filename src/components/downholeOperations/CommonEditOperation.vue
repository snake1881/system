<template>
<el-dialog title="**井井下作业编辑" :visible.sync="editOperVisible" width="40%" :before-close="editOperClose">
  <div class="editRoleDiv">
    <el-form :model="editData" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="作业名称">
            <el-input v-model="editData.roleName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作业类型">
            <el-select v-model="editData.status" placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="editData.roleName" type="textarea"/>
      </el-form-item>

    </el-form>
  </div>
  <el-button type="primary" @click="saveEditRole(), editOperClose()" class="editRoleButton">提交</el-button>
  <el-button type="info" @click="editOperClose()">取消</el-button>
</el-dialog>
</template>

<script>
export default {
  props: {
    editOperVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  methods: {
    // 对话框父子组件传值
    editOperClose() {
      this.$emit("operRowClose");
    },
    // 保存修改后的信息
    saveEditRole() {
      this.putRequest("/", this.editData).then(resp => {
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
.editRoleDiv {
  height: 375px;
  overflow: auto;
}

.editRoleDiv .el-input {
  width: 180px;
  height: 2px;
}

.editRoleButton {
  margin: 0 0 0 180px;
}
</style>
