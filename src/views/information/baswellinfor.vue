<template>
  <!-- 单井信息 -->
  <div class="basewellinfor">
    <!-- 条件查询 -->
    <el-form class="basewellinfor_form" v-model="termData" :inline="true">
      <el-form-item label="井号">
        <el-input
          v-model="termData.wellName"
          clearable
          style="width: 150px"
          size="medium"
          placeholder="井号"
        />
      </el-form-item>
      <el-form-item label="井类别">
        <el-select
          v-model="termData.wellCategory"
          clearable
          placeholder="请选择井类别"
          style="width: 150px"
          size="medium"
        >
          <el-option
            v-for="item in wellCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="采油站">
        <el-select
          v-model="termData.oilStationName"
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
            :value="item.oilStationName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchBaseWellInfor()"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBaseWellInfor()"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-download"
          @click="handleExport()"
          >导出</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-upload
          action="/dbznyt/basWellInfor/import"
          accept=".xls,.xlsx"
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" icon="el-icon-upload2" type="primary"
            >导入</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
    <el-table
      class="basewellinfor_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="BaseWellInforData"
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
        prop="wellName"
        align="center"
        label="井号"
        width="100"
      />
      <el-table-column
        prop="wellSiteName"
        align="center"
        label="井场"
        width="150"
      />
      <el-table-column
        prop="oilStationName"
        align="center"
        label="采油站"
        width="150"
      />
      <el-table-column
        v-if="
          this.termData.wellCategory == 0 ||
          this.termData.wellCategory == 2 ||
          this.termData.wellCategory == 4
        "
        prop="waterStationName"
        align="center"
        label="注水站"
        width="100"
      />
      <el-table-column
        v-if="
          this.termData.wellCategory == 0 ||
          this.termData.wellCategory == 2 ||
          this.termData.wellCategory == 4
        "
        prop="distributionRoomName"
        align="center"
        label="配水间"
        width="100"
      />
      <el-table-column
        prop="wellDepth"
        align="center"
        label="井深"
        width="100"
      />
      <el-table-column
        prop="productionDate"
        align="center"
        label="投产日期"
        width="140"
      />
      <el-table-column
        prop="wellCategory"
        align="center"
        label="井类别"
        width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.wellCategory == '0'">注水井</p>
          <p v-if="scope.row.wellCategory == '1'">油井</p>
          <p v-if="scope.row.wellCategory == '2'">回注井</p>
          <p v-if="scope.row.wellCategory == '3'">勘探井</p>
          <p v-if="scope.row.wellCategory == '4'">水源井</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="wellType"
        align="center"
        label="井类型"
        width="100"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.wellType == '0'">旧井</p>
          <p v-if="scope.row.wellType == '1'">新井</p>
          <p v-if="scope.row.wellType == '2'">遗留井</p>
        </template></el-table-column
      >
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
      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editBaseWellInfor(scope.row)"
            class="iconfont icon-bianji"
          />
          <el-button
            type="text"
            size="small"
            @click="BaseWellInforDelete(scope.row)"
            class="iconfont icon-shanchu"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="baseWellInfor_page">
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
    <common-add-baseWellInfor
      :addBaseWellInforVisible="addBaseWellInforVisible"
      @BaseWellInforRowClose="addBaseWellInforClose"
    />
    <!-- 编辑 -->
    <common-edit-baseWellInfor
      :editBaseWellInforVisible="editBaseWellInforVisible"
      :editData="editBaseWellInforData"
      @BaseWellInforRowClose="editBaseWellInforClose"
    />
  </div>
</template>
<script>
import CommonAddBaseWellInfor from "../..//components/baseinformation/basewell/CommonAddBaseWellInfor";
import CommonEditBaseWellInfor from "../..//components/baseinformation/basewell/CommonEditBaseWellInfor";
export default {
  components: {
    CommonAddBaseWellInfor,
    CommonEditBaseWellInfor,
  },
  data() {
    return {
      termData: {
        wellName: "",
        wellCategory: "",
        oilStationName: "",
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
        {
          value: "2",
          label: "回注井",
        },
        {
          value: "3",
          label: "勘探井",
        },
        {
          value: "4",
          label: "水源井",
        },
      ],

      BaseWellInforData: [],
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editBaseWellInforVisible: false,
      editBaseWellInforData: {},
      //新增
      addBaseWellInforVisible: false,
    };
  },
  created() {
    this.BaseWellInforInit();
    this.orgNameInit();
  },
  methods: {
    // 根据输入信息查询
    searchBaseWellInfor() {
      this.getRequest(
        "/basWellInfor/selectVo?current=" +
          this.currentPage +
          "&oilStationName=" +
          this.termData.oilStationName +
          "&pageSize=" +
          this.pageSize +
          "&wellCategory=" +
          this.termData.wellCategory +
          "&wellName=" +
          this.termData.wellName
      ).then((resp) => {
        if (resp) {
          this.BaseWellInforData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    BaseWellInforInit() {
      this.getRequest(
        "/basWellInfor/selectVo?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.BaseWellInforData = resp.data.records;
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
      this.searchBaseWellInfor();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchBaseWellInfor();
    },
    // 编辑
    editBaseWellInfor(val) {
      this.editBaseWellInforData = val;
      this.editBaseWellInforVisible = true;
    },
    // 关闭编辑框
    editBaseWellInforClose() {
      this.editBaseWellInforVisible = false;
    },
    //新增
    addBaseWellInfor() {
      this.addBaseWellInforVisible = true;
      this.BaseWellInforInit();
    },
    //关闭新增框
    addBaseWellInforClose() {
      this.addBaseWellInforVisible = false;
    },
    //获取序号
    getIndex() {
      this.BaseWellInforData.forEach((item, index) => {
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
    //区队（采油站）ID下拉框数据查询
    oilStationInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.oilStationIdOptions = resp.data;
        }
      });
    },
    //删除某行数据（逻辑删除）
    BaseWellInforDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/basWellInfor/delete?wellId=" + val.wellId).then(
            (resp) => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
              this.searchBaseWellInfor();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //文件下载
    fileOpen() {
      window.open(
        "http://localhost:8692/dnznyt/basWellInfor/export" +
          "?oilStationName=" +
          this.termData.oilStationName +
          "&wellCategory=" +
          this.termData.wellCategory +
          "&wellName=" +
          this.termData.wellName
      );
    },
    //文件下载
    handleExport() {
      var elemIF = document.createElement("iframe");
      elemIF.src =
        "/dbznyt/basWellInfor/export" +
        "?oilStationName=" +
        this.termData.oilStationName +
        "&wellCategory=" +
        this.termData.wellCategory +
        "&wellName=" +
        this.termData.wellName;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      // 当多余一个的时候替换文件
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.$message({
          type: "success",
          message: response.message + "，上传了" + response.data + "条数据",
        });
      } else {
        this.$message({
          type: "info",
          message: response.message + "，" + response.data,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/information/wellinfor.css";
</style>