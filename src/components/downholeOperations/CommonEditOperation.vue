<template>
<el-dialog :title="editData.wellName + '井 井下作业编辑'" :visible.sync="editOperVisible" width="43%" :before-close="editOperClose">
  <div class="editDiv">
    <el-form :model="editData" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="作业名称:">
            <el-input v-model="editData.operationName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作业类型:">
            <el-select v-model="editData.operationType" placeholder="请选择">
              <el-option label="常规检泵" value="0"></el-option>
              <el-option label="技改井" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注:">
        <el-input v-model="editData.remark" type="textarea" />
      </el-form-item>
       <el-form-item label="附件:">
         <el-upload class="upload-demo" drag action="" multiple>
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
       </el-form-item>
    </el-form>
  </div>
  <el-button type="primary" @click="saveEditOper(), editOperClose()" class="editOperButton">提交</el-button>
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
  data(){
    return{}
  },
  methods: {
    // 对话框父子组件传值
    editOperClose() {
      this.$emit("operRowClose");
    },
    // 保存修改后的信息
    saveEditOper() {
      this.putRequest("/operation/operationInfo/updateOperation", this.editData).then(resp => {
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
.editDiv {
  height: 375px;
  overflow: auto;
}

.editDiv .el-input {
  width: 180px;
  height: 2px;
}

.editOperButton {
  margin: 0 0 0 180px;
}
</style>
