<template>
  <el-dialog
    title="查看详情"
    :visible.sync="detailsDicVisible"
    width="60%"
    :before-close="detailsDicClose"
  >
    <div class="dialogDiv">
      <el-form :model="detailsData" label-width="80px">
        <el-form-item label="编码名称">
          <el-input v-model="detailsData.codeTypeName" />
        </el-form-item>
        <el-form-item label="编码类型">
          <el-input v-model="detailsData.codeType" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="detailsData.createTime" />
        </el-form-item>
        <div style="margin-left:0px">
          <el-form-item v-for="(item, index) in detailsData.dic" :key="index">
            <el-row>
              <el-col :span="6">
                <el-form-item label="名称">
                  <el-input v-model="item.name" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="值">
                  <el-input v-model="item.value" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="值类型">
                  <el-input v-model="item.valueType" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="描述">
                  <el-input v-model="item.description" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="detailsDicClose()">
        关闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    detailsDicVisible: {
      type: Boolean
    },
    detailsData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    detailsDicClose() {
      this.$emit("detailsClose");
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
