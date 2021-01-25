<template>
  <el-dialog
    title="添加功图至知识库"
    :visible.sync="editFeaturesVisible"
    width="60%"
    :before-close="editFeaturesClose"
  >
    <div class="dialogDiv">
      <el-form :model="featuresData" label-width="80px">
        <el-form-item label="井号">
          <el-input v-model="featuresData.wellName" />
        </el-form-item>
        <el-form-item label="采集时间">
          <el-input v-model="featuresData.dynaCreateTime" />
        </el-form-item>
        <el-form-item label="添加成为">
          <el-select v-model="featuresData.addType" placeholder="请选择">
            <el-option label="标准功图" value="标准功图" />
            <el-option label="特征功图" value="特征功图" />
          </el-select>
        </el-form-item>
        <el-form-item label="特征结果">
          <el-select
            v-model="featuresData.diagnosticResults"
            placeholder="请选择"
          >
            <el-option
              v-for="item in measuresoptions"
              :key="item.primaryId"
              :label="item.diagnosticResults"
              :value="item.diagnosticResults"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveEditFeatures(), editFeaturesClose()"
      >
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editFeaturesVisible: {
      type: Boolean,
    },
    featuresData: {
      wellName: String,
      dynaCreateTime: String,
      addType: String,
      diagnosticResults: String,
    },
  },
  data() {
    return {
      measuresoptions: [],
    };
  },
  created() {
    this.queryMeasures();
  },
  methods: {
    saveEditFeatures() {
      console.log(this.tileData);
    },
    // 对话框父子组件传值
    editFeaturesClose() {
      this.$emit("featuresRowClose");
    },
    //获取措施建议
    queryMeasures() {
      this.getRequest("/diagnosis/knowledge/tile/queryAllMeasures").then(
        (resp) => {
          if (resp) {
            this.measuresoptions = resp.data;
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style>
.el-input {
  width: 700px;
}
</style>
