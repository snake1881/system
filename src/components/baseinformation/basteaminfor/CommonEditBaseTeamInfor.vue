<template>
  <el-dialog
    title="施工队伍信息编辑"
    :visible.sync="editBasTeamInforVisible"
    width="60%"
    :before-close="editBasTeamInforClose"
  >
     <div class="dialogDiv">
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="施工队伍名称:">
          <el-input
            size="small"
            v-model="editData.teamName"
            style="width:150px"
          />
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input
            size="small"
            v-model="editData.leader"
            style="width:150px"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="联系电话">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.telephone"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="施工状态">
          <el-select
            v-model="editData.status"
            clearable
            style="width:250px"
            placeholder="有效"
            size="small"
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
      </el-form>
      <el-form>
        <el-form-item label="是否有效">
          <el-select
            v-model="editData.active"
            clearable
            style="width:250px"
            placeholder="有效"
            size="small"
          >
            <el-option
              v-for="item in activeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            size="small"
            v-model="editData.remark"
            style="width:400px"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveEditBasTeamInfor(), editBasTeamInforClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editBasTeamInforVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {
      //
      activeOptions:[
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
      this.putRequest("/basTeamInfor/basTeam", this.editData).then(resp => {
        if (resp) {
          this.$message({
            message: "施工队伍信息修改成功!",
            type: "success"
          });
        } else {
          this.$message.error("施工队伍信息修改失败，请重新提交!");
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
