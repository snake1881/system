<template>
  <!-- 注水站信息-->
  <div class="BaseWaterStation">
    <!-- 条件查询 -->
    <el-form class="BaseWaterStation_form" v-model="termData" :inline="true">
      <el-form-item label="注水站名称">
        <el-input
          v-model="termData.waterStationName"
          clearable
          style="width: 150px"
          size="medium"
          placeholder="井号"
        />
      </el-form-item>
      <el-form-item label="采油站">
        <el-select
          v-model="termData.oilStationId"
          clearable
          filterable
          style="width: 150px"
          placeholder="全区"
          size="medium"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchBaseWaterStation()"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBaseWaterStation()"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="BaseWaterStation_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="BaseWaterStationData"
      height="85%"
      border
      lazy
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="index" align="center" label="序号" width="80" />
      <el-table-column
        prop="waterStationName"
        align="center"
        label="注水站名称"
        width="180"
      />
      <el-table-column
        prop="oilStationName"
        align="center"
        label="采油站"
        width="150"
      />
      <el-table-column
        prop="injectionScale"
        align="center"
        label="注水规模(M3)"
        width="150"
      />
      <el-table-column
        prop="startDate"
        align="center"
        label="投用日期"
        width="200"
      />

      <el-table-column
        prop="altitude"
        align="center"
        label="海拔高度"
        width="120"
      />
      <el-table-column
        prop="longitude"
        align="center"
        label="经度"
        width="120"
      />
      <el-table-column
        prop="latitude"
        align="center"
        label="纬度"
        width="120"
      />
      <el-table-column align="center" label="操作" min-width="180">
        <template slot-scope="scope"
          ><el-button
            type="text"
            size="small"
            @click="editBaseWaterStation(scope.row)"
            class="iconfont icon-bianji"
          />
          <el-button
            type="text"
            size="small"
            @click="BaseWaterStationDelete(scope.row)"
            class="iconfont icon-shanchu"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="BaseWaterStation_page">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增 -->
    <common-add-BaseWaterStation
      :addBaseWaterStationVisible="addBaseWaterStationVisible"
      @BaseWaterStationRowClose="addBaseWaterStationClose"
    />
    <!-- 编辑 -->
    <common-edit-BaseWaterStation
      :editBaseWaterStationVisible="editBaseWaterStationVisible"
      :editData="editBaseWaterStationData"
      @BaseWaterStationRowClose="editBaseWaterStationClose"
    />
  </div>
</template>
<script>
import CommonAddBaseWaterStation from "../..//components/baseinformation/basewaterstation/CommonAddBaseWaterStation";
import CommonEditBaseWaterStation from "../..//components/baseinformation/basewaterstation/CommonEditBaseWaterStation";
export default {
  components: {
    CommonAddBaseWaterStation,
    CommonEditBaseWaterStation,
  },
  data() {
    return {
      termData: {
        waterStationName: "",
        oilStationId: "",
      },
      file: [],
      fileList: [],
      loading: true,
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

      BaseWaterStationData: [],
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editBaseWaterStationVisible: false,
      editBaseWaterStationData: {},
      //新增
      addBaseWaterStationVisible: false,
    };
  },
  created() {
    this.orgNameInit();
    this.BaseWaterStationInit();
  },
  methods: {
    // 根据输入信息查询
    searchBaseWaterStation() {
      this.getRequest(
        "/basWaterStationInfor/byTerm?current=" +
          this.currentPage +
          "&oilStationId=" +
          this.termData.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&waterStationName=" +
          this.termData.waterStationName
      ).then((resp) => {
        if (resp) {
          this.BaseWaterStationData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    BaseWaterStationInit() {
      this.getRequest(
        "/basWaterStationInfor/byTerm?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.BaseWaterStationData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchBaseWaterStation();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchBaseWaterStation();
    },
    // 编辑
    editBaseWaterStation(val) {
      this.editBaseWaterStationData = val;
      this.editBaseWaterStationVisible = true;
    },
    // 关闭编辑框
    editBaseWaterStationClose() {
      this.editBaseWaterStationVisible = false;
    },
    //新增
    addBaseWaterStation() {
      this.addBaseWaterStationVisible = true;
      this.BaseWaterStationInit();
    },
    //关闭新增框
    addBaseWaterStationClose() {
      this.addBaseWaterStationVisible = false;
    },
    //获取序号
    getIndex() {
      this.BaseWaterStationData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    },
    //采油站下拉框数据查询
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    //删除某行数据（逻辑删除）
    BaseWaterStationDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest(
            "/basWaterStationInfor/waterStation?waterStationId=" +
              val.waterStationId
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.searchBaseWaterStation();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/information/waterstationinfor.css";
</style>
