<template>
  <el-dialog
    title="新增考核指标"
    :visible.sync="addIndexVisible"
    width="50%"
    :before-close="addIndexClose"
  >
    <div class="addIndex">
      <el-form :model="addData" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="指标名称">
              <el-input v-model="addData.indexName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="权重">
              <el-input v-model="addData.scoreWeight" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排列顺序">
              <el-input v-model="addData.sequence" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="考核模板">
              <el-select v-model="addData.examineTId">
                <el-option
                  v-for="(item, index) in this.template"
                  :key="index"
                  :label="item.templateName"
                  :value="item.examineTId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="父级指标">
              <el-select v-model="addData.indexPId">
                <el-option
                  v-for="(item, index) in this.pIndex"
                  :key="index"
                  :label="item.indexName"
                  :value="item.indexPId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addIndexDetail()"
        >
          添加考核指标明细
        </el-button>
        <div class="addIndexDec">
          <el-form-item
            v-for="(item, index) in addData.indexDetails"
            :key="index"
          >
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
              <el-button
                type="text"
                style="margin-left: 20px"
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
      @click="saveAddIndex(addData), addIndexClose()"
      class="addIndexButton"
    >
      提交</el-button
    >
    <el-button type="info" @click="addIndexClose()"> 取消</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    addIndexVisible: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        indexName: "",
        scoreWeight: "",
        examineTId: "",
        indexPId: "",
        indexDetails: [
          {
            examineContent: " ",
            score: " ",
          },
        ],
      },
      // 考核模板
      template: [],
      // 父级指标
      pIndex: [],
    };
  },
  created() {
    this.templateInit();
    this.pIndexInit();
  },
  methods: {
    // 对话框父子组件传值
    addIndexClose() {
      this.$emit("addClose");
    },
    // 添加
    addIndexDetail() {
      this.addData.indexDetails.push({
        examineContent: " ",
        score: " ",
      });
    },
    // 删除
    dlete(val) {
      var index = this.addData.indexDetails.indexOf(val);
      if (index !== -1) {
        this.addData.indexDetails.splice(index, 1);
      }
    },
    //模板初始化
    templateInit() {
      this.getRequest("/examine/templateInfor/queryAll").then((resp) => {
        if (resp) {
          this.template = resp.data;
        }
      });
    },
    // 父级指标初始化
    pIndexInit() {
      this.getRequest("/examine/IndexInfo/queryAll").then((resp) => {
        if (resp) {
          this.pIndex = resp.data;
        }
      });
    },
    // 保存
    saveAddIndex() {
      this.postRequest("/examine/IndexInfo/save", this.addData).then((resp) => {
        if (resp) {
          this.$message({
            message: "考核指标新增成功!",
            type: "success",
          });
          this.reload();
        } else {
          this.$message.error("考核指标新增失败，请重新提交!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.addIndex {
  height: 350px;
  overflow: auto;
}
.addIndexDec {
  margin-left: 0px;
  height: 140px;
  overflow-y: scroll;
}
.addIndexButton {
  margin: 0 0 0 280px;
}
</style><style >
element.style {
  margin: 0;
}
</style>
