<template>
  <div class="container">
    <svg
      width="800px"
      height="600px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id="path">
        <path
          stroke="#CCCCCC"
          fill="none"
          stroke-width="4"
          d="M45,55,h610,v200,L356,260,v200,L65,460"
        />
      </symbol>
      <use class="path1" xlink:href="#path"></use>
    </svg>
    <div>
      <span class="text1">XX联合站</span>
      <el-tooltip placement="left-end">
        <div slot="content">
          联合站 <br />
          总库容 <br />
          安全库容 <br />
          实际库容 
        </div>
        <el-image :src="require('../../assets/images/jar.png')" class="img1" />
      </el-tooltip>

      <span class="text2">XX联合站</span>
      <el-tooltip placement="right-start">
        <div slot="content">
           联合站 <br />
          总库容 <br />
          安全库容 <br />
          实际库容 
        </div>
        <el-image :src="require('../../assets/images/jar.png')" class="img2">
        </el-image>
      </el-tooltip>

      <span class="text3">XX联合站</span>
      <el-tooltip placement="top">
        <div slot="content">
          联合站 <br />
          总库容 <br />
          安全库容 <br />
          实际库容 
        </div>
        <el-image :src="require('../../assets/images/jar.png')" class="img3">
        </el-image>
      </el-tooltip>

      <span class="text4">XX联合站</span>
      <el-tooltip placement="bottom-end">
        <div slot="content">
          联合站 <br />
          总库容 <br />
          安全库容 <br />
          实际库容 
        </div>
        <el-image :src="require('../../assets/images/jar.png')" class="img4">
        </el-image>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  background-color: red;
  background: url('../../assets/images/map.jpeg') no-repeat;
}
// SVG画图
.path1 {
  animation: move1 5s linear infinite;
}
@keyframes move1 {
  0% {
    stroke-dasharray: 4, 5;
  }
  100% {
    stroke-dasharray: 6, 7;
  }
}
.text1{
  position: absolute;
  left: 40px;
  top: 25px;
  font-size: 12px;
  color: crimson;
}
.img1 {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50px;
  top: 50px;
}
.text2{
  position: absolute;
  left: 640px;
  top: 30px;
  font-size: 12px;
  color: crimson;
}
.img2 {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 645px;
  top: 50px;
}
.text3{
  position: absolute;
  left: 345px;
  top: 235px;
  font-size: 12px;
  color: crimson;
}
.img3 {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 355px;
  top: 255px;
}
.text4{
  position: absolute;
  left: 40PX;
  top: 430px;
  font-size: 12px;
  color: crimson;
}
.img4 {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50px;
  top: 450px;
}
</style>
