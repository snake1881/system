<template>
  <el-dialog
    title="注水站信息编辑"
    :visible.sync="editBaseWaterStationVisible"
    width="42%"
    @opened="opens"
    :before-close="editBaseWaterStationClose"
  >
    <div class="dialogDiv">
      <el-form label-width="120px">
        <el-form-item label="注水站名称:">
          <el-input v-model="editData.waterStationName" />
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
        <el-form-item label="注水规模(M3)">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.injectionScale"
          />
        </el-form-item>
        <el-form-item label="投用日期:">
          <el-date-picker
            v-model="editData.startDate"
            type="date"
            placeholder="投用日期"
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
    <span slot="footer">
      <el-button
        type="primary"
        class="saveEditBaseWaterStationButton"
        @click="saveEditBaseWaterStation(), editBaseWaterStationClose()"
      >
        提交
      </el-button>
      <el-button type="info" @click="editBaseWaterStationClose()"
        >取消
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editBaseWaterStationVisible: {
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
    editBaseWaterStationClose() {
      this.$emit("BaseWaterStationRowClose");
    },
    // 保存修改后的信息
    saveEditBaseWaterStation() {
      this.putRequest("/basWaterStationInfor/waterStation", this.editData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "注水站信息修改成功!",
              type: "success"
            });
          } else {
            this.$message.error("注水站信息修改失败，请重新提交!");
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
    //区队Id改变注水站下拉框改变
    oilStationChange(val) {
      this.getRequest(
        "/basWaterStationInfor/optionById?oilStationId=" + val
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.waterStationIdOptions = resp.data;
        }
      });
    },
    //井场ID下拉框数据查询
    wellSiteInit() {
      this.getRequest("/basWellSiteInfor/wellSiteOptions").then(resp => {
        this.loading = false;
        if (resp) {
          this.wellSiteIdOptions = resp.data;
        }
      });
    },
    //注水站ID下拉框数据查询
    waterStationInit() {
      this.getRequest("/basWaterStationInfor/waterStationOptions").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.waterStationIdOptions = resp.data;
          }
        }
      );
    },
    //注水站改变配水间下拉框
    waterStationIdChange(val) {
      this.getRequest(
        "/basWaterDistributionRoom/OptionsById?waterStationId=" + val
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.distributionRoomIdOptions = resp.data;
        }
      });
    },
    //配水间ID下拉框数据查询
    waterDistributionRoomInit() {
      this.getRequest(
        "/basWaterDistributionRoom/waterDistributionRoomOptions"
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.distributionRoomIdOptions = resp.data;
        }
      });
    },
    opens() {
      this.oilStationInit();
      this.wellSiteInit();
      this.waterStationInit();
      this.waterDistributionRoomInit();
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
.saveEditBaseWaterStationButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
