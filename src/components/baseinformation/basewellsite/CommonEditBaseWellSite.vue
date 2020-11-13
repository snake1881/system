<template>
  <el-dialog
    title="井场信息编辑"
    :visible.sync="editBaseWellSiteVisible"
    width="42%"
    @opened="opens"
    :before-close="editBaseWellSiteClose"
  >
    <div class="dialogDiv">
      <el-form label-width="120px">
        <el-form-item label="井场名称:">
          <el-input v-model="editData.wellSiteName" />
        </el-form-item>
        <el-form-item label="采油站名称:">
          <el-select
            v-model="editData.oilStationId"
            clearable
            filterable
            placeholder="全区"
          >
            <el-option
              v-for="item in oilStationIdOptions"
              :key="item.oilStationId"
              :label="item.oilStationName"
              :value="item.oilStationId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油罐数量">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.tankNum"
          />
        </el-form-item>
        <el-form-item label="油罐总容量(M3)">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.totalCapacity"
          />
        </el-form-item>
        <el-form-item label="建成日期:">
          <el-date-picker
            v-model="editData.completionDate"
            type="date"
            placeholder="建成日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经度:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.longitude"
          />
        </el-form-item>
        <el-form-item label="井场位置:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.position"
          />
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.latitude"
          />
        </el-form-item>
        <el-form-item label="海拔高度(M):">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.altitude"
          />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="editData.remark" />
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="saveEditBaseWellSiteButton"
      @click="saveEditBaseWellSite(), editBaseWellSiteClose()"
    >
      提交
    </el-button>
    <el-button type="info" @click="editBaseWellSiteClose()">取消 </el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editBaseWellSiteVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {
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
      //井类别(0:注水井,1:油井)
      wellCategoryOptions: [
        {
          value: "0",
          label: "注水井"
        },
        {
          value: "1",
          label: "油井"
        }
      ],
      //区队ID
      oilStationIdOptions: []
    };
  },
  methods: {
    // 对话框父子组件传值
    editBaseWellSiteClose() {
      this.$emit("BaseWellSiteRowClose");
    },
    // 保存修改后的信息
    saveEditBaseWellSite() {
      this.putRequest("/basWellSiteInfor/wellSite", this.editData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "井场信息修改成功!",
              type: "success"
            });
          } else {
            this.$message.error("井场信息修改失败，请重新提交!");
          }
        }
      );
    },
    //区队ID下拉框数据查询
    oilStationInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then(resp => {
        this.loading = false;
        if (resp) {
          this.oilStationIdOptions = resp.data;
        }
      });
    },
    opens() {
      this.oilStationInit();
    }
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
.saveEditBaseWellSiteButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
