<template>
  <el-dialog
    title="应用字典编辑"
    :visible.sync="editDicVisible"
    width="50%"
    :before-close="editDicClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="编码名称">
          <el-input v-model="editData.codeTName" />
        </el-form-item>
        <el-form-item label="编码类型">
          <el-input v-model="editData.codeType" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" v-model="editData.sequence"  />
        </el-form-item> 
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addDic()"
        >
          添加字典值
        </el-button>
        <div class="editDicDescription">
          <el-form-item
            v-for="(item, index) in editData.sysTCodeInforList"
            :key="index"
          >
            <el-row>
              <el-col :span="11">
                <el-form-item label="名称">
                  <el-input v-model="item.codeName" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
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
    <el-button
      type="primary"
      @click="saveEditDic(), editDicClose()"
      class="editDicButton"
      >提交</el-button
    >
    <el-button type="info" @click="editDicClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editDicVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editDicClose() {
      this.$emit("editClose");
    },
    // 保存修改后的信息
    saveEditDic() {
      console.log(this.addDic);
      this.putRequest("/system/codeType/codeType", this.editData).then(resp => {
        if (resp) {
          this.$message({
            message: "信息更改成功!",
            type: "success"
          });
        } else {
          this.$message.error("信息更改失败，请重新提交!");
        }
      });
    },
    // 添加
    addDic() {
      if (this.editData.sysTCodeInforList === null) {
        this.editData.sysTCodeInforList = [];
      }
      this.editData.sysTCodeInforList.push({
        codeName: " ",
        codeValue: " "
      });
    },
    // 删除
    dlete(item) {
      var index = this.editData.sysTCodeInforList.indexOf(item);
      if (index !== -1) {
        this.editData.sysTCodeInforList.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.editDicDiv {
  height: 380px;
  overflow: auto;
}
.editDicButton {
  margin: 0 0 0 240px;
}
.editDicDescription {
  margin-left: 0px;
  height: 140px;
  overflow-y: scroll;
}
</style>
