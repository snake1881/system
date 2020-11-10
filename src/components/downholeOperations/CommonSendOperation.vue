<template>
<el-dialog title="**井井下作业派工" :visible.sync="sendOperVisible" width="55%" :before-close="sendOperClose">
  <div class="sendOpereDiv">
    <el-form :model="sendData" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="上次作业:">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上次作业队伍:">
             <el-input />
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="上次作业时间:">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="距现在天数:">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="本次作业:">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="派工单编号:">
        <el-input />
      </el-form-item>
        </el-col>
      </el-row>
       <el-form-item label="作业队伍:">
            <el-select placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
            </el-select>
          </el-form-item>
     
      <el-form-item label="备注:">
        <el-input  type="textarea" />
      </el-form-item>
      <el-form-item label="附件:">
         <el-upload class="upload-demo" drag action="" multiple>
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
       </el-form-item>
    </el-form>
  </div>
  <el-button type="primary" @click="saveSendOper(), sendOperClose()" class="sendOpereButton">提交</el-button>
  <el-button type="info" @click="sendOperClose()">取消</el-button>
</el-dialog>
</template>

<script>
export default {
  props: {
    sendOperVisible: {
      type: Boolean
    },
    sendData: {
      type: Object
    }
  },
  data(){
    return{}
  },
  methods: {
    // 对话框父子组件传值
    sendOperClose() {
      this.$emit("sendRowClose");
    },
    // 保存修改后的信息
    saveSendOper() {
      this.putRequest("/", this.sendData).then(resp => {
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
.sendOpereDiv {
  height: 400px;
  overflow: auto;
}

.sendOpereDiv .el-input {
  width: 150px;
  height: 2px;
}

.sendOpereButton {
  margin-left: 35%;
}
</style>
