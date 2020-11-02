<template>
  <el-dialog
    title="新增考核指标明细"
    :visible.sync="addDetailVisible"
    width="60%"
    :before-close="addDetailClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="考核指标">
          <el-select v-model="addData.indexId">
            <el-option
              v-for="(item, index) in this.Index"
              :key="index"
              :label="item.indexName"
              :value="item.indexId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="考核内容">
          <el-input v-model="addData.examineContent" />
        </el-form-item>
        <el-form-item label="工作要求">
          <el-input v-model="addData.requirement" />
        </el-form-item>
        <el-form-item label="考核标准">
          <el-input v-model="addData.examineStandard" />
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model="addData.score" />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="addData.active">
            <el-option label="无效" value="0" />
            <el-option label="有效" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveAddDetail(addData), addDetailClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addDetailVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        examineContent: "",
        requirement: "",
        examineStandard: "",
        score: "",
        sequence: "",
        active: "",
        indexId:"",
      },
      // 考核指标
      Index: []
    };
  },
  created() {
    this.IndexInit();
  },
  methods: {
    // 对话框父子组件传值
    addDetailClose() {
      this.$emit("addClose");
    },
    // 考核指标初始化
    IndexInit() {
      this.getRequest("/examine/IndexInfo/queryAll").then(resp => {
        if (resp) {
          this.Index = resp.data;
        }
      });
    },
    // 保存
    saveAddDetail() {
      this.postRequest(
        "/examine/IndexDetail/bizExamineIndexDetail",
        this.addData
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "考核指标明细新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("考核指标明细新增失败，请重新提交!");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less">
element.style {
  margin: 0;
}
</style>
