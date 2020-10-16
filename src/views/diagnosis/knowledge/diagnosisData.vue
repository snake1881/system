 <template>
  <div class="diagnosisData">
    <div  align="center">
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
        :span-method="objectOneMethod"
      >
        <el-table-column
          prop="diagnosticStep"
          label="诊断步骤"
          width="240"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orderNumber"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="abnormalProblem"
          label="诊断结果"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column label="诊断依据" width="480" header-align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.diagnosticBasis"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="editDiagnosisData(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              @click="deleteDiagnosisData(scope.row)"
              >删除</el-button
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
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/knowledge/DiagnosticParametersGt/DiagnosticParametersGt?diagnosticStep=" +
              val.diagnosticStep +
              "&orderNumber=" +
              val.orderNumber
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.diagnosisDataInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //合并表格第一列相同单元格
    objectOneMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.setTable(this.diagnosisData).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    setTable(tableData) {
      let spanOneArr = [],
        concatOne = 0;
      tableData.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          if (item.diagnosticStep === tableData[index - 1].diagnosticStep) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      return {
        one: spanOneArr
      };
    }
  }
};
</script>
<style lang="less" scoped>
.element.style {
  height: 360px;
}
</style>
