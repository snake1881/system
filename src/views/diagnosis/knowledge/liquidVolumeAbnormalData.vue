<template>
  <!--  液量异常参数筛选界面  -->
  <div class="liqFilterCondition">
    <el-form class="liqFilterCondition_form"  :model="termForm" :inline="true">
      <el-form-item >
        <el-select
          size="medium"
          v-model="termForm.orgName"
          filterable
          clearable
          placeholder="采油站"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-date-picker
          size="medium"
          v-model="termForm.prodDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="liqFilterConditionSearch()"
          >查询</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addLiqFilterCondition()"
          >新增</el-button
        >
        <el-button type="primary" size="small" @click="editYlYccs(ylYccsDate)"
          >异常参数设置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="liqFilterCondition_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liqFilterConditionDate"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border
      height="88%"
      style="width: 100%"
    >
      <el-table-column
        
        label="序号"
        width="100"
        align="center"
        type="index"
          :index="(index)=>{return (index+1) + (this.currentPage-1)*this.pageSize }"
      ></el-table-column>
      <el-table-column
        prop="wellName"
        label="井号"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="filter"
        label="条件（填写选定日期后可选择任意天）"
        width="480px"
        align="center"
      >
        <template scope="scope">
          <el-radio-group v-model="scope.row.filter">
            <el-radio label="0">昨日</el-radio>
            <el-radio label="1">上月</el-radio>
            <el-radio label="2">前三月</el-radio>
            <el-radio label="3">任意天</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        prop="appointDate"
        label="指定日期"
        width="320"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="editLiqFilterCondition(scope.row)"
            class="iconfont icon-bianji"
          />
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteLiqFilterCondition(scope.row)"
            class="iconfont icon-shanchu"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="liqFilterCondition_page">
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
    <common-add-liqFilterCondition
      :addLiqFilterConditionVisible="addLiqFilterConditionVisible"
      @liqFilterConditionRowClose="addLiqFilterConditionClose"
    />
    <!-- 编辑 -->
    <common-edit-liqFilterCondition
      :editLiqFilterConditionVisible="editLiqFilterConditionVisible"
      :editData="editLiqFilterConditionData"
      @liqFilterConditionRowClose="editLiqFilterConditionClose"
    />
    <!-- 异常参数设置 -->
    <common-edit-ylYccs
      :editYlYccsVisible="editYlYccsVisible"
      :editData="editYlYccsData"
      @ylYccsRowClose="editYlYccsClose"
    />
  </div>
</template>
<script>
import CommonAddLiqFilterCondition from "../../..//components/diagnosis/knowledge/liqfiltercondition/CommonAddLiqFilterCondition";
import CommonEditLiqFilterCondition from "../../..//components/diagnosis/knowledge/liqfiltercondition/CommonEditLiqFilterCondition";
import CommonEditYlYccs from "../../..//components/diagnosis/knowledge/liqfiltercondition/CommonEditYlYccs";
export default {
  components: {
    CommonAddLiqFilterCondition,
    CommonEditLiqFilterCondition,
    CommonEditYlYccs,
  },
  data() {
    return {
      //搜索框数据
      termForm: {
        orgName: "",
        prodDate: "",
      },
      isCreateNewUser: [
        { label: "昨日", value: 0 },
        { label: "上月", value: 1 },
        { label: "三个月", value: 2 },
        { label: "任意天", value: 3 },
      ],
      //用于判断查询条件是否改变
      oldOrgName: "",
      oldProdDate: "",
      //采油站名称
      orgNameData: [],
      //表格数据
      liqFilterConditionDate: [],
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
      editLiqFilterConditionVisible: false,
      editLiqFilterConditionData: {},
      //新增
      addLiqFilterConditionVisible: false,
    };
  },
  created() {
    this.liqFilterConditionInit();
    this.ylYccsInit();
    this.orgNameInit();
  },
  methods: {
    // 根据井名和日期删除
    deleteLiqFilterCondition(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest(
            "/liquidFilterCondition/delete?setDate=" +
              val.setDate +
              "&wellId=" +
              val.wellId
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.liqFilterConditionInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //表格数据初始化
    liqFilterConditionInit() {
      // console.log(this.termForm.prodDate);
      // if(this.termForm.prodDate==null){
      //   this.termForm.prodDate=""
      // }
      // console.log(this.termForm.prodDate);
      this.getRequest(
        "/liquidFilterCondition/select?current=" +
          this.currentPage +
          "&oilStationId=" +
          this.termForm.orgName +
          "&pageSize=" +
          this.pageSize +
          "&setDate=" +
          this.termForm.prodDate
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          // this.getIndex();
        }
      });
    },
    //条件查询
    liqFilterConditionSearch() {
      this.getRequest(
        "/liquidFilterCondition/select?current=" +
          this.currentPage +
          "&oilStationId=" +
          this.termForm.orgName +
          "&pageSize=" +
          this.pageSize +
          "&setDate=" +
          this.termForm.prodDate
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          // this.getIndex();
        }
      });
    },
    //液量异常筛选参数初始化
    ylYccsInit() {
      this.getRequest(
        "/abnormalParam/selectByType?typeDesc=%E4%BA%A7%E6%B6%B2%E9%87%8F"
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.ylYccsDate = resp.data;
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.liqFilterConditionSearch();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      this.liqFilterConditionSearch();
    },
    // 异常参数筛选设置编辑
    editYlYccs(val) {
      this.editYlYccsData = val;
      this.editYlYccsVisible = true;
    },
    // 关闭异常参数筛选编辑框
    editYlYccsClose() {
      this.editYlYccsVisible = false;
    },
    // 编辑
    editLiqFilterCondition(val) {
      this.editLiqFilterConditionData = val;
      this.editLiqFilterConditionVisible = true;
    },
    // 关闭编辑框
    editLiqFilterConditionClose() {
      this.editLiqFilterConditionVisible = false;
      this.liqFilterConditionInit();
    },
    //新增
    addLiqFilterCondition() {
      this.addLiqFilterConditionVisible = true;
      this.liqFilterConditionInit();
    },
    //关闭新增框
    addLiqFilterConditionClose() {
      this.addLiqFilterConditionVisible = false;
    },
    //设置序号
    getIndex() {
      this.liqFilterConditionDate.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/knowledge/liquidVolumeAbnormalData.css";
</style>