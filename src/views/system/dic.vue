<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="dicFrom"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="dicFrom.codeTypeName" placeholder="编码名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="dicFrom.codeType" placeholder="编码类型" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchDictionary()"
        >
          查询
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addDic()">
          新增
        </el-button>
        <el-button type="primary" icon="el-icon-delete" @click="dlete()">
          删除
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="
        dicData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      :current-page.sync="currentPage"
      height="500px"
      border
      style="width:100%"
    >
      <el-table-column type="selection" width="100" />
      <el-table-column prop="codeTypeName" label="编码名称" width="300" />
      <el-table-column prop="codeType" label="编码类型" width="300" />
      <el-table-column prop="createTime" label="创建时间" width="320" />
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editDic(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <common-add-dic :addDicVisible="addDicVisible" @addClose="addDicClose" />
    <!-- 编辑 -->
    <common-edit-dic
      :editDicVisible="editDicVisible"
      @editClose="editDicClose"
      :editData="editData"
    />
    <!-- 分页 -->
    <div style="width:98%;background-color:white;">
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
</template>
<script>
import CommonAddDic from "../../components/Dic/CommonAddDic";
import CommonEditDic from "../../components/Dic/CommonEditDic";
// import CommonPage from "../../components/CommonPage";
export default {
  components: {
    CommonAddDic,
    CommonEditDic
    // CommonPage
  },
  data() {
    return {
      //搜索框
      dicFrom: {
        codeTypeName: "",
        codeType: ""
      },
      // 表格数据
      dicData: [],
      // 新增
      addDicVisible: false,
      // 编辑
      editDicVisible: false,
      editData: {},
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.dicInit();
  },
  methods: {
    // 根据输入信息查询
    searchDictionary() {
      this.getRequest(
        "/system/codeType/codeTypes1/" +
          this.currentPage +
          "/" +
          this.pageSize +
          "?codeType=" +
          this.dicFrom.codeType +
          "?codeTypeName=" +
          this.dicFrom.codeTypeName
      ).then(resp => {
        if (resp) {
          this.dicData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    dicInit() {
      this.getRequest(
        "/system/codeType/codeTypes/" + this.currentPage + "/" + this.pageSize
      ).then(resp => {
        if (resp) {
          this.dicData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增字典
    addDic() {
      this.addDicVisible = true;
    },
    // 关闭新增对话框
    addDicClose() {
      this.addDicVisible = false;
    },
    // 删除
    dlete() {
      console.log(1);
    },
    // 编辑字典
    editDic(val) {
      this.editData = val;
      this.editDicVisible = true;
    },
    // 关闭编辑对话框
    editDicClose() {
      this.editDicVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.dicInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.dicInit();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 98%;
  margin: 10px;
  background-color: white;
}
</style>
