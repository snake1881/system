<template>
  <div class="downholeOperations">
    <!-- 条件查询 -->
    <el-form class="dow_form" :model="dowForm" :inline="true">
      <el-form-item label="井号">
        <el-input v-model="dowForm.wellName" clearable size="medium" />
      </el-form-item>
      <el-form-item label="任务名称">
        <el-select v-model="dowForm.nodeName" size="medium">
          <el-option label="上报" value="上报" />
          <el-option label="派工" value="派工" />
          <el-option label="现场作业" value="现场作业" />
          <el-option label="效果评价" value="效果评价" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchOperation()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="operationData"
      border
      class="dow_table"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        'text-align': 'center',
      }"
    >
      <el-table-column prop="rownum" label="序号" width="60" />
      <el-table-column prop="nodeName" label="当前任务" width="210" />
      <el-table-column prop="wellName" label="井号" width="210" />
      <el-table-column prop="operationName" label="作业名称" width="210" />
      <el-table-column prop="operationType" label="作业类型" width="210">
        <template slot-scope="scope">
          <a v-if="scope.row.operationType == '0'">常规检泵</a>
          <a v-if="scope.row.operationType == '1'">技改井</a>
        </template>
      </el-table-column>
      <el-table-column prop="operationState" label="状态" width="180" />
      <el-table-column prop="finishDate" label="完成时间" max-width="240" />
      <el-table-column label="操作" min-width="145">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-tooltip content="编辑" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="scope.row.nodeName === '上报'"
              @click="editOperation(scope.row)"
              class="el-icon-edit"
            > 编辑</el-button>
          </el-tooltip>
          <!-- 提交 -->
          <el-tooltip content="提交" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="scope.row.nodeName === '上报'"
              @click="submitOperation(scope.row)"
              class="el-icon-success"
            > 提交</el-button>
          </el-tooltip>
          <!-- 查看 -->
          <el-tooltip content="查看" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="
                scope.row.nodeName === '派工' ||
                scope.row.nodeName === '现场作业' ||
                scope.row.nodeName === '效果评价'
              "
              @click="checkOperation(scope.row)"
              class="el-icon-view"
            > 查看</el-button>
          </el-tooltip>
          <!-- 派工 -->
          <el-tooltip content="派工" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="scope.row.nodeName === '派工'"
              @click="sendOperation(scope.row)"
              class="el-icon-folder-remove"
            > 派工</el-button>
          </el-tooltip>
          <!-- 完工 -->
          <el-tooltip content="完工" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="scope.row.nodeName === '现场作业'"
              @click="completeOperation(scope.row)"
              class="el-icon-folder-checked"
            > 完工</el-button>
          </el-tooltip>
          <!-- 进度 -->
          <el-tooltip content="进度" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="scope.row.nodeName === '现场作业'"
              @click="scheduleOperation(scope.row)"
              class="el-icon-tickets"
            > 进度</el-button>
          </el-tooltip>
          <!-- 终止 -->
          <el-tooltip content="终止" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              v-if="scope.row.nodeName === '上报'"
              @click="cadenceOperation(scope.row)"
              class="el-icon-turn-off"
            > 终止</el-button>
          </el-tooltip>
          <!-- 下载 -->
          <el-tooltip content="下载" placement="top" :disabled="false">
            <el-button
              type="text"
              size="medium"
              @click="downloadOperation(scope.row)"
              class="el-icon-download"
            > 下载</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="dow_page">
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
      :nodalPoint="nodalPoint"
      :sendLastData="sendLastOperData"
      :sendNowData="sendNowOperData"
      :constructionData="constructionData"
      :constNumData="constNumData"
      :measureEffectData="measureEffectData"
      :operAllNodeSource="operAllNodeSource"
      @checkRowClose="checkOperClose"
    />
    <!-- 派工 -->
    <common-send-operation
      :sendOperVisible="sendOperVisible"
      :sendData="sendOperData"
      :sendLastData="sendLastOperData"
      @sendRowClose="sendOperClose"
    />
    <!-- 进度 -->
    <common-schedule-operation
      :scheduleOperVisible="scheduleOperVisible"
      :scheduleData="scheduleOperData"
      @scheduleRowClose="scheduleOperClose"
    />
    <!-- 终止 -->
    <common-cadence-operation
      :cadenceOperVisible="cadenceOperVisible"
      :cadenceData="cadenceOperData"
      @cadenceRowClose="cadenceOperClose"
    />
  </div>
</template>
<script>
import CommonEditOperation from "../../components/downholeOperations/CommonEditOperation";
import CommonCheckOperation from "../../components/downholeOperations/CommonCheckOperation";
import CommonSendOperation from "../../components/downholeOperations/CommonSendOperation";
import CommonScheduleOperation from "../../components/downholeOperations/CommonScheduleOperation";
import CommonCadenceOperation from "../../components/downholeOperations/CommonCadenceOperation";
export default {
  components: {
    CommonEditOperation,
    CommonCheckOperation,
    CommonSendOperation,
    CommonScheduleOperation,
    CommonCadenceOperation,
  },
  data() {
    return {
      dowForm: {
        wellId: "",
        nodeName: "",
      },
      //表格数据
      operationData: [],
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
      nodalPoint: null,
      checkOperVisible: false,
      checkOperData: {},
      sendLastOperData: {},
      sendNowOperData: {},
      constructionData: [],
      constNumData: {},
      measureEffectData: {},
      operAllNodeSource: {},
      // 派工
      sendOperVisible: false,
      sendOperData: {},
      // 进度
      scheduleOperVisible: false,
      scheduleOperData: {},
      // 终止
      cadenceOperVisible: false,
      cadenceOperData: {},
    };
  },
  created() {
    this.operationInit();
  },
  methods: {
    // 查询
    searchOperation() {
      this.getRequest(
        "/operation/operationInfo/queryPageByWellIdOrNodeName?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&nodeName=" +
          this.dowForm.nodeName +
          "&wellName=" +
          this.dowForm.wellName
      ).then((resp) => {
        console.log(resp);
        if (resp.code == 200) {
          this.operationData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.$message({
            message: "查询成功!",
            type: "success",
          });
        } else {
          this.$message.error("查询失败，请重新查询!");
        }
      });
    },
    // 表格数据初始化
    operationInit() {
      this.getRequest(
        "/operation/operationInfo/queryByPageAll?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.operationData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 编辑
    editOperation(val) {
      this.editOperVisible = true;
      this.editOperData = val;
    },
    // 关闭编辑对话框
    editOperClose() {
      this.editOperVisible = false;
    },
    // 更新节点状态方法
    submitOperation(val) {
      this.putRequest("/operation/operationNode/submitOperation", val).then(
        (resp) => {
          console.log(resp);
          if (resp.code == 200) {
            this.$message({
              message: "提交成功!",
              type: "success",
            });
            this.operationInit();
          } else {
            this.$message.error(resp.message);
          }
        }
      );
    },
    // 查看
    checkOperation(val) {
      this.checkOperVisible = true;
      this.checkOperData = val;
      this.nodalPoint = val.nodeSequence;
      // 获取个节点填报信息
      this.getRequest(
        "/operation/operationNode/queryOperAllNodeSource?wellOperationId=" +
          val.wellOperationId
      ).then((resp) => {
        console.log(resp);
        if (resp) {
          //各节点信息数据
          if (resp.data.submitTime == null) resp.data.submitTime = "";
          if (resp.data.submitUserName == null) resp.data.submitUserName = "";
          if (resp.data.sendTime == null) resp.data.sendTime = "";
          if (resp.data.sendUserName == null) resp.data.sendUserName = "";
          if (resp.data.dispatchTime == null) resp.data.dispatchTime = "";
          if (resp.data.dispatchUserName == null)
            resp.data.dispatchUserName = "";
          if (resp.data.measureTime == null) resp.data.measureTime = "";
          if (resp.data.measureUserName == null) resp.data.measureUserName = "";
          this.operAllNodeSource = resp.data;
        }
      });
      // 获取本次派工信息
      this.getRequest(
        "/operation/dispatchInfo/selectNowDispatchByOperationId?wellOperationId=" +
          val.wellOperationId
      ).then((resp) => {
        if (resp.code === 200 && resp.data.length === undefined) {
          //本次作业信息数据
          this.sendNowOperData = resp.data;
        } else {
          this.sendNowOperData = {
            lastOperationName: "",
            lastTeamName: "",
            formNum: "",
            remark: "",
          };
        }
      });
      // 获取上次派工信息
      this.getRequest(
        "/operation/dispatchInfo/selectLastDispatchByWellName?wellId=" +
          val.wellId
      ).then((resp) => {
        if (resp.code === 200 && resp.data.length === undefined) {
          //上次作业信息数据
          this.sendLastOperData = resp.data;
        } else {
          this.sendLastOperData = {
            lastOperationName: "",
            lastTeamName: "",
            lastFinishDate: "",
            dateCount: "",
          };
        }
      });
      // 获取施工过程信息
      this.getRequest(
        "/operation/constructionProcess/selectConstructionByNodeId?operationId=" +
          val.wellOperationId +
          "&wellId=" +
          val.wellId
      ).then((resp) => {
        console.log(resp);
        if (resp.code === 200 && resp.data.constructionProcessList.length > 0) {
          // 无图片时设为默认图片
          for (var i = 0; i < resp.data.constructionProcessList.length; i++) {
            if (resp.data.constructionProcessList[i].urlAddressList === null) {
              resp.data.constructionProcessList[i].urlAddressList = [
                "http://10.21.11.222:9000/zhyt/延长石油.jpg",
              ];
            }
          }
          //施工过程信息信息数据
          this.constructionData = resp.data.constructionProcessList;
          //如果存在施工信息，默认显示第一次上报信息
          this.constNumData = resp.data.constructionProcessList[0];
        } else {
          this.constructionData = [];
          this.constNumData = {
            recordDate: "",
            recorder: "",
            progressDesc: "",
            urlAddressList: ["http://10.21.11.222:9000/zhyt/延长石油.jpg"],
          };
        }
      });
      // 获取效果评价信息
      this.getRequest(
        "/operation/measureEffectEvaluation/selectEffectById?operationNodeId=" +
          val.operationNodeId
      ).then((resp) => {
        if (resp.code === 200 && resp.data.length === undefined) {
          //上次作业信息数据
          this.measureEffectData = resp.data;
        } else {
          this.measureEffectData = {
            evaluationResult: "",
            evaluationDate: "",
            resultDesc: "",
          };
        }
      });
    },
    // 关闭查看对话框
    checkOperClose() {
      this.checkOperVisible = false;
    },
    // 派工
    sendOperation(val) {
      this.sendOperVisible = true;
      //本次作业信息数据
      this.sendOperData = val;
      // 获取上次派工信息
      this.getRequest(
        "/operation/dispatchInfo/selectLastDispatchByWellName?wellId=" +
          val.wellId
      ).then((resp) => {
        if (resp.code === 200 && resp.data.length > 0) {
          //上次作业信息数据
          this.sendLastOperData = resp.data;
        }
      });
    },
    // 关闭派工对话框
    sendOperClose() {
      this.sendOperVisible = false;
    },
    // 完工
    completeOperation(val) {
      this.postRequest("/operation/operationNode/completeOperation", val).then(
        (resp) => {
          if (resp) {
            this.$message({
              message: "完工提交成功!",
              type: "success",
            });
            this.operationInit();
          } else {
            this.$message.error("完工提交失败，请重新提交!");
          }
        }
      );
    },
    // 下载
    downloadOperation(val) {
      this.getRequest(
        "/file/selectFileByModuleId?moduleId=" + val.wellOperationId
      ).then((resp) => {
        console.log(resp);
        if (resp.code == 200) {
          if (resp.data.length > 0) {
            let url = resp.data[0].filePath;
            let fileName = resp.data[0].fileName;
            let fType = resp.data[0].fileSuffix;
            // 判断是否为chrome里的图片
            if (this.isImageInChromeNotEdge(fType)) {
              this.ImgtodataURL(url, fileName, fType);
            } else {
              this.downloadNormalFile(url);
            }
          } else {
            this.$message.error("文件不存在，请上传文件！");
          }
        } else {
          this.$message.error("下载失败,请重新下载！");
        }
      });
    },
    isImageInChromeNotEdge(fType) {
      let bool = false;
      if (
        window.navigator.userAgent.indexOf("Chrome") !== -1 &&
        window.navigator.userAgent.indexOf("Edge") === -1
      )
        (fType === "jpg" ||
          fType === "gif" ||
          fType === "png" ||
          fType === "bmp" ||
          fType === "jpeg" ||
          fType === "svg") &&
          (bool = true);
      return bool;
    },
    // 普通文件下载
    downloadNormalFile(url) {
      // 创建标签
      let link = document.createElement("a");
      // href链接
      link.setAttribute("href", url);
      // 添加到页面中，为兼容Firefox浏览器
      document.body.appendChild(link);
      // 自执行点击事件
      link.click();
      // 从页面移除
      document.body.removeChild(link);
    },
    // 图片文件下载
    ImgtodataURL(url, fileName, fileType) {
      this.getBase64(url, fileType, (_baseUrl) => {
        // 创建隐藏的可下载链接
        var link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        // 图片转base64地址
        link.href = _baseUrl;
        // 添加到页面中，为兼容Firefox浏览器
        document.body.appendChild(link);
        // 自执行点击事件
        link.click();
        // 从页面移除
        document.body.removeChild(link);
      });
    },
    // 图片转base64地址
    getBase64(url, fileType, callback) {
      // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片
      var Img = new Image(),
        dataURL = "";
      Img.src = url;
      Img.setAttribute("crossOrigin", "Anonymous");
      Img.onload = function () {
        // 要先确保图片完整获取到，这是个异步事件
        var canvas = document.createElement("canvas"), //创建canvas元素
          width = Img.width, //确保canvas的尺寸和图片一样
          height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL("image/" + fileType); //转换图片为dataURL
        callback ? callback(dataURL) : null;
      };
    },
    // 进度
    scheduleOperation(val) {
      this.scheduleOperVisible = true;
      this.scheduleOperData = val;
    },
    // 关闭进度对话框
    scheduleOperClose() {
      this.scheduleOperVisible = false;
    },
    // 终止
    cadenceOperation(val) {
      this.cadenceOperVisible = true;
      this.cadenceOperData = val;
    },
    //关闭终止对话框
    cadenceOperClose() {
      this.cadenceOperVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.operationInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.operationInit();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/downholeOperations/downholeOperations.css";
</style>