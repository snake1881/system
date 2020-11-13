<template>
<el-dialog title="考核指标编辑" :visible.sync="editIndexVisible" width="50%" :before-close="editIndexClose">
  <div class="editIndex">
    <el-form :model="editData" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="指标名称">
            <el-input v-model="editData.indexName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分值">
            <el-input v-model="editData.scoreWeight" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排列顺序">
            <el-input v-model="editData.sequence" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="考核模板">
        <el-select v-model="editData.examineTId">
          <el-option v-for="(item, index) in this.template" :key="index" :label="item.templateName" :value="item.examineTId" />
        </el-select>
      </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="父级指标">
        <el-select v-model="editData.indexPName">
          <el-option v-for="(item, index) in this.pIndex" :key="index" :label="item.indexName" :value="item.indexPId" />
        </el-select>
      </el-form-item>
        </el-col>
      </el-row>
      <el-button type="text" class="el-icon-circle-plus-outline" @click="addIndexDetail()">
        添加考核指标明细
      </el-button>
      <div class="editIndexDec">
        <el-form-item v-for="(item, index) in editData.indexDetails" :key="index">
          <el-row>
            <el-col :span="8">
              <el-form-item label="考核内容">
                <el-input v-model="item.examineContent" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分值">
                <el-input v-model="item.score" />
              </el-form-item>
            </el-col>
            <el-button type="text" style="margin-left:20px" @click="dlete(item)">
              删除
            </el-button>
          </el-row>
        </el-form-item>
      </div>
    </el-form>
  </div>
    <el-button type="primary" @click="saveEditIndex(), editIndexClose()" class="editInedxButton"> 提交</el-button>
    <el-button type="info" @click="editIndexClose()"> 取消</el-button>
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
      // 模板
      template: [],
      // 父级指标
      pIndex: []
    };
  },
  created() {
    this.templateInit();
    this.pIndexInit();
  },
  methods: {
    // 对话框父子组件传值
    editIndexClose() {
      this.$emit("editClose");
    },
    // 添加
    addIndexDetail() {
      this.editData.indexDetails.push({
        examineContent: " ",
        score: " "
      });
    },
    // 删除
    dlete(val) {
      var index = this.editData.indexDetails.indexOf(val);
      if (index !== -1) {
        this.addData.indexDetails.splice(index, 1);
      }
    },
    //模板初始化
    templateInit() {
      this.getRequest("/examine/templateInfor/queryAll").then(resp => {
        if (resp) {
          this.template = resp.data;
        }
      });
    },
    // 父级指标初始化
    pIndexInit() {
      this.getRequest("/examine/IndexInfo/queryAll").then(resp => {
        if (resp) {
          this.pIndex = resp.data;
        }
      });
    },
    // 保存修改后的信息
    saveEditIndex() {
      this.putRequest("/examine/IndexInfo/updateById", this.editData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "信息更改成功!",
              type: "success"
            });
          } else {
            this.$message.error("信息更改失败，请重新提交!");
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.editIndex {
  height: 350px;
  overflow: auto;
}
.editIndexDec {
  margin-left:0px; 
 height:140px;
 overflow-y:scroll 
}
.editInedxButton {
  margin: 0 0 0 260px;
}
</style><style lang="less">
element.style {
  margin: 0;
}
</style>
