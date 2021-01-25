<template>
  <el-dialog
    title="单井信息编辑"
    :visible.sync="editBaseWellInforVisible"
    width="60%"
    @opened="opens"
    :before-close="editBaseWellInforClose"
  >
    <div class="dialogDiv">
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="井号:">
          <el-input v-model="editData.wellName" style="width: 150px" />
        </el-form-item>
        <el-form-item label="层位:">
          <el-input v-model="editData.layerName" style="width: 150px" />
        </el-form-item>
        <el-form-item label="地理位置:">
          <el-input v-model="editData.location" style="width: 150px" />
        </el-form-item>
      </el-form>

      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="井深(M):">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.wellDepth"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="补心高(M):">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.bushHigh"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="人工井底(M):">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.wellBottom"
            style="width: 150px"
          />
        </el-form-item>
      </el-form>
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="投产/注水日期:">
          <el-date-picker
            v-model="editData.productionDate"
            type="date"
            placeholder="投产/注水日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="投转注日期:">
          <el-date-picker
            v-model="editData.conversionDate"
            type="date"
            placeholder="投转注日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="完井日期:">
          <el-date-picker
            v-model="editData.finishDate"
            type="date"
            placeholder="完井日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
          />
        </el-form-item>
      </el-form>
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="井类别">
          <el-select
            v-model="editData.wellCategory"
            clearable
            placeholder="请选择井类别"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in wellCategoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="井类型">
          <el-select
            v-model="editData.wellType"
            clearable
            placeholder="请选择井类型"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in wellTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="井性质">
          <el-select
            v-model="editData.wellNature"
            clearable
            placeholder="请选择井性质"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in wellNatureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="区队">
          <el-select
            @change="oilStationChange"
            v-model="editData.oilStationId"
            clearable
            placeholder="请选择区队"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in oilStationIdOptions"
              :key="item.oilStationId"
              :label="item.oilStationName"
              :value="item.oilStationId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="井场">
          <el-select
            v-model="editData.wellSiteId"
            clearable
            placeholder="请选择井场"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in wellSiteIdOptions"
              :key="item.wellSiteId"
              :label="item.wellSiteName"
              :value="item.wellSiteId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        label-position="right"
        label-width="120px"
        v-if="editData.wellCategory == '0'"
        :inline="true"
      >
        <el-form-item label="注水站">
          <el-select
            @change="waterStationIdChange"
            v-model="editData.waterStationId"
            clearable
            placeholder="请选择注水站"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in waterStationIdOptions"
              :key="item.waterStationId"
              :label="item.waterStationName"
              :value="item.waterStationId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="配水间">
          <el-select
            v-model="editData.distributionRoomId"
            clearable
            placeholder="请选择配水间"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="item in distributionRoomIdOptions"
              :key="item.distributionRoomId"
              :label="item.distributionRoomName"
              :value="item.distributionRoomId"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <el-form label-position="right" label-width="120px" :inline="true">
        <el-form-item label="经度:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.longitude"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.latitude"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="海拔高度(M):">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="editData.altitude"
            style="width: 150px"
          />
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="备注:">
          <el-input v-model="editData.remark" style="width: 690px" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveEditBaseWellInfor(), editBaseWellInforClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editBaseWellInforVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      //井类别(0:注水井,1:油井)
      wellCategoryOptions: [
        {
          value: "0",
          label: "注水井",
        },
        {
          value: "1",
          label: "油井",
        },
      ],
      //井类型(0:旧井)
      wellTypeOptions: [
        {
          value: "0",
          label: "旧井",
        },
        {
          value: "1",
          label: "新井",
        },
        {
          value: "2",
          label: "遗留井",
        },
      ],
      //井性质(0:投注,1:转注)[注水井]
      wellNatureOptions: [
        {
          value: "0",
          label: "投注",
        },
        {
          value: "1",
          label: "转注",
        },
      ],
      //区队ID
      oilStationIdOptions: [],
      //井场ID
      wellSiteIdOptions: [],
      //注水站ID
      waterStationIdOptions: [],
      //配水间ID
      distributionRoomIdOptions: [],
    };
  },
  methods: {
    // 对话框父子组件传值
    editBaseWellInforClose() {
      this.$emit("BaseWellInforRowClose");
    },
    // 保存修改后的信息
    saveEditBaseWellInfor() {
      this.putRequest("/basWellInfor/update", this.editData).then((resp) => {
        if (resp) {
          this.$message({
            message: "液量异常筛选条件信息修改成功!",
            type: "success",
          });
        } else {
          this.$message.error("液量异常筛选条件信息修改失败，请重新提交!");
        }
      });
    },
    //区队ID下拉框数据查询
    oilStationInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
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
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.waterStationIdOptions = resp.data;
        }
      });
    },
    //井场ID下拉框数据查询
    wellSiteInit() {
      this.getRequest("/basWellSiteInfor/wellSiteOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.wellSiteIdOptions = resp.data;
        }
      });
    },
    //注水站ID下拉框数据查询
    waterStationInit() {
      this.getRequest("/basWaterStationInfor/waterStationOptions").then(
        (resp) => {
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
      ).then((resp) => {
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
      ).then((resp) => {
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
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style>
.el-input {
  width: 700px;
}
</style>
