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
        <el-form-item label="考核模板">
          <el-select v-model="addData.template">
            <el-option
              v-for="(item, index) in this.template"
              :key="index"
              :label="item.templateName"
              :value="item.examineTId"
            />
          </el-select>
        </el-form-item>
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addIndexDetail()"
        >
          添加考核指标明细
        </el-button>
        <div style="margin-left:0px">
          <el-form-item
            v-for="(item, index) in addData.sysTCodeInforList"
            :key="index"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="考核内容">
                  <el-input v-model="item.examineContent" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工作要求">
                  <el-input v-model="item.requirement" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="考核标准">
                  <el-input v-model="item.examineStandard" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分值">
                  <el-input v-model="item.score" />
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
        template: "",
        sysTCodeInforList: [
          {
            codeName: " ",
            codeValue: " ",
            valueType: " ",
            description: " "
          }
        ]
      },
      template: []
    };
  },
  created() {
    this.templateInit();
  },
  methods: {
    // 对话框父子组件传值
    addIndexClose() {
      this.$emit("addClose");
    },
    // 添加
    addIndexDetail() {
      this.addData.sysTCodeInforList.push({
        codeName: " ",
        codeValue: " ",
        valueType: " ",
        description: " "
      });
    },
    // 删除
    dlete(val) {
      var index = this.addData.sysTCodeInforList.indexOf(val);
      if (index !== -1) {
        this.addData.sysTCodeInforList.splice(index, 1);
      }
    },
    //表格数据初始化
    templateInit() {
      this.getRequest("/examine/templateInfor/queryAll").then(resp => {
        if (resp) {
          this.template = resp.data;
        }
      });
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
