<template>
  <el-dialog
    :title="editData.wellName + '井 井下作业编辑'"
    :visible.sync="editOperVisible"
    width="43%"
    :before-close="editOperClose"
  >
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
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/file"
            :before-upload="handleBefore"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      @click="saveEditOper(), editOperClose()"
      class="editOperButton"
      >提交</el-button
    >
    <el-button type="info" @click="editOperClose()">取消</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    editOperVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      files: "",
    };
  },
  methods: {
    // 对话框父子组件传值
    editOperClose() {
      this.$emit("operRowClose");
    },
    // 保存修改后的信息
    saveEditOper() {
      this.putRequest(
        "/operation/operationInfo/updateOperation",
        this.editData
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "信息更改成功!",
            type: "success",
          });
        } else {
          this.$message.error("信息更改失败，请重新提交!");
        }
      });
    },
    // 手动上传至服务器
    submitUpload() {
      // 调用文件上传前钩子
      this.$refs.upload.submit();
      let fileFormData = new FormData();
      fileFormData.append("file", this.files);
      console.log(this.files);
      this.uploadFile(
        "/file/commonFileUpload",
        fileFormData
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "上传成功!",
            type: "success",
          });
        } else {
          this.$message.error("上传失败，请重新上传!");
        }
      });
    },
    // 上传文件之前的钩子
    handleBefore(file) {
      this.files = file;
      console.log(this.files);
      // 返回false不会自动上传
      return false;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
  },
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
