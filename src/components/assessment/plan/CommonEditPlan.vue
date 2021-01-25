<template>
  <el-dialog
    title="编辑考核计划"
    :visible.sync="editPlanVisible"
    width="59%"
    :before-close="editPlanClose"
  >
    <div class="editPlan">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="计划名称">
          <el-input v-model="editData.planName" />
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker
                type="datetime"
                v-model="editData.startDate"
                value-format="yyyy-MM-dd hh:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间">
              <el-date-picker
                type="datetime"
                v-model="editData.endDate"
                value-format="yyyy-MM-dd hh:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考核模板">
              <el-select v-model="editData.examineTId">
                <el-option
                  v-for="(item, index) in this.template"
                  :key="index"
                  :label="item.templateName"
                  :value="item.examineTId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addIndexDep()"
        >
          添加科室
        </el-button>
        <div class="editPlanDec">
          <el-form-item
            v-for="(item, index) in editData.resultInforList"
            :key="index"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="参考单位">
                  <el-input v-model="item.takeObject" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="总得分">
                  <el-input v-model="item.totalScore" />
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
      @click="saveAddPlan(), editPlanClose()"
      class="editPlanButton"
    >
      提交
    </el-button>
    <el-button type="info" @click="editPlanClose()"> 取消 </el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    editPlanVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  inject: ["reload"],
  data() {
    return {
      //模板
      template: [],
    };
  },
  created() {
    this.templateInit();
  },
  methods: {
    // 对话框父子组件传值
    editPlanClose() {
      this.$emit("editClose");
    },
    // 添加
    addIndexDep() {
      this.editData.resultInforList.push({
        takeObject: " ",
        totalScore: " ",
      });
    },
    // 删除
    dlete(val) {
      var index = this.editData.resultInforList.indexOf(val);
      if (index !== -1) {
        this.editData.resultInforList.splice(index, 1);
      }
    },
    //初始化
    templateInit() {
      this.getRequest("/examine/templateInfor/queryAll").then((resp) => {
        if (resp) {
          this.template = resp.data;
        }
      });
    },
    // 保存
    saveAddPlan() {
      this.putRequest(
        "/examine/planInfor/updateByPrimaryKey",
        this.editData
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "考核计划编辑成功!",
            type: "success",
          });
          this.reload();
        } else {
          this.$message.error("考核计划编辑失败，请重新提交!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.editPlan {
  height: 340px;
  overflow: auto;
}
.editPlanDec {
  margin-left: 0px;
  height: 140px;
  overflow-y: scroll;
}
.editPlanButton {
  margin-left: 260px;
}
</style><style>
element.style {
  margin: 0;
}
</style>
