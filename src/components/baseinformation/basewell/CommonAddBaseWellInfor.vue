<template>
  <el-dialog
    title="单井信息新增"
    :visible.sync="addBaseWellInforVisible"
    width="60%"
    @opened="opens"
    :before-close="addBaseWellInforClose"
  >
    <div class="dialogDiv">
      <el-form
        :model="BaseWellInfor"
        label-position="right"
        label-width="120px"
        :inline="true"
      >
        <el-form-item label="井号:">
          <el-input
            size="small"
            v-model="BaseWellInfor.wellName"
            style="width:150px"
          />
        </el-form-item>
        <el-form-item label="层位:">
          <el-input
            v-model="BaseWellInfor.layerName"
            size="small"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="地理位置:">
          <el-input
            v-model="BaseWellInfor.location"
            size="small"
            style="width: 150px"
          />
        </el-form-item>
      </el-form>

      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="井深(M):">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellInfor.wellDepth"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="补心高(M):">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellInfor.bushHigh"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="人工井底(M):">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellInfor.wellBottom"
            style="width: 150px"
          />
        </el-form-item>
      </el-form>
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="投产/注水日期:">
          <el-date-picker
            v-model="BaseWellInfor.productionDate"
            type="date"
            placeholder="投产/注水日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="投转注日期:">
          <el-date-picker
            v-model="BaseWellInfor.conversionDate"
            type="date"
            placeholder="投转注日期"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完井日期:">
          <el-date-picker
            v-model="BaseWellInfor.finishDate"
            type="date"
            size="small"
            placeholder="完井日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="井类别:">
          <el-select
            v-model="BaseWellInfor.wellCategory"
            clearable
            placeholder="请选择井类别"
            style="width:150px"
            size="small"
          >
            <el-option
              v-for="item in wellCategoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="井类型:">
          <el-select
            v-model="BaseWellInfor.wellType"
            clearable
            placeholder="请选择井类型"
            style="width:150px"
            size="small"
          >
            <el-option
              v-for="item in wellTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="井性质:">
          <el-select
            v-model="BaseWellInfor.wellNature"
            clearable
            placeholder="请选择井性质"
            style="width:150px"
            size="small"
          >
            <el-option
              v-for="item in wellNatureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form  label-position="right" label-width="120px" :inline="true">
        <el-form-item label="区队:">
          <el-select
            @change="oilStationChange"
            v-model="BaseWellInfor.oilStationId"
            clearable
            placeholder="请选择区队"
            style="width:150px"
            size="small"
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
        <el-form-item label="井场:">
          <el-select
            v-model="BaseWellInfor.wellSiteId"
            clearable
            placeholder="请选择井场"
            style="width:150px"
            size="small"
          >
            <el-option
              v-for="item in wellSiteIdOptions"
              :key="item.wellSiteId"
              :label="item.wellSiteName"
              :value="item.wellSiteId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form  label-position="right" label-width="120px" :inline="true">
        <el-form-item
          v-if="BaseWellInfor.wellCategory === '0'"
          label="注水站:"
        >
          <el-select
            @change="waterStationIdChange"
            v-model="BaseWellInfor.waterStationId"
            clearable
            placeholder="请选择注水站"
            style="width:150px"
            size="small"
          >
            <el-option
              v-for="item in waterStationIdOptions"
              :key="item.waterStationId"
              :label="item.waterStationName"
              :value="item.waterStationId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="BaseWellInfor.wellCategory === '0'"
          label="配水间:"
        >
          <el-select
            v-model="BaseWellInfor.distributionRoomId"
            clearable
            placeholder="请选择配水间"
            style="width:150px"
            size="small"
          >
            <el-option
              v-for="item in distributionRoomIdOptions"
              :key="item.distributionRoomId"
              :label="item.distributionRoomName"
              :value="item.distributionRoomId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="经度:">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellInfor.longitude"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellInfor.latitude"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="海拔高度(M):">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellInfor.altitude"
            style="width: 150px"
          />
        </el-form-item>
      </el-form>
      <el-form label-position="right" label-width="120px">
        <el-form-item label="备注:">
          <el-input
            size="small"
            v-model="BaseWellInfor.remark"
            style="width: 720px"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveAddBaseWellInfor(), addBaseWellInforClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addBaseWellInforVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      BaseWellInfor: {
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
      //井场ID
      wellSiteIdOptions: [],
      //注水站ID
      waterStationIdOptions: [],
      //配水间ID
      distributionRoomIdOptions: []
    };
  },
  methods: {
    // 对话框父子组件传值
    addBaseWellInforClose() {
      this.$emit("BaseWellInforRowClose");
    },
    // 保存修改后的信息
    saveAddBaseWellInfor() {
      this.postRequest("/basWellInfor/insert", this.BaseWellInfor).then(
        resp => {
          if (resp) {
            this.$message({
              message: "功图诊断参数新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("功图诊断参数新增失败，请重新提交!");
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
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
