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
          <el-input v-model="addData.codeTName" />
        </el-form-item>
        <el-form-item label="编码类型">
          <el-input v-model="addData.codeType" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addData.remark" />
        </el-form-item>
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addDic()"
        >
          添加字典值
        </el-button>
        <div style="margin-left:0px">
          <el-form-item
            v-for="(item, index) in addData.sysTCodeInforList"
            :key="index"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input v-model="item.codeName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="值">
                  <el-input v-model="item.codeValue" />
                </el-form-item>
              </el-col>
              <el-button
                type="text"
                style="margin-left:20px"
                @click="dlete(item)"
              >
                删除
              </el-button>
            </el-row>
          </el-form-item>
        </div>
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
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        codeTName: "",
        codeType: "",
        remark: "",
        sysTCodeInforList: [
          {
            codeName: " ",
            codeValue: " "
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
      this.addData.sysTCodeInforList.push({
        codeName: " ",
        codeValue: " "
      });
    },
    // 删除
    dlete(val) {
      var index = this.addData.sysTCodeInforList.indexOf(val);
      if (index !== -1) {
        this.addData.sysTCodeInforList.splice(index, 1);
      }
    },
    // 保存
    saveAddDic() {
      this.postRequest("/system/codeType/codeType", this.addData).then(resp => {
        if (resp) {
          this.$message({
            message: "应用字典新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("应用字典新增失败，请重新提交!");
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
