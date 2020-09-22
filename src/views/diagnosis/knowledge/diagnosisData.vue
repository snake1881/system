 <template>
  <div class="diagnosisDate">
    <div>
      <el-form>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole()">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="diagnosisDate"
        border
        row-key="diadiagnosticStep"
        style="width:100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="diagnosticStep" label="诊断步骤" width="240"></el-table-column>
        <el-table-column prop="orderNumber" label="序号" width="80"></el-table-column>
        <el-table-column prop="abnormalProblem" label="诊断结果" width="300"></el-table-column>
        <el-table-column prop="diagnosticBasis" label="诊断依据" width="480"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editDept(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diagnosisDate: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.diagnosisDateInit();
  },
  methods: {
    diagnosisDateInit() {
      this.getRequest(
        "/knowledge/DiagnosticParametersGt/DiagnosticParametersGtList"
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.diagnosisDate = resp.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.element.style {
  height: 360px;
}
</style>
