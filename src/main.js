import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
import VueAMap from "vue-amap";

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$echarts = echarts;
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'add9a4acb6a222e7695d72da7e4d9ae7',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// axios引用
import { postRequest } from "./utils/request";
import { putRequest } from "./utils/request";
import { deleteRequest } from "./utils/request";
import { getRequest } from "./utils/request";
import { postKeyValueRequest } from "./utils/request";
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
import { initMenu } from "./utils/menu";

import './assets/icon/iconfont.css';

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