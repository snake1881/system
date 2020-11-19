<template>
<el-dialog title="**井进度填报" :visible.sync="scheduleOperVisible" width="55%" :before-close="scheduleOperClose">
  <div class="scheduleOpereDiv">
    <el-form :model="scheduleData" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="井号:">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="记录日期:">
            <el-date-picker type="date" placeholder="选择日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="记录人:">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="进度描述:">
        <el-input type="textarea" />
      </el-form-item>
      <el-form-item label="现场照片:">
         <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="正在加载">
        </el-dialog>
      </el-form-item>
      <el-form-item label="附件:">
         <el-upload class="upload-demo" drag action="" multiple>
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
  <el-button type="primary" @click="saveScheduleOper(), scheduleOperClose()" class="sendOpereButton">提交</el-button>
  <el-button type="info" @click="scheduleOperClose()">取消</el-button>
</el-dialog>
</template>

<script>
export default {
  props: {
    scheduleOperVisible: {
      type: Boolean
    },
    scheduleData: {
      type: Object
    }
  },
  data(){
    return{
      handleRemove: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    // 对话框父子组件传值
    scheduleOperClose() {
      this.$emit("scheduleRowClose");
    },
    // 保存修改后的信息
    saveScheduleOper() {
      this.putRequest("/", this.scheduleData).then(resp => {
        if (resp) {
          this.$message({
            message: "信息更改成功!",
            type: "success"
          });
        } else {
          this.$message.error("信息更改失败，请重新提交!");
        }
      });
    },
    // 图片预览
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.scheduleOpereDiv {
  height: 400px;
  overflow: auto;
}
.scheduleOpereDiv .el-input {
  width: 150px;
  height: 2px;
}
.sendOpereButton {
  margin-left: 35%;
}
</style>
