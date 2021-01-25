 <template>
  <div class="diagnosisData">
    <el-form class="diagnosisData_form" :model="termForm" :inline="true">
      <el-form-item>
        <el-input
          size="medium"
          v-model="termForm.modelName"
          filterable
          clearable
          placeholder="模块名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="diagnosisDataInit()"
          >查询</el-button
        >
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="addDiagnosisData()"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="diagnosisData_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="diagnosisData.records"
      border
      row-key="diadiagnosticStep"
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column
        prop="modelName"
        label="模块名称"
        width="140"
        align="center"
      />
      <el-table-column
        prop="diagnosisStep"
        label="诊断步骤"
        width="140"
        align="center"
      />
      <el-table-column prop="sequence" label="序号" width="80" align="center" />
      <el-table-column
        prop="diagnosisResult"
        label="诊断结果"
        width="280"
        align="center"
      />
      <el-table-column label="诊断依据" width="480" header-align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.diagnosisBasis" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editDiagnosisData(scope.row)"
            class="iconfont icon-bianji"
          />
          <el-button
            type="text"
            size="small"
            @click="deleteDiagnosisData(scope.row)"
            class="iconfont icon-shanchu"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="diagnosisData_page">
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
    <common-add-diagnosisData
      :addDiagnosisDataVisible="addDiagnosisDataVisible"
      @diagnosisDataRowClose="addDiagnosisDataClose"
    />
    <!-- 编辑 -->
    <common-edit-diagnosisData
      :editDiagnosisDataVisible="editDiagnosisDataVisible"
      :editData="editDiagnosisDataData"
      @diagnosisDataRowClose="editDiagnosisDataClose"
    />
  </div>
</template>
<script>
import CommonAddDiagnosisData from "../../..//components/diagnosis/knowledge/diagnosisdata/CommonAddDiagnosisData";
import CommonEditDiagnosisData from "../../..//components/diagnosis/knowledge/diagnosisdata/CommonEditDiagnosisData";
export default {
  components: {
    CommonAddDiagnosisData,
    CommonEditDiagnosisData,
  },
  data() {
    return {
      termForm: {
        modelName: "",
      },
      diagnosisData: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editDiagnosisDataVisible: false,
      editDiagnosisDataData: {},
      //新增
      addDiagnosisDataVisible: false,
    };
  },
  created() {
    this.diagnosisDataInit();
  },
  methods: {
    diagnosisDataInit() {
      this.getRequest(
        "/modelPrinciple/modelPrinciple?current=" +
          this.currentPage +
          "&modelName=" +
          this.termForm.modelName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.diagnosisData = resp.data;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 编辑
    editDiagnosisData(val) {
      this.editDiagnosisDataData = val;
      this.editDiagnosisDataVisible = true;
    },
    // 关闭编辑框
    editDiagnosisDataClose() {
      this.editDiagnosisDataVisible = false;
    },
    //新增
    addDiagnosisData() {
      this.addDiagnosisDataVisible = true;
      this.diagnosisDataInit();
    },
    //关闭新增框
    addDiagnosisDataClose() {
      this.addDiagnosisDataVisible = false;
    },
    //删除
    deleteDiagnosisData(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest(
            "/modelPrinciple/modelPrinciple?diagnosisStep=" +
              val.diagnosisStep +
              "&modelName=" +
              val.modelName +
              "&sequence=" +
              val.sequence
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.diagnosisDataInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.diagnosisDataInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      this.diagnosisDataInit();
    },
  },
};
</script>
<style lang="less" scoped>
.element.style {
  height: 360px;
}
@import "../../../assets/css/diagnosis/knowledge/diagnosisData.css";
</style>
