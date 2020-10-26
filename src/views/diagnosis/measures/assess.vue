<template>
  <div class="system">
    <div align="center">
      <!-- 条件查询 -->
      <el-form class="role_form" v-model="termData" :inline="true">
        <el-form-item label="井名">
          <el-input
            v-model="termData.wellName"
            clearable
            size="small"
            placeholder="井名"
          ></el-input>
        </el-form-item>
        <el-form-item label="井类别">
          <el-select
            v-model="termData.wellCategory"
            clearable
            placeholder="请选择井类别"
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

        <el-form-item label="采油站">
          <el-select
            v-model="termData.oilStationName"
            clearable
            placeholder="全区"
            size="small"
          >
            <el-option
              v-for="item in orgNameData"
              :key="item.orgName"
              :label="item.orgName"
              :value="item.orgName"
            >
            </el-option>
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
        
        <el-form-item
          method="POST"
          enctype="multipart/form-data"
          action="/demo/basWellInfor/import"
          target="uploadFrame1"
        >
          <input type="file" name="file" value="选择文件" />
          <input type="submit" name="press" value="上传到服务器" />
        </el-form-item>
        <iframe
          id="uploadFrame"
          name="uploadFrame"
          style="display:none;"
        ></iframe>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="fileOpen()"
          >导出1</el-button
        >
        <el-link :udeerline="false" :href="url" download="" target="_blank">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="fileExport()"
            >导出2</el-button
          >
        </el-link>
        <el-button
          size="mini"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleExport()"
          >导出3</el-button
        >
        <el-button
          size="mini"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="exportBill()"
          >导出4</el-button
        >
        <el-button
          size="mini"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="download()"
          >导出5</el-button
        >

      </el-form>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="BaseWellInforData"
        height="500px"
        border
        lazy
        style="width:100%;"
      >
        <el-table-column prop="index" align="center" label="序号" width="80">
        </el-table-column>
        <el-table-column
          prop="wellName"
          align="center"
          label="井号"
          width="100"
        />
        <el-table-column
          prop="wellSiteName"
          align="center"
          :formatter="formatDate"
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
          prop="creator"
          align="center"
          label="井深"
          width="100"
        />
        <el-table-column
          prop="productionDate"
          align="center"
          label="投产日期"
          width="150"
        />
        <el-table-column
          prop="wellCategory"
          align="center"
          label="井类别"
          width="100"
        />
        <el-table-column
          prop="wellType"
          align="center"
          label="井类型"
          width="100"
        />
        <el-table-column
          prop="longitude"
          align="center"
          label="经度"
          width="100"
        />
        <el-table-column
          prop="latitude"
          align="center"
          label="纬度"
          width="100"
        />
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.designee === null"
              type="text"
              size="small"
              @click="BaseWellInforRelease(scope.row)"
              >发布</el-button
            >
            <el-button
              v-if="scope.row.designee !== null"
              type="text"
              size="small"
              @click="BaseWellInforRelease(scope.row)"
              >设计模板下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="BaseWellInfor_page" align="center">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      excelFile: [],
      termData: {
        wellName: "",
        wellCategory: "",
        oilStationName: "",
        file: ""
      },
      file: [],
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
      fileList: [],
      downloadFile: {},
      BaseWellInforData: [],
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      url: "/demo/excl/derive",
      path: "/demo/excl/derive"
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
      ).then(resp => {
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
      ).then(resp => {
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
    getIndex() {
      this.BaseWellInforData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    },
    //采油站下拉框数据查询
    orgNameInit() {
      this.getRequest("/knowledge/DiagnosticParametersGt/CdWellSource").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.orgNameData = resp.data;
          }
        }
      );
    },
    fileOpen(){
      window.open("http://localhost:8692/demo/basWellInfor/export");
    },
    //      导出订单
    exportBill: function() {
      let url_post = "/basWellInfor/export";
      let params_post = {
        orderStartDate:
          this.timepickerDateFormat(this.rangeTime[0]) ||
          this.rangeTime[0] ||
          "",
        orderEndDate:
          this.timepickerDateFormat(this.rangeTime[1]) ||
          this.rangeTime[1] ||
          "",
        prodCode: this.prodId,
        promoteFlag: this.promotionSiteId,
        policyStatusList: this.tableBillStateCheckedData
      };
      Vue.axios
        .post(url_post, params_post, { responseType: "arraybuffer" })
        .then(res => {
          // let fileName = res.headers["content-disposition"].match(
          //   /fushun(\S*)xls/
          // )[0];

          // fileDownload(res.data, fileName);
          //如果用方法一 ，这里需要安装 npm install js-file-download --save ,然后引用 var fileDownload = require('js-file-download')，使用详情见github;
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        })
        .catch(function(res) {});
    }
  }
};
</script>
<style lang="less" scoped></style>
