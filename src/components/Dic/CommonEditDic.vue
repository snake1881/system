<template>
  <el-dialog
    title="应用字典编辑"
    :visible.sync="editDicVisible"
    width="60%"
    :before-close="editDicClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="编码名称">
          <el-input v-model="editData.codeTypeName" />
        </el-form-item>
        <el-form-item label="编码类型">
          <el-input v-model="editData.codeType" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="editData.createTime" />
        </el-form-item>
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addDic()"
        >
          添加字典值
        </el-button>
        <div style="margin-left:0px">
          <el-form-item v-for="(item, index) in editData.dic" :key="index">
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
      <el-button type="primary" @click="saveEditDic(), editDicClose()">
        提交
      </el-button>
    </span>
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
      this.postRequest("/", this.editData).then(resp => {
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
      this.editData.dic.push({
        name: " ",
        value: " ",
        valueType: " ",
        description: " "
      });
    },
    // 删除
    dlete(val) {
      // var index = this.editData.dic.indexOf(item);
      // if (index !== -1) {
      //   this.addData.dic.splice(index, 1);
      // }
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/system/codeType/codeType/" + val.codeId).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
