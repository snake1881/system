<template>
  <el-dialog
    title="新增应用字典"
    :visible.sync="addDicVisible"
    width="60%"
    :before-close="addDicClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="编码名称">
          <el-input v-model="addData.codeName" />
        </el-form-item>
        <el-form-item label="编码类型">
          <el-input v-model="addData.codeType" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addData.remarks" />
        </el-form-item>
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addDic()"
        >
          添加字典值
        </el-button>
        <el-form-item v-for="(item, index) in addData.dic" :key="index">
          <el-form-item :prop="'dic.' + index + '.name'" label="名称">
            <el-input v-model="item.name" />
          </el-form-item>
          <el-form-item :prop="'dic.' + index + '.value'" label="值">
            <el-input v-model="item.value" />
          </el-form-item>
          <el-form-item :prop="'dic.' + index + '.valueType'" label="值类型">
            <el-input v-model="item.valueType" />
          </el-form-item>
          <el-form-item :prop="'dic.' + index + '.description'" label="描述">
            <el-input v-model="item.description" />
          </el-form-item>
          <el-button type="text" @click="dlete(addData.dic)">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddDic(addData), addDicClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addDicVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      // 表单数据
      addData: {
        codeName: "",
        codeType: "",
        remarks: "",
        dic: [
          {
            name: " ",
            value: " ",
            valueType: " ",
            description: " "
          }
        ]
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addDicClose() {
      this.$emit("addClose");
    },
    // 添加
    addDic() {
      this.addData.dic.push({
        name: " ",
        value: " ",
        valueType: " ",
        description: " "
      });
    },
    // 删除
    dlete(item) {
      var index = this.addData.dic.indexOf(item);
      if (index !== -1) {
        this.addData.dic.splice(index, 1);
      }
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
