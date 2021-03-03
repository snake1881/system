<template>
  <el-dialog
    title="水井配注量调整"
    :visible.sync="waterInjectionAllocationVisible"
    width="40%"
    :before-close="waterInjectionAllocationClose"
    @opened="opens"
  >
    <div class="dialogDiv">
      <el-form :model="termData" label-position="right" label-width="200px">
        <el-form-item label="采油站">
          <el-select
            v-model="termData.uid"
            clearable
            filterable
            placeholder="采油站"
            size="medium"
            @change="queryWellByIem"
          >
            <el-option
              v-for="item in oilStationOptions"
              :key="item.iem"
              :label="item.psjName"
              :value="item.iem"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="井名">
          <el-select
            v-model="termData.rn"
            clearable
            filterable
            placeholder="全区"
            size="medium"
          >
            <el-option
              v-for="item in waterWellOptions"
              :key="item.num"
              :label="item.wellName"
              :value="item.num"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="配注量">
          <el-input v-model="termData.value" size="small" style="width: 140px">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        right="50%"
        type="primary"
        @click="saveWaterInjectionAllocation(), waterInjectionAllocationClose()"
        >提交</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import crypto from "crypto";
export default {
  props: {
    waterInjectionAllocationVisible: {
      type: Boolean,
    },
    waterInjectionAllocationData: {
      type: Object,
    },
  },
  data() {
    return {
      //采油站下拉选择框数据
      oilStationOptions: [],
      //水井选择框
      waterWellOptions: [],
      //传递参数
      termData: {
        rn: "",
        uid: "",
        value: "",
      },
      time: "",
      sign: "",
    };
  },
  methods: {
    opens() {
      this.oilStationInit();
    },
    // 对话框父子组件传值
    waterInjectionAllocationClose() {
      this.$emit("waterInjectionAllocationRowClose");
    },
    getTime() {
      let date = new Date();
      let dateYear = date.getFullYear(); //获取年
      let dateMonth = date.getMonth() + 1; //获取月
      let dateDate = date.getDate(); //获取当日
      let dateHours = date.getHours(); //获取小时
      let dateMinutes = date.getMinutes(); //获取分钟
      let dateSeconds = date.getSeconds();
      dateMonth = dateMonth < 10 ? "0" + dateMonth : dateMonth;
      // var strDate = date.getDate();
      dateDate = dateDate < 10 ? "0" + dateDate : dateDate;
      dateHours = dateHours < 10 ? "0" + dateHours : dateHours;
      dateMinutes = dateMinutes < 10 ? "0" + dateMinutes : dateMinutes;
      dateSeconds = dateSeconds < 10 ? "0" + dateSeconds : dateSeconds;
      this.time =
        dateYear +
        "-" +
        dateMonth +
        "-" +
        dateDate +
        " " +
        dateHours +
        ":" +
        dateMinutes +
        ":" +
        dateSeconds;
      console.log(this.time);
    },
    createSign() {
      let data = {
        token: "ZWQ1NDM2MGEtZTc1NS00MDRhLWJjZmEtMDhiMjg5Njg0ZTEz",
        timestamp: this.time,
        data: {
          uid: this.termData.uid,
          sn: this.termData.rn*1,
          value: this.termData.value*1,
        },
      };
      let resultArr = [];
      for (let key in data) {
        let arr = [];
        arr[0] = key;
        if (typeof data[key] == "object") {
          arr[1] = JSON.stringify(data[key]); //对象转成字符串
          data[key] = JSON.stringify(data[key]);
        } else {
          arr[1] = data[key];
        }
        resultArr.push(arr);
      }
      resultArr.sort((a, b) => {
        if (a[0] < b[0]) {
          return -1; //升序
        }
        if (a[0] > b[0]) {
          return 1; //降序
        }
        return 0;
      });
      let content = "IMC";
      resultArr.forEach((arr) => (content += arr.join(""))); //字符串拼接
      content += "YCOF";
      console.log(content);
      var result = crypto.createHash("md5").update(content).digest("hex");
      let item = {
        ...data,
        sign: result.toUpperCase(),
      };
      console.log(item);
      this.sign = item.sign;
      console.log(this.sign);
      return item;
    },

    // 保存修改后的信息
    saveWaterInjectionAllocation() {
      this.getTime();
      this.createSign();
      console.log(this.termData);
      console.log(this.time);
      console.log(this.sign);
      this.postRequest(
        "/waterAbnormalCollect/addGyInjection?sign=" +
          this.sign +
          "&sn=" +
          this.termData.rn +
          "&timestamp=" +
          this.time +
          "&uid=" +
          this.termData.uid +
          "&value=" +
          this.termData.value
      ).then((resp) => {
        if (resp.data===0) {
          // console.log(resp);
          this.$message({
            message: "水井配注量调配成功！",
            type: "success",
          });
        } else {
          this.$message.error("水井配注量修改失败!");
        }
      });
    },
    oilStationInit() {
      this.getRequest("/waterAbnormalCollect/GyIemCollect").then((resp) => {
        this.loading = false;
        this.oilStationOptions = resp.data;
      });
    },
    queryWellByIem(val) {
      console.log(val);
      this.getRequest(
        "/waterAbnormalCollect/GyIemCollectByPsj?iem=" + val
      ).then((resp) => {
        this.waterWellOptions = resp.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 700px;
}
</style>
