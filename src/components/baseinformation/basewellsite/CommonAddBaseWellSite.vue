<template>
  <el-dialog
    title="井场信息新增"
    :visible.sync="addBaseWellSiteVisible"
    width="60%"
    @opened="opens"
    :before-close="addBaseWellSiteClose"
  >
    <div class="dialogDiv">
      <el-form
        label-position="right"
        label-width="120px"
        :inline="true"
      >
        <el-form-item label="井场名称:">
          <el-input
            size="small"
            v-model="BaseWellSite.wellSiteName"
            style="width:150px"
          />
        </el-form-item>
        <el-form-item label="采油站名称:">
          <el-select
            v-model="BaseWellSite.oilStationId"
            clearable
            filterable
            style="width:150px"
            placeholder="全区"
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
      </el-form>
      <el-form :inline="true">
        <el-form-item label="油罐数量">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellSite.tankNum"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="油罐总容量(M3)">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellSite.totalCapacity"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="建成日期:">
          <el-date-picker
            v-model="BaseWellSite.completionDate"
            type="date"
            placeholder="建成日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 150px"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        </el-form>
      <el-form :inline="true">
        <el-form-item label="经度:">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellSite.longitude"
            style="width: 150px"
          />
        </el-form-item>
         <el-form-item label="井场位置:">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellSite.position"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellSite.latitude"
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="海拔高度(M):">
          <el-input
            size="small"
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            v-model="BaseWellSite.altitude"
            style="width: 150px"
          />
        </el-form-item>
        </el-form>
      <el-form>
        <el-form-item label="是否有效">
          <el-select
            v-model="BaseWellSite.active"
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
            v-model="BaseWellSite.remark"
            style="width:400px"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveAddBaseWellSite(), addBaseWellSiteClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addBaseWellSiteVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      BaseWellSite: {
        waterStationName:"",
        oilStationId:"",
        totalCapacity:"",
        completionDate:"",
        position:"",
        longitude:"",
        latitude:"",
        altitude:"",
        active:"",
        remark:"",
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
      //区队ID
      oilStationIdOptions: [],
      
    };
  },
  methods: {
    // 对话框父子组件传值
    addBaseWellSiteClose() {
      this.$emit("BaseWellSiteRowClose");
    },
    // 保存修改后的信息
    saveAddBaseWellSite() {
      this.postRequest("/basWellSiteInfor/wellSite", this.BaseWellSite).then(
        resp => {
          if (resp) {
            this.$message({
              message: "井场信息新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("井场信息新增失败，请重新提交!");
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
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
