<template>
  <!-- 井场信息 -->
  <div class="BasTeamInfor" align="center">
    <!-- 条件查询 -->
    <el-form class="role_form" v-model="termData" :inline="true">
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBasTeamInfor()"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item label="施工队伍名称">
        <el-input
          v-model="termData.teamName"
          clearable
          style="width:150px"
          size="small"
          placeholder="请输入施工队"
        ></el-input>
      </el-form-item>
      <el-form-item label="施工状态">
        <el-select
          v-model="termData.status"
          clearable
          filterable
          style="width:150px"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchBasTeamInfor()"
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
      :data="BasTeamInforData"
      height="500px"
      border
      lazy
      style="width:100%;"
    >
      <el-table-column prop="index" align="center" label="序号" width="100">
      </el-table-column>
      <!-- <el-table-column
        prop="waterStationId"
        align="center"
        label="注水站编号"
        width="150"
      /> -->
      <el-table-column
        prop="teamName"
        align="center"
        label="施工队名称"
        width="200"
      />
      <el-table-column
        prop="leader"
        align="center"
        label="负责人"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="telephone"
        align="center"
        label="联系电话"
        width="200"
      />
      <el-table-column
        prop="status"
        align="center"
        label="施工状态"
        width="140"
      >
      <template slot-scope="scope">
          <p v-if="scope.row.status == '0'">空闲</p>
          <p v-if="scope.row.status == '1'">施工中</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        align="center"
        label="备注"
        width="200"
      />

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope"
          ><el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="editBasTeamInfor(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="BasTeamInforDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="BasTeamInfor_page" align="center">
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
    <common-add-BasTeamInfor
      :addBasTeamInforVisible="addBasTeamInforVisible"
      @BasTeamInforRowClose="addBasTeamInforClose"
    />
    <!-- 编辑 -->
    <common-edit-BasTeamInfor
      :editBasTeamInforVisible="editBasTeamInforVisible"
      :editData="editBasTeamInforData"
      @BasTeamInforRowClose="editBasTeamInforClose"
    />
  </div>
</template>
<script>
import CommonAddBasTeamInfor from "../..//components/baseinformation/basteaminfor/CommonAddBaseTeamInfor";
import CommonEditBasTeamInfor from "../..//components/baseinformation/basteaminfor/CommonEditBaseTeamInfor";
export default {
  components: {
    CommonAddBasTeamInfor,
    CommonEditBasTeamInfor
  },
  data() {
    return {
      termData: {
        status: "",
        teamName: ""
      },
      file: [],
      fileList: [],
      loading: true,
      statusOptions: [
        {
          value: "0",
          label: "空闲"
        },
        {
          value: "1",
          label: "施工中"
        }
      ],
      BasTeamInforData: [],
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editBasTeamInforVisible: false,
      editBasTeamInforData: {},
      //新增
      addBasTeamInforVisible: false
    };
  },
  created() {
    this.orgNameInit();
    this.BasTeamInforInit();
  },
  methods: {
    // 根据输入信息查询
    searchBasTeamInfor() {
      this.getRequest(
        "/basTeamInfor/basTeamInfor?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&status=" +
          this.termData.status +
          "&teamName=" +
          this.termData.teamName
      ).then(resp => {
        if (resp) {
          this.BasTeamInforData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    BasTeamInforInit() {
      this.getRequest(
        "/basTeamInfor/basTeamInfor?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.BasTeamInforData = resp.data.records;
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
      this.searchBasTeamInfor();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchBasTeamInfor();
    },
    // 编辑
    editBasTeamInfor(val) {
      this.editBasTeamInforData = val;
      this.editBasTeamInforVisible = true;
    },
    // 关闭编辑框
    editBasTeamInforClose() {
      this.editBasTeamInforVisible = false;
    },
    //新增
    addBasTeamInfor() {
      this.addBasTeamInforVisible = true;
      this.BasTeamInforInit();
    },
    //关闭新增框
    addBasTeamInforClose() {
      this.addBasTeamInforVisible = false;
    },
    //获取序号
    getIndex() {
      this.BasTeamInforData.forEach((item, index) => {
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
    BasTeamInforDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/basTeamInfor/basTeam?teamId=" + val.teamId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.searchBasTeamInfor();
          });
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
