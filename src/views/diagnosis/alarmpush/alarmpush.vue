<template>
  <!--  报警推送页面  -->
  <div class="AlarmPush">
    <el-form class="AlarmPush_form" :model="termForm" :inline="true">
      <el-form-item>
        <el-date-picker
          size="medium"
          v-model="termForm.prodDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="AlarmPushSearch()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="AlarmPush_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="AlarmPushDate"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border
      height="87%"
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="100"
        align="center"
        type="index"
        :index="
          (index) => {
            return index + 1 + (this.currentPage - 1) * this.pageSize;
          }
        "
      />
      <el-table-column
        prop="title"
        label="报警标题"
        min-width="10%"
        align="center"
      />
      <el-table-column
        prop="length"
        label="报警数量"
        min-width="10%"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="报警时间"
        min-width="10%"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="是否确认"
        min-width="10%"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.state == false" style="color: #FF0000">未确认</p>
          <p v-if="scope.row.state == true" style="color: #409eff">已确认</p>
        </template></el-table-column
      >
      <el-table-column label="操作" min-width="10%" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="alarmPushDetails(scope.row)"
            >查看详情</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.prevent="commitStatus(scope.row)"
            >确认</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="AlarmPush_page">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增 -->
    <!-- <common-add-AlarmPush
      :addAlarmPushVisible="addAlarmPushVisible"
      @AlarmPushRowClose="addAlarmPushClose"
    /> -->
    <!-- 编辑 -->
    <alarm-push-details
      :alarmPushDetailsVisible="alarmPushDetailsVisible"
      :editData="alarmPushDetailsData"
      @AlarmPushRowClose="alarmPushDetailsClose"
    />
    <!-- 异常参数设置 -->
    <!-- <common-edit-ylYccs
      :editYlYccsVisible="editYlYccsVisible"
      :editData="editYlYccsData"
      @ylYccsRowClose="editYlYccsClose"
    /> -->
  </div>
</template>
<script>
// import CommonAddAlarmPush from "../../..//components/diagnosis/knowledge/AlarmPush/CommonAddAlarmPush";
import AlarmPushDetails from "../../..//components/diagnosis/alarmpush/AlarmPushDetails";
// import CommonEditYlYccs from "../../..//components/diagnosis/knowledge/AlarmPush/CommonEditYlYccs";
export default {
  components: {
    // CommonAddAlarmPush,
    AlarmPushDetails,
    // CommonEditYlYccs,
  },
  data() {
    return {
      //搜索框数据
      termForm: {
        oilStationId: "",
        wellId: "",
        prodDate: "",
      },
      //用于判断查询条件是否改变
      oldOrgName: "",
      oldProdDate: "",
      //采油站下拉框数据
      orgNameData: [],
      //单井下拉框数据
      wellOptions: [],
      //表格数据
      AlarmPushDate: [],
      //液量异常筛选参数
      ylYccsDate: {},
      orgName: "",
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 异常筛选参数设置编辑
      editYlYccsVisible: false,
      editYlYccsData: {},
      // 编辑
      alarmPushDetailsVisible: false,
      alarmPushDetailsData: {},
      //新增
      addAlarmPushVisible: false,
    };
  },
  created() {
    this.AlarmPushSearch();
    this.orgNameInit();
    this.waterSelectInit();
  },
  methods: {
    //条件查询
    AlarmPushSearch() {
      this.getRequest(
        "/ChatRecord/alarmQuery?currentPage=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&time=" +
          this.termForm.prodDate
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.AlarmPushDate = resp.data.chatRecordList;
          this.total = resp.data.count;
          this.currentPage = resp.data.currentPage;
          this.pageSize = resp.data.pageSize;
          console.log(this.AlarmPushDate[0].content.length);
          //   console.log(this.AlarmPushDate[0].content.length);
          this.AlarmPushDate.forEach((item) => {
            console.log(item.content.length);
            item.length = item.content.length;
            //   item.add("num",item.content.length);
          });
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
          let oilAll = {
            oilStationId: "",
            oilStationName: "全站",
          };
          this.orgNameData.push(oilAll);
        }
      });
    },
    // //单井下拉框初始化
    // wellOptionsInit() {
    //   this.getRequest("/basWellInfor/selectWater").then((resp) => {
    //     this.loading = false;
    //     if (resp) {
    //       this.wellOptions = resp.data;
    //     }
    //   });
    // },
    //单井根据采油站变化
    queryWellNameByOrgName(val) {
      this.getRequest("/basWellInfor/selectWaterById?oilStationId=" + val).then(
        (resp) => {
          if (resp) {
            this.wellOptions = resp.data;
          }
        }
      );
    },
    //单井下拉框初始化
    waterSelectInit() {
      this.getRequest("/basWellInfor/selectOptionsAll").then((resp) => {
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.AlarmPushSearch();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      this.AlarmPushSearch();
    },
    // 报警消息详情
    alarmPushDetails(val) {
      console.log(val);
      this.alarmPushDetailsData = val;
      this.alarmPushDetailsVisible = true;
    },
    // 关闭编辑框
    alarmPushDetailsClose() {
      this.alarmPushDetailsVisible = false;
      this.AlarmPushSearch();
    },
    commitStatus(val) {
      console.log(val);
      this.$confirm("确认该报警信息", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.putRequest(
            "/ChatRecord/changeState?chatRecordId=" + val.chatRecordId
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "确认成功!",
              });
            }
            this.AlarmPushSearch();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消确认",
          });
        });
    },
    //设置序号
    getIndex() {
      this.AlarmPushDate.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/alarmpush/alarmpush.css";
</style>