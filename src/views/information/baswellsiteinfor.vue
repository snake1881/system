<template>
  <!-- 井场信息 -->
  <div class="BaseWellSite" align="center">
    <!-- 条件查询 -->
    <el-form class="role_form" v-model="termData" :inline="true">
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBaseWellSite()"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item label="井场名称">
        <el-input
          v-model="termData.wellSiteName"
          clearable
          style="width:150px"
          size="small"
          placeholder="请输入井场"
        ></el-input>
      </el-form-item>
      <el-form-item label="采油站">
        <el-select
          v-model="termData.oilStationId"
          clearable
          filterable
          style="width:150px"
          placeholder="全区"
          size="small"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          >
          </el-option>
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
      <!-- <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="fileOpen()"
          >导出</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="/demo/basWellInfor/import"
          accept=".xls,.xlsx"
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" icon="el-icon-upload2" type="primary"
            >导入</el-button
          >
        </el-upload>
      </el-form-item> -->
      <!-- <el-form
        id="upload"
        method="POST"
        enctype="multipart/form-data"
        action="/demo/basWellInfor/import"
      >
        <el-input
          type="file"
          size="small"
          name="file"
          style="width:200px"
          value="选择文件"
        />
        <el-input
          type="submit"
          size="small"
          name="press"
          style="width:80px"
          value="导入"
        />
      </el-form> -->
    </el-form>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="BaseWellSiteData"
      height="500px"
      border
      lazy
      style="width:100%;"
    >
      <el-table-column prop="index" align="center" label="序号" width="60">
      </el-table-column>
      <!-- <el-table-column
        prop="waterStationId"
        align="center"
        label="注水站编号"
        width="150"
      /> -->
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
      >
      </el-table-column>
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
      <el-table-column
        prop="latitude"
        align="center"
        label="纬度"
        width="80"
      />
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope"
          ><el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="editBaseWellSite(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="BaseWellSiteDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="BaseWellSite_page" align="center">
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
    CommonEditBaseWellSite
  },
  data() {
    return {
      termData: {
        wellSiteName: "",
        oilStationId: ""
      },
      file: [],
      fileList: [],
      loading: true,
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
      addBaseWellSiteVisible: false
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
      ).then(resp => {
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
      ).then(resp => {
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
      this.getRequest("/basOilStationInfor/oilStationOptions").then(resp => {
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
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/basWellSiteInfor/wellSite?wellSiteId=" + val.wellSiteId).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.searchBaseWellSite();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
    // //文件下载
    // fileOpen() {
    //   window.open("http://localhost:8692/demo/basWellInfor/export");
    // },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    // handleChange(file, fileList) {
    //   // 当多余一个的时候替换文件
    //   if (fileList.length > 1) {
    //     fileList.splice(0, 1);
    //   }
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 1 个文件，本次选择了 ${
    //       files.length
    //     } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    //   );
    // },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    // handleSuccess(response, file, fileList) {
    //   if (response.code === 200) {
    //     this.$message({
    //       type: "success",
    //       message: response.message + "，上传了" + response.data + "条数据"
    //     });
    //   } else {
    //     this.$message({
    //       type: "info",
    //       message: response.message + "，" + response.data
    //     });
    //   }
    // }
  }
};
</script>
<style lang="less" scoped></style>
