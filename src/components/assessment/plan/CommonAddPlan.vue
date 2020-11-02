<template>
  <el-dialog
    title="新增考核计划"
    :visible.sync="addPlanVisible"
    width="60%"
    :before-close="addPlanClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="计划名称">
          <el-input v-model="addData.planName" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            type="datetime"
            v-model="addData.startDate"
            value-format="yyyy-MM-dd hh:mm:ss"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            type="datetime"
            v-model="addData.endDate"
            value-format="yyyy-MM-dd hh:mm:ss"
          />
        </el-form-item>
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
        <el-button
          type="text"
          class="el-icon-circle-plus-outline"
          @click="addIndexDep()"
        >
          添加科室
        </el-button>
        <div style="margin-left:0px">
          <el-form-item
            v-for="(item, index) in addData.resultInforList"
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
      <el-button type="primary" @click="saveAddPlan(addData), addPlanClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addPlanVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        planName: "",
        startDate: "",
        endDate: "",
        template: "",
        resultInforList: [
          {
            takeObject: " ",
            totalScore: " "
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
    addPlanClose() {
      this.$emit("addClose");
    },
    // 添加
    addIndexDep() {
      this.addData.resultInforList.push({
        takeObject: " ",
        totalScore: " "
      });
    },
    // 删除
    dlete(val) {
      var index = this.addData.resultInforList.indexOf(val);
      if (index !== -1) {
        this.addData.resultInforList.splice(index, 1);
      }
    },
    //初始化
    templateInit() {
      this.getRequest("/examine/templateInfor/queryAll").then(resp => {
        if (resp) {
          this.template = resp.data;
        }
      });
    },
    // 保存
    saveAddPlan() {
      this.postRequest("/examine/planInfor/insert", this.addData).then(resp => {
        if (resp) {
          this.$message({
            message: "考核计划新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("考核计划新增失败，请重新提交!");
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
