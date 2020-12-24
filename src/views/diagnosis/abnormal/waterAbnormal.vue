 <template>
  <div class="waterAbnormal">
    <el-form  class="waterAbnormal_form" :model="waterAbnormalData" :inline="true">
      <el-form-item label="日期">
        <el-date-picker
          size="medium"
          v-model="waterAbnormalData.createTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="opened()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
    class="waterAbnormal_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="waterAbnormal"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @cell-click="waterAbnormalCollect"
    >
      <el-table-column
        prop="oilStationName"
        label="采油站名称"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="waterTotal"
        label="总井数"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="openNumber"
        label="开井数"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="totalAllocation"
        label="总配注量"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="totalWaterInjection"
        label="总注水量"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="normalNumber"
        label="正常井数"
        width="150"
        align="center"
      >
      </el-table-column>
     
      <el-table-column
        prop="shortNumber"
        label="欠注井数"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="exceedNumber"
        label="超注井数"
        width="150"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div :style="{ width: '100%', height: '20px' }"></div>
    <div
      class="waterAbnormal_myChart"
      ref="myChart"
      :style="{ width: '100%', height: '45%' }"
    ></div>
    <common-water-collect
      :waterAbnormalVisible="waterAbnormalVisible"
      :editData="waterAbnormalData"
      @waterAbnormalCollectRowClose="waterAbnormalCollectClose"
    />
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import CommonWaterCollect from "../../..//components/diagnosis/abnormal/waterabnormalcollect/CommonWaterCollect";
export default {
  components: {
    CommonWaterCollect,
  },
  data() {
    return {
      termForm: {
        createTime: "",
      },
      waterAbnormal: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      coordinates: [[]],
      option: {},
      // 编辑
      waterAbnormalVisible: false,
      waterAbnormalData: {
        oilStationId: "",
        abnormalType: "",
        createTime: "",
      },
    };
  },
  created() {
    this.opened();
  },
  methods: {
    //
    opened() {
      this.waterAbnormalInit();
      // this.coordinate();
      // this.drawLine();
    },
    // 编辑
    waterAbnormalCollect(row, column) {
      console.log(row);
      this.waterAbnormalData.oilStationId = row.oilStationId;
      // this.waterAbnormal.createTime=this.termForm.createTime;
      if (column.label == "正常井数") {
        this.waterAbnormalData.abnormalType = "0";
        this.waterAbnormalVisible = true;
      } else if (column.label == "异常井数") {
        this.waterAbnormalData.abnormalType = "3";
        this.waterAbnormalVisible = true;
      } else if (column.label == "欠注井数") {
        this.waterAbnormalData.abnormalType = "1";
        this.waterAbnormalVisible = true;
      } else if (column.label == "超注井数") {
        this.waterAbnormalData.abnormalType = "2";
        this.waterAbnormalVisible = true;
      }
      console.log(this.waterAbnormalData);
    },
    // 关闭编辑框
    waterAbnormalCollectClose() {
      this.waterAbnormalVisible = false;
    },
    waterAbnormalInit() {
      // this.waterAbnormal.createTime=this.termForm.createTime;
      if (this.waterAbnormalData.createTime === "") {
        //默认传递当前日期
        this.waterAbnormalData.createTime = this.getdate();
      };
      this.getRequest(
        "/waterAbnormalCollect/waterCollect?createTime=" +
          this.waterAbnormalData.createTime
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.waterAbnormal = resp.data;
          // console.log(this.waterAbnormal);
          this.coordinate();
          // console.log(this.coordinates);
          if (this.coordinates != null) {
            this.$nextTick(() => {
              this.drawLine();
            });
          }
        }
      });
    },
    getOption() {
      this.option = {
        title: {
          x: "center",
          text: "注水井异常信息汇总",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{c}",
        },
        legend: {
          top: "10%",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        dataset: {
          source: this.coordinates
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false, //隐藏x坐标轴刻度
          },
          //x轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#42436A",
              fontSize: "12",
            },
            rotate: "30", //字体倾斜角度
          },
          //x轴颜色
          axisLine: {
            lineStyle: {
              color: "#e4e4e4",
            },
          },
        },
        yAxis: {
          type: "value",
          minInterval: 0, //只显示整数
          axisLine: {
            show: false, //隐藏y坐标轴
          },
          //y轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9495ab",
              fontSize: "12",
            },
          },
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: "#e4e4e4",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false, //隐藏y坐标轴刻度
          },
        },
        series: [
          {
            name: "总井数",
            type: "bar",
            barWidth: 6, //柱体宽带
            // data:this.coordinates[0],
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "开井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          ,
          {
            name: "总配注量",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          ,
          {
            name: "总注水量",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "正常井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
         
          {
            name: "欠注井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "超注井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
        ],
      };
    },
    // 画图
    drawLine() {
      let chart = this.$echarts.init(this.$refs.myChart);
      console.log(chart);
      console.log(this.coordinates);
      this.getOption();
      console.log(this.option);
      // 绘制图表
      chart.setOption(this.option,true);
      console.log("success");
      console.log(chart);
      //  }
    },
    //将坐标数据串处理为坐标点
    coordinate() {
      this.coordinates = [[]];
      for (var i = 0; i < this.waterAbnormal.length; i++) {
        var array = [];
        array[0] = this.waterAbnormal[i].oilStationName;
        array[1] = this.waterAbnormal[i].waterTotal;
        array[2] = this.waterAbnormal[i].openNumber;
        array[3] = this.waterAbnormal[i].totalAllocation;
        array[4] = this.waterAbnormal[i].totalWaterInjection;
        array[5] = this.waterAbnormal[i].normalNumber;
        // array[6] = this.waterAbnormal[i].abnormalNumber;
        array[6] = this.waterAbnormal[i].shortNumber;
        array[7] = this.waterAbnormal[i].exceedNumber;
        this.coordinates[i] = array;
      }
    },
    //获取当前日期
    getdate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/abnormal/waterAbnormalCollect.css";
</style>

