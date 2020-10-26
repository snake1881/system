<template>
  <div class="system">
    <div align="center">
      <!-- 条件查询 -->
      <el-form class="role_form" v-model="termData" :inline="true">
        <el-form-item label="日期" size="medium">
          <el-date-picker
            v-model="termData.chooseDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchMeasures()"
          >查询</el-button
        >
      </el-form>
      <el-divider content-position="center"  ><h2>措施发布</h2></el-divider>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="MeasuresData"
        height="500px"
        border
        lazy
        style="width:100%;"
      >
        <el-table-column prop="index" align="center" label="序号" width="80">
        </el-table-column>
        <el-table-column
          prop="wellCommonName"
          align="center"
          label="井号"
          width="130"
        />
        <el-table-column
          prop="prodDate"
          align="center"
          :formatter="formatDate"
          label="日期"
          width="150"
        />
        <el-table-column
          prop="measure"
          align="center"
          label="措施"
          width="170"
        />
        <el-table-column
          prop="creator"
          align="center"
          label="创建人"
          width="150"
        />
        <el-table-column
          prop="startDate"
          align="center"
          label="措施开始时间"
          width="150"
        />
        <el-table-column
          prop="endDate"
          align="center"
          label="措施完工时间"
          width="150"
        />
        <el-table-column
          prop="designee"
          align="center"
          label="指派人"
          width="150"
        />
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.designee===null"
              type="text"
              size="small"
              @click="measuresRelease(scope.row)"
              >发布</el-button
            >
            <el-button
              v-if="scope.row.designee!==null"
              type="text"
              size="small"
              @click="planDownload()"
              >设计模板下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="Measures_page" align="center">
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
      <!-- 措施发布 -->
    <common-measures-release
      :measuresReleaseVisible="measuresReleaseVisible"
      :releaseData="measuresReleaseData"
      @measuresReleaseRowClose="measuresReleaseClose"
    />
      <!-- 措施发布 -->
    <common-plan-download
      :planDownloadVisible="planDownloadVisible"
      @planDownloadRowClose="planDownloadClose"
    />
    </div>
  </div>
</template>
<script>
import CommonPlanDownload from "../../../components/diagnosis/measure/CommonPlanDownload";
import CommonMeasuresRelease from "../../../components/diagnosis/measure/CommonMeasureRelease";
export default {
   components: {
    CommonMeasuresRelease,
    CommonPlanDownload
  },
  data() {
    return {
      termData: {
        chooseDate: ""
      },
      MeasuresData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 20,
      total: 0,
      //措施发布
      measuresReleaseVisible: false,
      measuresReleaseData: {},
      //
      planDownloadVisible:false,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.MeasuresInit();
  },
  methods: {
    // 根据输入信息查询
    searchMeasures() {
      this.getRequest(
        "/measures/measure/measureRecordPage?beginDate=" +
          this.termData.chooseDate[0] +
          "&current=" +
          this.currentPage +
          "&endDate=" +
          this.termData.chooseDate[1] +
          "&pagSeize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.MeasuresData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },

    //表格数据初始化
    MeasuresInit() {
      this.getRequest(
        "/measures/measure/measureRecordPage?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.MeasuresData = resp.data.records;
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
      this.searchMeasures();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchMeasures();
    },
    //措施发布
    measuresRelease(val) {
      this.measuresReleaseData = val;
      this.measuresReleaseVisible = true;
    },
    //关闭措施发布
    measuresReleaseClose() {
      this.measuresReleaseVisible = false;
    },
    //
    planDownload() {
      this.planDownloadVisible = true;
    },
    //
    planDownloadClose() {
      this.planDownloadVisible = false;
    },
    //设置序号并设置时间显示格式
    getIndex() {
      this.MeasuresData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize; 
        item.prodDate = item.prodDate.slice(0, 10);
        // if (item.startDate !== null) {
        //   item.startDate = item.startDate.slice(0, 10);
        // }
        // if (item.endTime !== null) {
        //   item.endDate = item.endDate.slice(0, 10);
        // }
        return item;
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
