<template>
  <el-dialog
    title="施工队伍信息新增"
    :visible.sync="addBasTeamInforVisible"
    width="42%"
    :before-close="addBasTeamInforClose"
  >
    <div class="dialogDiv">
      <el-form  label-width="120px" >
        <el-form-item label="施工队伍名称:">
          <el-input
            v-model="BasTeamInfor.teamName"
          />
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input
            v-model="BasTeamInfor.leader"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BasTeamInfor.telephone"
          />
        </el-form-item>
        <el-form-item label="施工状态">
          <el-select
            v-model="BasTeamInfor.status"
            clearable
            placeholder="施工状态"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            v-model="BasTeamInfor.remark"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        class="saveAddBasTeamInforButton"
        @click="saveAddBasTeamInfor(), addBasTeamInforClose()"
      >
        提交
      </el-button>
      <el-button
        type="info"
        @click="addBasTeamInforClose()"
      >
        取消
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addBasTeamInforVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      BasTeamInfor: {
        teamId: "",
        teamName: "",
        leader: "",
        telephone: "",
        status: "",
        active: "",
        remark: ""
      },
      //
      activeOptions: [
        {
          value: "0",
          label: "无效"
        },
        {
          value: "1",
          label: "有效"
        }
      ],
      statusOptions: [
        {
          value: "0",
          label: "空闲"
        },
        {
          value: "1",
          label: "施工中"
        }
      ],
      //区队ID
      oilStationIdOptions: []
    };
  },
  methods: {
    // 对话框父子组件传值
    addBasTeamInforClose() {
      this.$emit("BasTeamInforRowClose");
    },
    // 保存修改后的信息
    saveAddBasTeamInfor() {
      this.postRequest("/basTeamInfor/basTeam", this.BasTeamInfor).then(
        resp => {
          if (resp) {
            this.$message({
              message: "施工队伍信息新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("施工队伍信息新增失败，请重新提交!");
          }
        }
      );
    },
  }
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
.saveAddBasTeamInforButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
