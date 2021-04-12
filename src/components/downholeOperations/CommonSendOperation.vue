<template>
  <el-dialog
    :title="sendData.wellName + '井 井下作业派工'"
    :visible.sync="sendOperVisible"
    width="55%"
    @opened="getFileList"
    :before-close="sendOperClose"
  >
    <div class="sendOpereDiv">
      <el-form :model="dispathchInfoData" label-width="100px">
        <fieldset class="sendOpereDiv_last">
          <legend>上次作业</legend>
          <el-row>
            <el-col :span="10">
              <el-form-item label="上次作业">
                <el-input v-model="sendLastData.lastOperationName" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="上次作业队伍">
                <el-input v-model="sendLastData.lastTeamName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="上次措施时间">
                <el-input v-model="sendLastData.lastFinishDate" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="距现在天数">
                <el-input v-model="sendLastData.dateCount" />
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset class="sendOpereDiv_this">
          <legend>本次作业</legend>
          <el-row>
            <el-col :span="10">
              <el-form-item label="本次作业">
                <el-input v-model="sendData.operationName" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="派工单号">
                <el-input v-model="dispathchInfoData.formNum" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="作业队伍">
            <el-select v-model="dispathchInfoData.teamId" placeholder="请选择">
              <el-option
                v-for="item in teamNameoptions"
                :key="item.teamName"
                :label="item.teamName"
                :value="item.teamId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="dispathchInfoData.remark" type="textarea" />
          </el-form-item>
        </fieldset>
        <fieldset class="sendOpereDiv_doc">
          <legend>附件</legend>
          <el-form-item>
            <el-upload
            class="upload-demo"
            action="#"
            :http-request="selectFile"
            :before-upload="handleBefore"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
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
          </el-upload>
          </el-form-item>
        </fieldset>
      </el-form>
    </div>
    <el-button
      type="primary"
      @click="saveSendOper(), sendOperClose()"
      class="sendOpereButton"
      >提交</el-button
    >
    <el-button type="info" @click="sendOperClose()">取消</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    sendOperVisible: {
      type: Boolean,
    },
    sendData: {
      type: Object,
    },
    sendLastData: {
      type: Object,
    },
  },
  inject: ["reload"],
  data() {
    return {
      teamNameoptions: [],
      dispathchInfoData: {
        dispatchId: "",
        operationNodeId: "",
        wellId: "",
        teamId: "",
        formNum: "",
        remark: "",
      },
      // 文件列表
      fileList: [],
      // 临时存放文件信息
      fileParam: "",
    };
  },
  created() {
    //初始化施工队伍信息
    this.selectTeams();
  },
  methods: {
    // 对话框父子组件传值
    sendOperClose() {
      this.$emit("sendRowClose");
    },
    // 保存修改后的信息
    saveSendOper() {
      // 将本次作业节点ID赋给派工信息对象
      this.dispathchInfoData.operationNodeId = this.sendData.operationNodeId;
      this.dispathchInfoData.wellId = this.sendData.wellId;
      this.postRequest(
        "/operation/dispatchInfo/insertDispatch",
        this.dispathchInfoData
      ).then((resp) => {
        if (resp) {
          //派工成功后更新节点状态
          this.updateOperNode(this.sendData);
          this.$message({
            message: "派工成功!",
            type: "success",
          });
          this.reload();
        } else {
          this.$message.error("派工失败，请重新提交!");
        }
      });
    },
    // 井下作业空闲施工队伍信息获取
    selectTeams() {
      this.getRequest("/operation/teamInfo/selectTeams").then((resp) => {
        if (resp) {
          //将施工队伍信息赋值给下拉框
          this.teamNameoptions = resp.data;
        }
      });
    },
    //更新井下作业新节点信息
    updateOperNode(val) {
      this.putRequest("/operation/operationNode/submitOperation", val).then(
        (resp) => {
          if (resp) {
          } else {
            this.$message.error("提交失败，请重新提交!");
          }
        }
      );
    },
    // 覆盖默认的上传行为，自定义上传的实现
    selectFile(param){
      // 将选取文件赋值
      this.fileParam = param;
    },
    // 手动上传至服务器
    submitUpload() {
      // 将文件添加到formData对象中
      let fileFormData = new FormData();
      fileFormData.append("file", this.fileParam.file);
      this.uploadFile(
        "/file/commonFileUpload?moduleId=" + this.sendData.wellOperationId,
        fileFormData
      ).then((resp) => {
        if (resp.code == 200) {
          this.$message({
            message: resp.message,
            type: "success",
          });
        } else {
          this.$message.error("上传失败，请重新上传!");
        }
      });
    },
    // 获取文件列表
    getFileList() {
      this.fileList = [];
      this.getRequest(
        "/file/selectFileByModuleId?moduleId=" + this.sendData.wellOperationId
      ).then((resp) => {
        if (resp.code == 200 && resp.data.length > 0) {
          for (var i = 0; i < resp.data.length; i++) {
            this.fileList.push({
              name: resp.data[i].fileName,
              url: resp.data[i].filePath,
            });
          }
        }
      });
    },
    // 上传文件之前的钩子
    handleBefore(file) {
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {},
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {},
  },
};
</script>

<style lang="less" scoped>
.sendOpereDiv {
  height: 430px;
  margin-top: -2%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.sendOpereDiv_last {
  width: 90%;
  height: 24%;
  color: #2670f7;
  font-size: 14px;
  border: 1px solid #ebeef5;
  margin: 1% 5% 0 5%;
}
.sendOpereDiv_this {
  width: 90%;
  height: 40%;
  color: #2670f7;
  font-size: 14px;
  border: 1px solid #ebeef5;
  margin: 1% 5% 0 5%;
}
.sendOpereDiv_remark {
  width: 90%;
  height: 15%;
  color: #2670f7;
  font-size: 14px;
  border: 1px solid #ebeef5;
  margin: 1% 5% 0 5%;
}
.sendOpereDiv_doc {
  width: 90%;
  height: 15%;
  color: #2670f7;
  font-size: 14px;
  border: 1px solid #ebeef5;
  margin: 1% 5% 0 5%;
}

.sendOpereButton {
  margin-left: 35%;
}
</style>
<style>
.sendOpereDiv .el-form-item__label,
.el-input__inner {
  font-size: 13px;
  color: #666;
  padding-right: 10px;
}
</style>