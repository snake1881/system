<template>
  <el-dialog
    title="考核指标编辑"
    :visible.sync="editIndexVisible"
    width="60%"
    :before-close="editIndexClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="指标名称">
          <el-input v-model="editData.indexName" />
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model="editData.scoreWeight" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input v-model="editData.sequence" />
        </el-form-item>
        <!-- 树形结构 -->
        <el-tree
          :data="treeData"
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
      <el-button type="primary" @click="saveEditIndex(), editIndexClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editIndexVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {
      treeData: [],
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
    editIndexClose() {
      this.$emit("editClose");
    },
    // 菜单树
    treeInIt() {
      this.getRequest("/").then(resp => {
        if (resp) {
          this.treeData = resp.data;
        }
      });
    },
    // 点击树节点选择对应菜单权限
    getCheckedKeys() {
      this.editData.indexDIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    // 保存修改后的信息
    saveEditIndex() {
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
