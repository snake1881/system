<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="orgnameAndTimeForm" :inline="true">
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
                v-model="orgnameAndTimeForm.wellId"
                clearable
                placeholder="全区"
                size="small"
        >
          <el-option
                  v-for="(item, index) in this.selectdymDataByOrgname"
                  :key="index"
                  :label="item.orgName"
                  :value="item.wellId"
                  :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期" size="medium">
        <el-date-picker
                v-model="orgnameAndTimeForm.checkTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd "
        >
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="searchPost()">查询</el-button>
    </el-form>
    <!-- 表格数据 -->
    <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :data="dymData"
            height="84%"
            border
            style="width:100%;"
    >
      <el-table-column prop="" align="center" label="序号" width="50">
        <template scope="scope">
          <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wellId" align="center" label="井号" width="120" />
      <el-table-column prop="prodDate" align="center" label="日期" width="250"/>
      <el-table-column prop="abnormalProblem" align="center" label="诊断结果" width="300"/>
      <el-table-column prop="orgName" align="center" label="采油站" width="150"/>
      <el-table-column prop="dym" align="center" label="动液面" width="150" />
      <el-table-column prop="normalDym" align="center" label="前七日均值" width="120"/>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" align="center" size="small" @click="scanLine(scope.row)">查看曲线</el-button>
          <!--<el-button type="text" size="small" @click="dletePost(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="role_page">
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
    <common-add-post
            :addPostVisible="addPostVisible"
            @postRowClose="addPostClose"
    />
    <!-- 编辑 -->
    <common-edit-post
            :editPostVisible="editPostVisible"
            :editData="editPostData"
            @postRowClose="editPostClose"
    />
  </div>
</template>
<script>
  import DymycScanLine from "../../../components/diagnosis/oilwell/dymyc/DymycScanLine";
  export default {
    components: {
      DymycScanLine
    },
    data() {
      return {
        orgnameAndTimeForm: {
          checkTime: "",
          wellId: ""
        },
        // 表格数据
        dymData: [],
        // 下拉框数据
        selectdymDataByOrgname: [],
        // 分页数据
        currentPage: 1,
        pageSize: 10,
        total: 0,
        // 编辑
        editPostVisible: false,
        editPostData: {},
        // 查看曲线
        scanLineVisible: false,
        scanLineData: {},

        // 新增
        addPostVisible: false,
        // 表格加载动画
        loading: true
      };
    },
    created() {
      this.postInit();
      this.selectInit2();
    },
    methods: {
      // 根据输入信息查询
      searchPost() {
        this.postRequest(
          "/oilWell/dym/findListsByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize,
          this.orgnameAndTimeForm
        ).then(resp => {
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
          }
        });
      },
      //表格数据初始化
      postInit() {
        this.getRequest(
          "/oilWell/dym/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
        ).then(resp => {
          this.loading = false;
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
          }
        });
      },

      //采油站下拉框数据查询
      selectInit2() {
        this.getRequest(
          "/oilWell/dym/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
        ).then(resp => {
          this.loading = false;
          if (resp) {
            this.selectdymDataByOrgname = resp.data.records;
            // 下拉框去重
            var hash = {};
            this.selectdymDataByOrgname = this.selectdymDataByOrgname.reduce(
              function(item, next) {
                hash[next.orgName]
                  ? ""
                  : (hash[next.orgName] = true && item.push(next));
                return item;
              },
              []
            );

            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
          }
        });
      },
      // 分页，页码大小改变
      handleSizeChange(val) {
        this.pageSize = val;
        this.postInit();
      },
      // 分页，当前页改变
      handleCurrentChange(val) {
        this.currentPage = val;
        this.postInit();
      },
      // 编辑
      editPost(val) {
        this.editPostData = val;
        this.editPostVisible = true;
      },

      // 查看曲线
      scanLine(val) {
        this.scanLineData = val;
        this.scanLineVisible = true;
      },
      // 关闭查看曲线框
      scanLineClose() {
        this.scanLineVisible = false;
      },
      // 关闭编辑框
      editPostClose() {
        this.editPostVisible = false;
      },
      // 新增
      addPost() {
        this.addPostVisible = true;
        this.postInit();
      },
      // 关闭新增框
      addPostClose() {
        this.addPostVisible = false;
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "../../../assets/css/system/role.css";
</style>
