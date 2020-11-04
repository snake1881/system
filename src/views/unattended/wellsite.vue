<template>
<div class="wellsite">
  <div class="wellsite_left">
    <sapn class="wellsite_left_title">xxxx井场</sapn>
    <div class="wellsite_left_dailyData">
      <p class="wellsite_left_dailyData_p">日产液量: <span style="color:orange">6543</span> m<sup>3</sup></p>
      <p class="wellsite_left_dailyData_p">日注水量: <span style="color:orange">1341</span> m<sup>3</sup></p>
      <p class="wellsite_left_dailyData_p">电子巡检次数: <span style="color:orange">15</span> 次</p>
    </div>
    <span class="wellsite_left_condition">
      <i class="iconfont icon-yujing_gaoliang" style="color:rgb(214, 117, 117);font-size:20px" />
      工况预警
    </span>
    <div class="wellsite_left_condition_details">
      <ul :style="{'marginTop':marginTop+'px'}">
        <li v-for="(item,index) in conditionData" :key='index' class="wellsite_left_condition_details_li">{{item.name}}</li>
      </ul>
    </div>
    <span class="wellsite_left_condition">
      <i class="iconfont icon-yujing_gaoliang" style="color:rgb(214, 117, 117);font-size:20px" />
      监控预警
    </span>
    <div class="wellsite_left_condition_details">
      <ul :style="{'marginTop':marginTop+'px'}">
        <li v-for="(item,index) in conditionData" :key='index' class="wellsite_left_condition_details_li">{{item.name}}</li>
      </ul>
    </div>
    <div class="wellsite_left_img">
      <img src="../../assets/images/monitor.jpg" style="height:100%;width:100%;margin-top:1%" />
    </div>
    <div class="wellsite_left_video">
      <div class="wellsite_left_video_container" v-for="(item,index) in 1" :key="index">
        <div><i class="iconfont icon-shexiangtou" style="color:green;font-size:30px" />正常</div>
      </div>
      <div class="wellsite_left_video_container" v-for="(item,index) in 1" :key="index">
        <div><i class="iconfont icon-shexiangtou" style="color:red;font-size:30px" />异常</div>
      </div>
    </div>
  </div>
  <div class="wellsite_right">
    <div class="wellsite_right_oilWell">
      <div class="wellsite_right_oilWell_details" v-for="(item,index) in 12" :key="index">
        <div class="wellsite_right_oilWell_details_title">XX采油井</div>
        <img src="../../assets/images/oilWell.gif" class="wellsite_right_oilWell_details_img" @click="gotoSingleWell()">
        <div class="wellsite_right_oilWell_details_dec">
          <span class="wellsite_right_waterWell_details_dec_span">当日产液: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span class="wellsite_right_waterWell_details_dec_span">动液面: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span class="wellsite_right_waterWell_details_dec_span">工况诊断: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span class="wellsite_right_waterWell_details_dec_span">异常情况: <span style="color:red"> 供液不足</span></span>
        </div>
      </div>
    </div>
    <div class="wellsite_right_waterWell">
      <div class="wellsite_right_waterWell_details" v-for="(item,index) in 4" :key="index">
        <div class="wellsite_right_waterWell_details_title">XX注水井</div>
        <img src="../../assets/images/waterWell.png" class="wellsite_right_waterWell_details_img">
        <div class="wellsite_right_waterWell_details_dec">
          <span class="wellsite_right_waterWell_details_dec_span">瞬时注量: <span style="color:#06c">134</span> m<sup>3</sup>/h</span>
          <span class="wellsite_right_waterWell_details_dec_span">当日注水: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span class="wellsite_right_waterWell_details_dec_span">累计注水: <span style="color:#06c">134</span> m<sup>3</sup></span>
          <span class="wellsite_right_waterWell_details_dec_span">异常情况: <span style="color:red"> 超注</span></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      // 工况预警
      conditionData: [{
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        },
        {
          name: "XXXX出现XXXX预警情况"
        }
      ],
      marginTop: 0,
      timer: '', // 定时器
    }
  },
  created() {
    // this.timer = setInterval(this.showNotice, 200) //100表示间隔时间，数字越大滚得越快
  },
  methods: {
    showNotice() {
      this.marginTop -= 1
      if (this.marginTop < -20) { // 滚上去36px后把前两条数据拉下来
        this.conditionData.push(this.conditionData[0])
        this.conditionData.shift()
        this.marginTop = 0
      }
    },
    // 返回采油站页面
    gotoOilStation() {
      this.$router.replace("/unattended/oilStation");
    },
    // 跳转到单井页面
    gotoSingleWell() {
      this.$router.replace("/unattended/singleWell");
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/wellsite.css";
</style>
<style>
.wellsite_left_condition_details ul li:before {
  display: inline-block;
  content: "●";
  padding-right: 10px;
  color: rgb(214, 117, 117);
  font-size: 20px;
}
</style>
