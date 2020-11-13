<template>
  <el-dialog
    title="作业设计模板下载"
    size="42%"
    :visible.sync="planDownloadVisible"
    :before-close="planDownloadClose"
  >
    <div  class="dialogDiv">
      <el-form label-width="120px">
        <el-from-item label="模板选择：">
          <span>模板选择：</span>
          <el-select clearable v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-from-item>
      </el-form>
    </div>
    <el-button
      class="downloadExcelButton"
      @click="downloadExcel(), planDownloadClose()"
      type="primary"
    >
      下载模板
    </el-button>
    <el-button @click="planDownloadClose()" type="info">
      取消
    </el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    planDownloadVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "断杆"
        },
        {
          value: "2",
          label: "卡泵"
        },
        {
          value: "3",
          label: "漏失"
        },
        {
          value: "4",
          label: "套提100米设计"
        },
        {
          value: "5",
          label: "套下50米设计"
        },
        {
          value: "6",
          label: "停井恢复"
        },
        {
          value: "7",
          label: "下生产管柱"
        },
        {
          value: "8",
          label: "周期检泵"
        },
        {
          value: "9",
          label: "座封检泵"
        }
      ],
      value: "",
      isColor: true
    };
  },
  methods: {
    // 对话框父子组件传值
    planDownloadClose() {
      this.$emit("planDownloadRowClose");
    },
    open() {
      this.$alert("请选择模板", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    downloadExcel() {
      if (this.value === "") {
        this.open();
      } else if (this.value === "1") {
        window.location.href = "/断杆.docx";
      } else if (this.value === "2") {
        window.location.href = "/卡泵.docx";
      } else if (this.value === "3") {
        window.location.href = "/漏失.docx";
      } else if (this.value === "4") {
        window.location.href = "/套提100米设计.docx";
      } else if (this.value === "5") {
        window.location.href = "/套下50米设计.docx";
      } else if (this.value === "6") {
        window.location.href = "/停井恢复.docx";
      } else if (this.value === "7") {
        window.location.href = "/下生产管柱.docx";
      } else if (this.value === "8") {
        window.location.href = "/周期检泵.docx";
      } else if (this.value === "9") {
        window.location.href = "/座封检泵.docx";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 200px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 420px;
  height: 2px;
}
.downloadExcelButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
