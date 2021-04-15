import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
import VueAMap from "vue-amap"
import md5 from 'js-md5';

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$echarts = echarts;
Vue.use(VueAMap);
Vue.prototype.$md5 = md5;
VueAMap.initAMapApiLoader({
    key: "add9a4acb6a222e7695d72da7e4d9ae7",
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: "1.4.4",
    uiVersion: "1.0"
});
// axios引用
import { postRequest } from "./utils/request";
import { putRequest } from "./utils/request";
import { deleteRequest } from "./utils/request";
import { getRequest } from "./utils/request";
import { postKeyValueRequest } from "./utils/request";
import { uploadFile } from "./utils/request";
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.uploadFile = uploadFile;
import { initMenu } from "./utils/menu";

import './assets/icon/iconfont.css';
import './vendor/Blob'
import './vendor/Export2Excel'

import { hasPermission, hasNoPermission, hasAnyPermission, hasRole, hasAnyRole } from './utils/permissionDirect';

Vue.use(hasPermission)
Vue.use(hasNoPermission)
Vue.use(hasAnyPermission)
Vue.use(hasRole)
Vue.use(hasAnyRole)

// import { lastIndexOf } from "core-js/fn/array";

//WebSocketurl
//部署到定边的时候将url改为'ws://+"定边服务器地址"+:8692/dbznyt/socket/'
// export const baseWsUrl = "ws://192.168.0.115:8692/dbznyt/socket/";
// export const baseWsUrl = "ws://192.168.101.22:8692/dbznyt/socket/";
// export const baseWsUrl = "ws://10.168.101.22:8692/dbznyt/socket/";
export const baseWsUrl = "ws://10.21.11.222:8692/dbznyt/socket/";
Vue.prototype.UnReadQuantity = window.sessionStorage.getItem("unRead");


// 公共样式
import './assets/css/common.css';


// 获取当天日期yyyy-mm-dd
Vue.prototype.getTime = function(){
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
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
// 导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === "/") {
        next();
    } else {
        if (window.sessionStorage.getItem("user")) {
            initMenu(router, store);
            next();
        } else {
            next("/?redirect=" + to.path);
        }
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");