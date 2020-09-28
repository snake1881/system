<template>
  <!--  液量异常参数筛选界面  -->
  <div class="liqFilterCondition">
    <el-form :model="termForm" :inline="true">
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addLiqFilterCondition()"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item label="采油站">
        <el-select
          v-model="termForm.orgName"
          filterable
          clearable
          placeholder="全区"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.orgName"
            :label="item.orgName"
            :value="item.orgName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="termForm.prodDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="liqFilterConditionSearch()"
        >查询</el-button
      >
      <el-button
            type="text"
            size="small"
            @click.prevent=""
            >测试</el-button
          >
      <el-button type="primary" @click="editYlYccs(ylYccsDate)"
        >异常参数设置</el-button
      >
    </el-form>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liqFilterConditionDate"
      border
      row-key="index"
      style="width:100%"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <el-table-column
        prop="index"
        label="序号"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="wellName"
        label="井号"
        width="140"
      ></el-table-column>
      <el-table-column
        prop="filter"
        label="条件（填写选定日期后可选择任意天）"
        width="420px"
      >
        <template scope="scope">
          <el-radio-group v-model="scope.row.filter">
            <el-radio label="昨日"></el-radio>
            <el-radio label="上月"></el-radio>
            <el-radio label="前三月"></el-radio>
            <el-radio label="任意天"></el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        prop="appointDate"
        label="指定日期"
        width="320"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="editLiqFilterCondition(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.prevent=""
            >测试</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteLiqFilterCondition(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="liqFilterCondition_page">
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
    <common-add-liqFilterCondition
      :addLiqFilterConditionVisible="addLiqFilterConditionVisible"
      @liqFilterConditionRowClose="addLiqFilterConditionClose"
    />
    <!-- 编辑 -->
    <common-edit-liqFilterCondition
      :editLiqFilterConditionVisible="editLiqFilterConditionVisible"
      :editData="editLiqFilterConditionData"
      @liqFilterConditionRowClose="editLiqFilterConditionClose"
    />
    <!-- 异常参数设置 -->
    <common-edit-ylYccs
      :editYlYccsVisible="editYlYccsVisible"
      :editData="editYlYccsData"
      @ylYccsRowClose="editYlYccsClose"
    />
  </div>
</template>
<script>
import CommonAddLiqFilterCondition from "../../..//components/diagnosis/konwledge/liqfiltercondition/CommonAddLiqFilterCondition";
import CommonEditLiqFilterCondition from "../../..//components/diagnosis/konwledge/liqfiltercondition/CommonEditLiqFilterCondition";
import CommonEditYlYccs from "../../..//components/diagnosis/konwledge/liqfiltercondition/CommonEditYlYccs";
export default {
  components: {
    CommonAddLiqFilterCondition,
    CommonEditLiqFilterCondition,
    CommonEditYlYccs
  },
  data() {
    return {
      //搜索框数据
      termForm: {
        orgName: "",
        prodDate: ""
      },
      //采油站名称
      orgNameData: [],
      //表格数据
      liqFilterConditionDate: [],
      //液量异常筛选参数
      ylYccsDate: {},
      orgName: "",
      loading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      // 异常筛选参数设置编辑
      editYlYccsVisible: false,
      editYlYccsData: {},
      // 编辑
      editLiqFilterConditionVisible: false,
      editLiqFilterConditionData: {},
      //新增
      addLiqFilterConditionVisible: false
    };
  },
  created() {
    this.liqFilterConditionInit();
    this.ylYccsInit();
    this.orgNameInit();
  },
  methods: {
    // 根据井名和日期
    deleteLiqFilterCondition(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/knowledge/LiqFilterCondition/LiqFilterCondition",
            val
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.liqFilterConditionInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //表格数据初始化
    liqFilterConditionInit() {
      this.getRequest(
        "/knowledge/LiqFilterCondition/LiqFilterConditionList?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //条件查询
    liqFilterConditionSearch() {
      if (this.termForm.prodDate === null) {
        this.liqFilterConditionInit();
      } else {
        this.getRequest(
          "/knowledge/LiqFilterCondition/LiqFilterConditionListTerm?current=" +
            parseInt(this.currentPage) +
            "&orgName=" +
            this.termForm.orgName +
            "&pageSize=" +
            this.pageSize +
            "&prodDate=" +
            this.getTime(this.termForm.prodDate)
        ).then(resp => {
          this.loading = false;
          if (resp) {
            this.liqFilterConditionDate = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
            this.getIndex();
          }
        });
      }
    },
    //液量异常筛选参数初始化
    ylYccsInit() {
      this.getRequest("/knowledge/ylYcss/ylYccs?wellName=default").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.ylYccsDate = resp.data;
          }
        }
      );
    },
    //加油站下拉框初始化
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
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      if (this.termForm.prodDate === "") {
        this.liqFilterConditionInit();
      } else {
        this.liqFilterConditionSearch();
      }
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      if (this.termForm.prodDate === "") {
        this.liqFilterConditionInit();
      } else {
        this.liqFilterConditionSearch();
      }
    },
    // 异常参数筛选设置编辑
    editYlYccs(val) {
      this.editYlYccsData = val;
      this.editYlYccsVisible = true;
    },
    // 关闭异常参数筛选编辑框
    editYlYccsClose() {
      this.editYlYccsVisible = false;
    },
    // 编辑
    editLiqFilterCondition(val) {
      // console.log(this.currentPage);
      this.editLiqFilterConditionData = val;
      this.editLiqFilterConditionVisible = true;
    },
    // 关闭编辑框
    editLiqFilterConditionClose() {
      this.editLiqFilterConditionVisible = false;
    },
    //新增
    addLiqFilterCondition() {
      this.addLiqFilterConditionVisible = true;
      this.liqFilterConditionInit();
    },
    //关闭新增框
    addLiqFilterConditionClose() {
      this.addLiqFilterConditionVisible = false;
    },
    //时间格式化
    getTime(val) {
      var year = val.getFullYear(); //年
      var month = val.getMonth() + 1; //月
      var date = val.getDate(); //日
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      var str = year + "-" + month + "-" + date;
      return str;
    },
    //设置序号
    getIndex() {
      this.liqFilterConditionDate.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>