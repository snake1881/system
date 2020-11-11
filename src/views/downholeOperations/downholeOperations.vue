<template>
  <div class="downholeOperations">
    <!-- 条件查询 -->
    <el-form class="dow_form" :model="dowForm" :inline="true">
      <el-form-item>
        <el-input v-model="dowForm.number" placeholder="井号" size="medium" />
      </el-form-item>
      <el-form-item label="任务名称">
        <el-select v-model="dowForm.name" size="medium">
          <el-option label="上报" value="0" />
          <el-option label="派工" value="1" />
          <el-option label="现场作业" value="2" />
          <el-option label="效果评价" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchOperation()">查询</el-button>
      </el-form-item>
    </el-form>
     <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="operationData"
      border
      style="width:100%;height:85%"
      :row-style="{height:'2px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="number" label="序号" width="120" />
      <el-table-column prop="a" label="当前任务" width="210" />
      <el-table-column prop="b" label="井号" width="180" />
      <el-table-column prop="c" label="作业名称" width="210" />
      <el-table-column prop="d" label="作业类型" width="210" />
      <el-table-column prop="e" label="状态" width="140" />
      <el-table-column prop="f" label="完成时间" width="200" />
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-tooltip content="编辑" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='上报'" @click="editOperation(scope.row)" class="iconfont icon-bianji" />
          </el-tooltip>
          <!-- 提交 -->
          <el-tooltip content="提交" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='上报'" @click="submitOperation(scope.row)" class="el-icon-success" />
          </el-tooltip>
          <!-- 查看 -->
          <el-tooltip content="查看" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='派工' || scope.row.a==='现场作业' || scope.row.a==='效果评价'" @click="checkOperation(scope.row)" class="el-icon-view" />
          </el-tooltip>
          <!-- 派工 -->
          <el-tooltip content="派工" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='派工'" @click="sendOperation(scope.row)" class="el-icon-folder-remove" />
          </el-tooltip>
          <!-- 完工 -->
          <el-tooltip content="完工" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='现场作业'" @click="completeOperation(scope.row)" class="el-icon-folder-checked" />
          </el-tooltip>
          <!-- 进度 -->
          <el-tooltip content="进度" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='现场作业'" @click="scheduleOperation(scope.row)" class="el-icon-tickets" />
          </el-tooltip>
          <!-- 终止 -->
          <el-tooltip content="终止" placement="top">
          <el-button type="text" size="small" v-if="scope.row.a==='上报'" @click="cadenceOperation(scope.row)" class="el-icon-turn-off" />
          </el-tooltip>
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
    <!-- 编辑 -->
    <common-edit-operation 
      :editOperVisible="editOperVisible"
      :editData="editOperData"
      @operRowClose="editOperClose"
    />
    <!-- 查看 -->
    <common-check-operation 
      :checkOperVisible="checkOperVisible"
      :checkData="checkOperData"
      @checkRowClose="checkOperClose"
    />
    <!-- 派工 -->
    <common-send-operation 
      :sendOperVisible="sendOperVisible"
      :sendData="sendOperData"
      @sendRowClose="sendOperClose"
    />
    <!-- 进度 -->
    <common-schedule-operation 
      :scheduleOperVisible="scheduleOperVisible"
      :scheduleData="schedulesendOperData"
      @scheduleRowClose="scheduleOperClose"
    />
  </div>
</template>
<script>
import CommonEditOperation from "../../components/downholeOperations/CommonEditOperation";
import CommonCheckOperation from "../../components/downholeOperations/CommonCheckOperation";
import CommonSendOperation from "../../components/downholeOperations/CommonSendOperation";
import CommonScheduleOperation from "../../components/downholeOperations/CommonScheduleOperation";
export default {
  components: {
    CommonEditOperation,
    CommonCheckOperation,
    CommonSendOperation,
    CommonScheduleOperation
  },
  data(){
    return{
      dowForm:{
        number:"",
        name:"",
      },
      operationData:[
        {
          number:1,
          a:'上报',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
        {
          number:1,
          a:'派工',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
        {
          number:1,
          a:'派工',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
        {
          number:1,
          a:'效果评价',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
         {
          number:1,
          a:'现场作业',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
        {
          number:1,
          a:'派工',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
        {
          number:1,
          a:'派工',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        },
        {
          number:1,
          a:'派工',
          b:'定117-1',
          c:'解断脱',
          d:'常规检泵',
          e:'完成',
          f:'2020-06-17'
        }
      ],
        // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
       // 编辑
      editOperVisible: false,
      editOperData: {},
      //查看
      checkOperVisible:false,
      checkOperData:{},
      // 派工
      sendOperVisible: false,
      sendOperData:{},
      // 进度
      scheduleOperVisible: false,
      schedulesendOperData:{}
    }
  },
  created() {
    this.operationInit();
  },
  methods:{
    // 查询
    searchOperation(){},
    // 表格数据初始化
    operationInit(){
      this.getRequest(
        "/system/sysRole/queryRoleAll?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          // /this.operationData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 编辑
    editOperation(val){
      this.editOperVisible = true;
      this.editOperData = val;
    },
    // 关闭编辑对话框
    editOperClose() {
      this.editOperVisible = false;
    },
    // 提交
    submitOperation(){},
    // 查看
    checkOperation(val){
      this.checkOperVisible = true;
      this.checkOperData = val;
    },
    // 关闭查看对话框
    checkOperClose(){
      this.checkOperVisible = false;
    },
    // 派工
    sendOperation(val){
      this.sendOperVisible = true;
      this.sendOperData = val;
    },
    // 关闭派工对话框
    sendOperClose(){
      this.sendOperVisible = false;
    },
    // 完工
    completeOperation(){},
    // 进度
    scheduleOperation(val){
      this.scheduleOperVisible = true;
      this.schedulesendOperData = val;
    },
    // 关闭进度对话框
    scheduleOperClose(){
      this.scheduleOperVisible = false;
    },
    // 终止
    cadenceOperation(){},
     // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.operationInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.operationInit();
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/downholeOperations/downholeOperations.css";
</style>