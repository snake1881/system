<template>
  <el-dialog
    title="施工队伍信息编辑"
    :visible.sync="editBasTeamInforVisible"
    width="42%"
    :before-close="editBasTeamInforClose"
  >
    <div class="dialogDiv">
      <el-form label-width="120px">
        <el-form-item label="施工队伍名称:">
          <el-input v-model="editData.teamName" />
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input v-model="editData.leader" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.telephone"
          />
        </el-form-item>
        <el-form-item label="施工状态">
          <el-select v-model="editData.status" clearable placeholder="有效">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="editData.remark" />
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="saveEditBasTeamInforButton"
      @click="saveEditBasTeamInfor(), editBasTeamInforClose()"
    >
      提交
    </el-button>
    <el-button type="info" @click="editBasTeamInforClose()"> 取消 </el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editBasTeamInforVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      //
      activeOptions: [
        {
          value: "0",
          label: "无效",
        },
        {
          value: "1",
          label: "有效",
        },
      ],
      statusOptions: [
        {
          value: "0",
          label: "空闲",
        },
        {
          value: "1",
          label: "施工中",
        },
      ],
      //区队ID
      oilStationIdOptions: [],
    };
  },
  methods: {
    // 对话框父子组件传值
    editBasTeamInforClose() {
      this.$emit("BasTeamInforRowClose");
    },
    // 保存修改后的信息
    saveEditBasTeamInfor() {
      this.putRequest("/basTeamInfor/basTeam", this.editData).then((resp) => {
        if (resp) {
          this.$message({
            message: "施工队伍信息修改成功!",
            type: "success",
          });
        } else {
          this.$message.error("施工队伍信息修改失败，请重新提交!");
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
  width: 420px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 420px;
  height: 2px;
}
.saveEditBasTeamInforButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
