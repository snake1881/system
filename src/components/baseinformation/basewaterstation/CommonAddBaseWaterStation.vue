<template>
  <el-dialog
    title="注水站信息新增"
    :visible.sync="addBaseWaterStationVisible"
    width="42%"
    @opened="opens"
    :before-close="addBaseWaterStationClose"
  >
    <div class="dialogDiv">
      <el-form
        :model="BaseWaterStation"
        label-width="120px"
      >
        <el-form-item label="注水站名称:">
          <el-input
            v-model="BaseWaterStation.waterStationName"
          />
        </el-form-item>
        <el-form-item label="采油站名称:">
          <el-select
            v-model="BaseWaterStation.oilStationId"
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
            v-model="BaseWaterStation.injectionScale"
          />
        </el-form-item>
        <el-form-item label="投用日期:">
          <el-date-picker
            v-model="BaseWaterStation.startDate"
            type="date"
            placeholder="投用日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经度:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWaterStation.longitude"
          />
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWaterStation.latitude"
          />
        </el-form-item>
        <el-form-item label="海拔高度(M):">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWaterStation.altitude"
          />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            v-model="BaseWaterStation.remark"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        class="saveAddBaseWaterStationButton"
        @click="saveAddBaseWaterStation(), addBaseWaterStationClose()"
      >
        提交
      </el-button>
         <el-button type="info" @click="addBaseWaterStationClose()">取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addBaseWaterStationVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      BaseWaterStation: {
        wellId: "",
        wellName: "",
        layerName: "",
        wellDepth: "",
        bushHigh: "",
        wellBottom: "",
        productionDate: "",
        conversionDate: "",
        location: "",
        oilStationId: "",
        wellSiteId: "",
        waterStationId: "",
        distributionRoomId: "",
        wellCategory: "",
        wellType: "",
        wellNature: "",
        finishDate: "",
        longitude: "",
        latitude: "",
        altitude: "",
        remark: "",
        active: ""
      },
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
      //井类型(0:旧井)
      wellTypeOptions: [
        {
          value: "0",
          label: "旧井"
        },
        {
          value: "1",
          label: "新井"
        },
        {
          value: "2",
          label: "遗留井"
        }
      ],
      //井性质(0:投注,1:转注)[注水井]
      wellNatureOptions: [
        {
          value: "0",
          label: "投注"
        },
        {
          value: "1",
          label: "转注"
        }
      ],
      //区队ID
      oilStationIdOptions: [],
      
    };
  },
  methods: {
    // 对话框父子组件传值
    addBaseWaterStationClose() {
      this.$emit("BaseWaterStationRowClose");
    },
    // 保存修改后的信息
    saveAddBaseWaterStation() {
      this.postRequest("/basWaterStationInfor/waterStation", this.BaseWaterStation).then(
        resp => {
          if (resp) {
            this.$message({
              message: "注水站信息新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("注水站信息新增失败，请重新提交!");
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
.saveAddBaseWaterStationButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
