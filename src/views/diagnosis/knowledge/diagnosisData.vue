 <template>
  <div class="diagnosisData">
    <div>
      <el-form>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addDiagnosisData()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="diagnosisData"
        border
        row-key="diadiagnosticStep"
        style="width:100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column
          prop="diagnosticStep"
          label="诊断步骤"
          width="240"
        ></el-table-column>
        <el-table-column
          prop="orderNumber"
          label="序号"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="abnormalProblem"
          label="诊断结果"
          width="300"
        ></el-table-column>
        <el-table-column label="诊断依据" width="480">
          <template slot-scope="scope">
            <div v-html="scope.row.diagnosticBasis"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editDiagnosisData(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
import CommonAddDiagnosisData from "../../..//components/diagnosis/konwledge/diagnosisdata/CommonAddDiagnosisData";
import CommonEditDiagnosisData from "../../..//components/diagnosis/konwledge/diagnosisdata/CommonEditDiagnosisData";
export default {
  components: {
    CommonAddDiagnosisData,
    CommonEditDiagnosisData
  },
  data() {
    return {
      diagnosisData: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editDiagnosisDataVisible: false,
      editDiagnosisDataData: {},
      //新增
      addDiagnosisDataVisible: false
    };
  },
  created() {
    this.diagnosisDataInit();
  },
  methods: {
    diagnosisDataInit() {
      this.getRequest(
        "/knowledge/DiagnosticParametersGt/DiagnosticParametersGtList"
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.diagnosisData = resp.data;
         this.diagnosisData.array.forEach(element => {
           var reg = new RegExp(";", "g"); //g,表示全部替换。
           element.diagnosticBasis.replace(reg, "<br/>");
         });
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
    lineBreak(val) {
      var reg = new RegExp(";", "g"); //g,表示全部替换。
      val.replace(reg, "<br/>");
    }
  }
};
</script>
<style lang="less" scoped>
.element.style {
  height: 360px;
}
// .el-table .cell {
//   white-space: pre-line;
// }
</style>
