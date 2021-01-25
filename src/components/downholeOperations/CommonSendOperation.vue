<template>
  <el-dialog
    :title="sendData.wellId + '井 井下作业派工'"
    :visible.sync="sendOperVisible"
    width="55%"
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
              action="#"
              multiple
              :show-file-list="true"
              :on-preview="handlePreview"
              :http-request="handleUpload"
              :file-list="fileLists"
            >
              <i
                class="el-icon-upload"
                style="font-size: 30px; margin-left: -15%"
              />
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
      fileLists: [],
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
    // 文件上传前的判断
    handlePreview() {},
    // 上传文件
    handleUpload(params) {
      // 获取要上传的file对象
      let fileObj = params.file;
      let fd = new FormData();
      // 将文件对象添加到fd对象中
      fd.append("file", fileObj);
      this.postRequest("/", fd).then((resp) => {
        if (resp) {
          this.$message({
            message: "上传成功",
            type: "success",
          });
        }
      });
    },
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
  height: 10%;
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