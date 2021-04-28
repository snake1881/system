<template>
  <el-dialog
    title="进度详情"
    center
    :visible.sync="checkOperVisible"
    width="50%"
    :before-close="checkOperClose"
  >
    <div class="checkOperDiv" :data="checkData">
      <div class="checkOperDiv_top">
        <div class="checkOperDiv_top_title">
          <span
            class="el-icon-s-data"
            style="color: #2670f7; font-size: 18px; margin: 1% -0.5% 0 0"
          />
          作业进度
        </div>
        <el-steps
          :active="checkData.nodeSequence"
          align-center
          class="checkOperDiv_top_steps"
        >
          <el-step title="上报" @click.native="submit()">
            <i class="step01" slot="icon"></i>
          </el-step>
          <el-step title="派工" @click.native="send()">
            <i class="step02" slot="icon"></i>
          </el-step>
          <el-step title="现场作业" @click.native="scene()">
            <i class="step03" slot="icon"></i>
          </el-step>
          <el-step title="效果评价" @click.native="effect()">
            <i class="step04" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
      <div class="checkOperDiv_bottom">
        <div class="checkOperDiv_top_title">
          <span
            class="el-icon-s-data"
            style="color: #2670f7; font-size: 18px; margin: 1% -0.5% 0 0"
          />
          节点详情
        </div>
        <div class="checkOperDiv_submit_table">
          <div
            v-if="nodalPoint === 0"
            class="checkOperDiv_submit_table_container"
          >
            <div class="checkOperDiv_submit_table_container_title">
              <i
                class="el-icon-set-up"
                style="color: #606266; font-size: 18px; margin: 1% -0.5% 0 0"
              />
              上报
            </div>
            <div class="checkOperDiv_submit_table_container_details">
              <div class="checkOperDiv_submit_table_container_details_name">
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业名称:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业类型:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >上报人:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >上报时间:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >备注:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >附件(下载、预览):</span
                >
              </div>
              <div class="checkOperDiv_submit_table_container_details_content">
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ checkData.operationName }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ checkData.operationType == 0 ? "常规检泵" : "技改井" }}
                </span>
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ checkData.dealUserName }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ checkData.dealDate }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ checkData.remark }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  ><el-link type="primary" @click="downloadOperation()"
                    >点击下载</el-link
                  ></span
                >
              </div>
            </div>
          </div>
          <div
            v-if="nodalPoint === 1"
            class="checkOperDiv_submit_table_container"
          >
            <div class="checkOperDiv_submit_table_container_title">
              <i
                class="el-icon-set-up"
                style="color: #606266; font-size: 18px; margin: 1% -0.5% 0 0"
              />
              派工
            </div>
            <div class="checkOperDiv_submit_table_container_details">
              <div class="checkOperDiv_submit_table_container_details_name">
                <span style="color: #2670f7; font-weight: 500; margin: 2% 10%"
                  >上次</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业名称:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业队伍:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业时间:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >距现在(天):</span
                >
                <span style="color: #2670f7; font-weight: 500; margin: 2% 10%"
                  >本次:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业名称:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >作业队伍:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >派工单编号:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >备注:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >附件(下载、预览):</span
                >
              </div>
              <div class="checkOperDiv_submit_table_container_details_content">
                <span style="margin: 7% 10% 0 10%" />
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ sendLastData.lastOperationName }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ sendLastData.lastTeamName }}
                </span>
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ sendLastData.lastFinishDate }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ sendLastData.dateCount }}</span
                >
                <span style="margin: 5.5% 10% 0 10%" />
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ sendNowData.lastOperationName }}</span
                >

                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ sendNowData.lastTeamName }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ sendNowData.formNum }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ sendNowData.remark }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  ><el-link type="primary" @click="downloadOperation()"
                    >点击下载</el-link
                  ></span
                >
              </div>
            </div>
          </div>
          <div
            v-if="nodalPoint === 2"
            class="checkOperDiv_submit_table_container"
          >
            <div class="checkOperDiv_submit_table_container_title">
              <i
                class="el-icon-set-up"
                style="color: #606266; font-size: 18px; margin: 1% -0.5% 0 0"
              />
              现场作业
            </div>
            <div class="checkOperDiv_submit_table_container_details">
              <div class="checkOperDiv_submit_table_container_details_name">
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >上报次数:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >上报日期:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >上报人:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >进度描述:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >现场照片:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >附件(下载、预览):</span
                >
              </div>
              <div class="checkOperDiv_submit_table_container_details_content">
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  ><span
                    v-for="item in constructionData"
                    :key="item.conspId"
                    @click="constNum(item, item.conspId)"
                    class="tool_td_right_a"
                    :class="{ checkActive: item.conspId === currentIndex }"
                  >
                    {{ item.rownum }}
                  </span></span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ constNumData.recordDate }}
                </span>
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ constNumData.recorder }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  >{{ constNumData.progressDesc }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 8%; height: 100%;"
                      :src="constNumData.urlAddressList[0]"
                      :preview-src-list="constNumData.urlAddressList"
                      :z-index="3500"                   >
                    </el-image></div
                ></span>
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                  ><el-link type="primary" @click="downloadOperation()"
                    >点击下载</el-link
                  ></span
                >
              </div>
            </div>
          </div>
          <div
            v-if="nodalPoint === 3"
            class="checkOperDiv_submit_table_container"
          >
            <div class="checkOperDiv_submit_table_container_title">
              <i
                class="el-icon-set-up"
                style="color: #606266; font-size: 18px; margin: 1% -0.5% 0 0"
              />
              效果评价
            </div>
            <div class="checkOperDiv_submit_table_container_details">
              <div class="checkOperDiv_submit_table_container_details_name">
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >评价结果:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >评价日期:</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_name_span"
                  >评价结论:</span
                >
              </div>
              <div class="checkOperDiv_submit_table_container_details_content">
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{
                    measureEffectData.evaluationResult == 0
                      ? "失败"
                      : measureEffectData.evaluationResult == 1
                      ? "正常"
                      : "较差"
                  }}</span
                >
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ measureEffectData.evaluationDate }}
                </span>
                <span
                  class="checkOperDiv_submit_table_container_details_content_span"
                >
                  {{ measureEffectData.resultDesc }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button type="info" @click="checkOperClose()" class="checkOperButton"
      >关闭</el-button
    >
  </el-dialog>
</template>

<script>
import template from "../../views/assessment/template.vue";
export default {
  components: { template },
  props: {
    checkOperVisible: {
      type: Boolean,
    },
    //各节点填报信息
    operAllNodeSource: {
      type: Object,
    },
    //当前作业信息
    checkData: {
      type: Object,
    },
    //当前节点
    nodalPoint: {
      type: Number,
    },
    //上次派工信息
    sendLastData: {
      type: Object,
    },
    //当前派工信息
    sendNowData: {
      type: Object,
    },
    //施工过程信息
    constructionData: {
      type: Array,
    },
    //某次施工信息
    constNumData: {
      type: Object,
    },
    //效果评价信息
    measureEffectData: {
      type: Object,
    },
  },
  created() {
    this.checkHistory();
  },
  data() {
    return {
      checkNode: this.checkData.nodeSequence,
      constNumImageUrl: {
        url: "http://10.21.11.222:9000/zhyt/延长石油.jpg",
        srcList: ["http://10.21.11.222:9000/zhyt/延长石油.jpg"],
      },
      currentIndex: 0,
    };
  },
  methods: {
    // 对话框父子组件传值
    checkOperClose() {
      this.$emit("checkRowClose");
    },
    // 查看上报节点
    submit() {
      //如果当前节点处于上报节点或已完成上报，可以查看历史信息
      if (this.checkData.nodeSequence >= 0) {
        this.nodalPoint = 0;
        //调用节点信息
        this.checkHistory();
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看派工节点
    send() {
      if (this.checkData.nodeSequence >= 1) {
        this.nodalPoint = 1;
        //调用节点信息
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看现场作业节点
    scene() {
      if (this.checkData.nodeSequence >= 2) {
        this.nodalPoint = 2;
        //调用节点信息
        this.checkHistory();
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 查看效果评价节点
    effect() {
      if (this.checkData.nodeSequence >= 3) {
        this.nodalPoint = 3;
        //调用节点信息
        this.checkHistory();
      } else {
        this.$message({
          message: "抱歉,不可以查看未执行任务!",
          type: "success",
        });
      }
    },
    // 获取某个节点历史信息
    checkHistory() {
      this.getRequest(
        "/operation/operationInfo/queryNodeSourceByNode?nodeSequence=" +
          this.nodalPoint +
          "&wellOperationId=" +
          this.checkData.wellOperationId
      ).then((resp) => {
        if (resp) {
          //操作人信息填充
          this.checkData.dealUserName = resp.data.dealUserName;
          this.checkData.dealDate = resp.data.dealDate;
        }
      });
    },
    //获取某次进度信息
    constNum(val1, val2) {
      this.constNumData = val1;
      this.currentIndex = val2;
    },
    // 下载
    downloadOperation() {
      this.getRequest(
        "/file/selectFileByModuleId?moduleId=" + this.checkData.wellOperationId
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
  },
};
</script>

<style lang="less" scoped>
.checkOperDiv {
  height: 440px;
  width: 100%;
  margin-top: -4%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_top {
  width: 100%;
  height: 25%;
  padding: -5% 1% 2% 1%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_top_steps {
  width: 100%;
  height: 50%;
  margin-top: 2%;
}
.checkOperDiv_top_title {
  width: 100%;
  height: 10%;
  margin-bottom: 2%;
  font-size: 14px;
  font-weight: 700;
  color: #666;
}
.checkOperDiv_bottom {
  width: 98%;
  height: 80%;
  margin: 2% 1% 0 1%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_submit_table {
  width: 100%;
  height: 95%;
  margin: -1% 1% 0 1%;
  border-radius: 2%;
  background-color: #f2f6fc;
}
.checkOperDiv_submit_table_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_submit_table_container_title {
  width: 100%;
  height: 10%;
  font-size: 14px;
  padding-top: -1%;
  border-bottom: 1px solid rgb(228, 225, 225);
  color: #2670f7;
}
.checkOperDiv_submit_table_container_details {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
}
.checkOperDiv_submit_table_container_details_name {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_submit_table_container_details_content {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.checkOperDiv_submit_table_container_details_name_span {
  font-size: 13px;
  margin: 2% 0 0 10%;
  height: 12%;
}
.checkOperDiv_submit_table_container_details_content_span {
  font-size: 13px;
  margin: 1.5% 0 0 0;
  height: 11.5%;
}
.checkOperButton {
  height: 5%;
  margin: 8% 0 0 42%;
}
.checkActive {
  color: #2670f7;
}

.tool_td_right_a {
  margin: 0 1%;
  font-size: 12px;
}
</style>
<style>
.step01,
.step02,
.step03,
.step04 {
  width: 30%;
  height: 30%;
  background-size: 100% 100%;
}
.step01 {
  background-image: url("../../assets/images/reporte.png");
  width: 70%;
  height: 70%;
}
.step02 {
  background-image: url("../../assets/images/work.png");
  width: 70%;
  height: 70%;
}
.step03 {
  background-image: url("../../assets/images/tool.png");
  width: 70%;
  height: 70%;
}
.step04 {
  background-image: url("../../assets/images/evaluate.png");
  width: 70%;
  height: 70%;
}
.el-steps {
  width: 90%;
}
.el-step.is-horizontal .el-step__line {
  top: 50%;
  width: 95%;
}
.el-step__head.is-process {
  border-color: #dedede !important;
}
.el-step__head.is-finish {
  border-color: #2485e0 !important;
}
.el-step__title.is-process {
  font-size: 14px;
  color: #dedede !important;
}
.el-step__title.is-finish {
  font-size: 14px;
  color: #2485e0 !important;
}
.el-step__icon {
  width: 40px;
  height: 40px;
}
.is-finish .step01 {
  background-image: url("../../assets/images/reporte_finish.png");
  width: 70%;
  height: 70%;
}
.is-finish .step02 {
  background-image: url("../../assets/images/work_finish.png");
  width: 70%;
  height: 70%;
}
.is-finish .step03 {
  background-image: url("../../assets/images/tool_finish.png");
  width: 70%;
  height: 70%;
}
.is-finish .step04 {
  background-image: url("../../assets/images/evaluate_finish.png");
  width: 70%;
  height: 70%;
}
</style>