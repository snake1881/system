<template>
  <!-- 井场信息 -->
  <div class="BaseWellSite">
    <!-- 条件查询 -->
    <el-form class="BaseWellSite_form" v-model="termData" :inline="true">
      <el-form-item label="井场名称">
        <el-input
          v-model="termData.wellSiteName"
          clearable
          style="width: 150px"
          size="medium"
          placeholder="请输入井场"
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
          @click="searchBaseWellSite()"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBaseWellSite()"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="BaseWellSite_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="BaseWellSiteData"
      height="85%"
      border
      lazy
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="index" align="center" label="序号" width="60" />
      <el-table-column
        prop="wellSiteName"
        align="center"
        label="井场名称"
        width="180"
      />
      <el-table-column
        prop="oilStationName"
        align="center"
        label="采油站"
        width="150"
      />
      <el-table-column
        prop="tankNum"
        align="center"
        label="油罐数量"
        width="80"
      />
      <el-table-column
        prop="totalCapacity"
        align="center"
        label="油罐总容量(M3)"
        width="140"
      />
      <el-table-column
        prop="completionDate"
        align="center"
        label="建成日期"
        width="180"
      />
      <el-table-column
        prop="position"
        align="center"
        label="井场位置"
        width="100"
      />
      <el-table-column
        prop="altitude"
        align="center"
        label="海拔高度"
        width="80"
      />
      <el-table-column
        prop="longitude"
        align="center"
        label="经度"
        width="80"
      />
      <el-table-column prop="latitude" align="center" label="纬度" width="80" />
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope"
          ><el-button
            type="text"
            size="small"
            @click="editBaseWellSite(scope.row)"
            class="iconfont icon-bianji"
          />
          <el-button
            type="text"
            size="small"
            @click="BaseWellSiteDelete(scope.row)"
            class="iconfont icon-shanchu"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="BaseWellSite_page">
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
    <common-add-BaseWellSite
      :addBaseWellSiteVisible="addBaseWellSiteVisible"
      @BaseWellSiteRowClose="addBaseWellSiteClose"
    />
    <!-- 编辑 -->
    <common-edit-BaseWellSite
      :editBaseWellSiteVisible="editBaseWellSiteVisible"
      :editData="editBaseWellSiteData"
      @BaseWellSiteRowClose="editBaseWellSiteClose"
    />
  </div>
</template>
<script>
import CommonAddBaseWellSite from "../..//components/baseinformation/basewellsite/CommonAddBaseWellSite";
import CommonEditBaseWellSite from "../..//components/baseinformation/basewellsite/CommonEditBaseWellSite";
export default {
  components: {
    CommonAddBaseWellSite,
    CommonEditBaseWellSite,
  },
  data() {
    return {
      termData: {
        wellSiteName: "",
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

      BaseWellSiteData: [],
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editBaseWellSiteVisible: false,
      editBaseWellSiteData: {},
      //新增
      addBaseWellSiteVisible: false,
    };
  },
  created() {
    this.orgNameInit();
    this.BaseWellSiteInit();
  },
  methods: {
    // 根据输入信息查询
    searchBaseWellSite() {
      this.getRequest(
        "/basWellSiteInfor/wellSites?current=" +
          this.currentPage +
          "&oilStationId=" +
          this.termData.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&wellSiteName=" +
          this.termData.wellSiteName
      ).then((resp) => {
        if (resp) {
          this.BaseWellSiteData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    BaseWellSiteInit() {
      this.getRequest(
        "/basWellSiteInfor/wellSites?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.BaseWellSiteData = resp.data.records;
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
      this.searchBaseWellSite();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchBaseWellSite();
    },
    // 编辑
    editBaseWellSite(val) {
      this.editBaseWellSiteData = val;
      this.editBaseWellSiteVisible = true;
    },
    // 关闭编辑框
    editBaseWellSiteClose() {
      this.editBaseWellSiteVisible = false;
    },
    //新增
    addBaseWellSite() {
      this.addBaseWellSiteVisible = true;
      this.BaseWellSiteInit();
    },
    //关闭新增框
    addBaseWellSiteClose() {
      this.addBaseWellSiteVisible = false;
    },
    //获取序号
    getIndex() {
      this.BaseWellSiteData.forEach((item, index) => {
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
    BaseWellSiteDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest(
            "/basWellSiteInfor/wellSite?wellSiteId=" + val.wellSiteId
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.searchBaseWellSite();
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
@import "../../assets/css/information/wellsiteinfor.css";
</style>
