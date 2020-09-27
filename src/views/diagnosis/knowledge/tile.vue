<template>
  <div class="tile">
    <!-- 条件查询 -->
    <el-form class="tile_form" :model="logForm" :inline="true">
      <el-form-item label="采油站:">
        <el-select v-model="logForm.oilStation" placeholder="全区">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="井号:">
        <el-select v-model="logForm.wellId" placeholder>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期:">
        <el-date-picker
          placeholder="开始时间"
          v-model="logForm.startTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="结束时间"
          v-model="logForm.endTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="searchTile()">查询</el-button>
    </el-form>
    <div class="tile_echarts">
      <div
        class="tile_echarts_child"
        v-for="item in tableData"
        :key="item.dynaId"
        :id="item.dynaId"
        :style="{width: '24%', height: '250px'}"
      ></div>
    </div>
    <!-- 分页 -->
    <div class="tile_page">
      <el-pagination
        :current-page.sync="logForm.currentPage"
        :page-size="logForm.pageSize"
        :total="logForm.total"
        :page-sizes="[8, 16, 32, 48, 60]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      //搜索框
      logForm: {
        currentPage: 1,
        pageSize: 8,
        total: 0,
        oilStation: "",
        wellId: "定1155",
        startTime: "2020-01-31",
        endTime: "2020-01-31"
      },

      options: [
        {
          value: "定1172-1",
          label: "定1172-1"
        },
        {
          value: "定1179",
          label: "定1179"
        },
        {
          value: "定1155",
          label: "定1155"
        },
        {
          value: "定1160-3",
          label: "定1160-3"
        },
        {
          value: "定1174",
          label: "定1174"
        }
      ],
      tableData: [],
      coordinates: [[]]
    };
  },
  mounted() {},
  created() {
    this.searchTile();
    //输入框初始化默认时间
    this.getNowTime();  
  },
  methods: {
    //根据输入信息查询
    searchTile() {
      console.log(this.logForm);
      this.postRequest(
        "/diagnosis/knowledge/tile/queryByterm",
        this.logForm
      ).then(resp => {
        if (resp) {
          console.log(resp.data.records);
          this.tableData = resp.data.records;
          this.logForm.total = resp.data.total;
          this.logForm.currentPage = resp.data.current;
          this.logForm.pageSize = resp.data.size;
          this.tableData.forEach(element => {
            //处理数据为坐标
            this.coordinate(element);
            //将处理后的坐标添加到对象中
            this.$set(element, "coordinates", this.coordinates);
            //延迟到DOM更新之后再执行绘制图形
            this.$nextTick(function() {
              //实例化echarts
              this.drawLine(element);
            });
          });
        }
      });
    },
    //设置初始化时间
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}`;
      // this.$set(this.logForm, "startTime", defaultDate);
      // this.$set(this.logForm, "endTime", defaultDate);
    },
    //实例化图表
    drawLine(val) {
      // 基于准备好的dom，初始化echarts实例
      let dom = document.getElementById(val.dynaId);
      let myChart = echarts.init(dom);
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: val.dynaCreateTime,
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
              "</div>"
            );
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true
        },
        xAxis: {
          name: "位移",
          nameLocation: "middle",
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10
          }
        },
        yAxis: {
          name: "载荷(KN)",
          nameLocation: "middle",
          // min: 0,
          // max: 100,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10
          }
        },
        series: [
          {
            symbol: "none",
            data: val.coordinates,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5
            }
          }
        ]
      });
    },
    //将坐标数据串处理为坐标点
    coordinate(val) {
      var displacementArray = val.displacement.split(";");
      var disploadArray = val.dispLoad.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.logForm.pageSize = val;
      this.searchTile();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.logForm.currentPage = val;
      this.searchTile();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/knowledge/tile.css";
</style>
