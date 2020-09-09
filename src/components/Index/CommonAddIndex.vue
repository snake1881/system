<template>
  <el-dialog
    title="新增考核指标"
    :visible.sync="addIndexVisible"
    width="60%"
    :before-close="addIndexClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="指标名称">
          <el-input v-model="addData.indexName" />
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model="addData.scoreWeight" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input v-model="addData.sequence" />
        </el-form-item>
        <el-tree
          :data="addData.index"
          show-checkbox
          empty-text="暂无数据"
          ref="tree"
          highlight-current
          :props="defaultProps"
          node-key="indexDId"
          @check="getCheckedKeys()"
        />
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddIndex(addData), addIndexClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addIndexVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        indexName: "",
        scoreWeight: "",
        sequence: "",
        index: [],
        indexDIds: []
      },
      defaultProps: {
        children: "children",
        label: "examineContent"
      }
    };
  },
  created() {
    this.treeInIt();
  },
  methods: {
    // 对话框父子组件传值
    addIndexClose() {
      this.$emit("addClose");
    },
    // 菜单树
    treeInIt() {
      this.getRequest("/").then(resp => {
        if (resp) {
          this.addData.index = resp.data;
        }
      });
    },
    // 点击树节点选择对应菜单权限
    getCheckedKeys() {
      this.addData.indexDIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    // 保存
    saveAddIndex() {
      this.postRequest("/examine/templateInfor/insert", this.addData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "考核指标新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("考核指标新增失败，请重新提交!");
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
<style lang="less">
element.style {
  margin: 0;
}
</style>
