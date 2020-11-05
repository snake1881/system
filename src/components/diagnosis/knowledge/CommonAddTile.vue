<template>
  <el-dialog
    title="添加功图至知识库"
    :visible.sync="addTileVisible"
    width="60%"
    :before-close="addTileClose"
  >
    <div class="dialogDiv">
      <el-form :model="tileData" label-width="80px">
        <el-form-item label="井号">
          <el-input v-model="tileData.wellId" />
        </el-form-item>
        <el-form-item label="采集时间">
          <el-input v-model="tileData.dynaCreateTime" />
        </el-form-item>
        <el-form-item label="添加成为">
          <el-select v-model="addType" placeholder="请选择">
            <el-option label="标准功图" value="0"></el-option>
            <el-option label="特征功图" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特征结果">
          <el-select v-model="diagnosticResults" placeholder="请选择">
            <el-option
              v-for="item in measuresoptions"
              :key="item.primaryId"
              :label="item.diagnosticResults"
              :value="item.diagnosticResults"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddTile(), addTileClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addTileVisible: {
      type: Boolean
    },
    tileData: {
      type: Object
    }
  },
  data() {
    return {
      measuresoptions: [],
      standardData: {
        primaryId: "",
        wellId: "",
        wellCommonName: "",
        checkDate: "",
        dyna: "",
        stroke: "",
        frequency: "",
        suspMaxLoad: "",
        suspMinLoad: "",
        upgoingMaxCurrent: "",
        downgoingMaxCurrent: "",
        label: "",
        authDate: "",
        author: "",
        dynaId: ""
      },
      addType: "",
      diagnosticResults: ""
    };
  },
  created() {
    this.queryMeasures();
  },
  methods: {
    saveAddTile() {
      // if (this.addType == 0) {
      //   this.postRequest(
      //     "/diagnosis/knowledge/standardCard/insert",
      //     this.standardData
      //   ).then(resp => {
      //     if (resp) {
      //       console.log(this.standardData);
      //       this.$message({
      //         message: "添加标准功图库成功!",
      //         type: "success"
      //       });
      //     }else{
      //       this.$message.error("添加标准功图库失败，请重新提交!");
      //     }
      //   });
      // }
      console.log(this.tileData);
      this.standardData.wellCommonName = this.tileData.wellId;
      this.standardData.checkDate = this.tileData.dynaCreateTime;
      this.standardData.stroke = this.tileData.stroke;
      this.standardData.frequency = this.tileData.frequency;
      this.standardData.suspMaxLoad = this.tileData.suspMaxLoad;
      this.standardData.suspMinLoad = this.tileData.suspMinLoad;
      this.standardData.upgoingMaxCurrent = this.tileData.upgoingMaxCurrent;
      this.standardData.downgoingMaxCurrent = this.tileData.downgoingMaxCurrent;
      this.standardData.label = this.diagnosticResults;
      this.standardData.dynaId = this.tileData.dynaId;
      console.log(this.standardData);
    },
    // 对话框父子组件传值
    addTileClose() {
      this.addType = "";
      this.diagnosticResults = "";
      this.$emit("tileRowClose");
    },
    //获取措施建议
    queryMeasures() {
      this.getRequest("/diagnosis/knowledge/tile/queryAllMeasures").then(
        resp => {
          if (resp) {
            this.measuresoptions = resp.data;
          }
        }
      );
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
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
