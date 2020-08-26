<template>
  <div>
    <svg
      width="800px"
      height="600px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 流动线条 -->
      <symbol id="path">
        <path
          stroke="#CCCCCC"
          fill="none"
          stroke-width="4"
          d="M90,55,h610,v200,L356,260,v200,L65,460"
        />
      </symbol>
      <!-- 背景框 -->
      <symbol id="path2">
        <path
          stroke="black"
          fill="none"
          stroke-width="1"
          d="M5,35,h15,v45,L5,80,v-45"
        />
      </symbol>
      <!-- 填充内容 -->
      <symbol id="path3">
        <path fill="green" stroke-width="1" d="M6,50,h13,v30,L6,80,v-30" />
      </symbol>

      <use class="path1" xlink:href="#path" />
      <use xlink:href="#path2" />
      <use xlink:href="#path3" />
    </svg>
    <div>
      <div class="img1">
        <!-- <div id="myChart" style="width:50px;height:80px; position:relative"></div> -->
      </div>
      <el-image :src="require('../../assets/images/light.jpg')" class="img2" />
      <el-image :src="require('../../assets/images/motor.jpg')" class="img3" />
      <el-image
        :src="require('../../assets/images/pipeline.jpg')"
        class="img4"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            label: {
              show: true,
              position: "top"
            },
            data: [10],
            type: "bar"
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.path1 {
  animation: move1 5s linear infinite;
}
@keyframes move1 {
  0% {
    stroke-dasharray: 5, 5;
  }
  100% {
    stroke-dasharray: 5, 5;
  }
}
.img1 {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 35px;
  background: url("../../assets/images/tank.png") no-repeat;
  z-index: -1;
}
.img2 {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 610px;
  top: 20px;
}
.img3 {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 340px;
  top: 230px;
}
.img4 {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 420px;
}
</style>
