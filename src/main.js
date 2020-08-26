import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$echarts = echarts;
// axios引用
import { postRequest } from "./utils/request";
import { putRequest } from "./utils/request";
import { deleteRequest } from "./utils/request";
import { getRequest } from "./utils/request";
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.postRequest = postRequest;
import { initMenu } from "./utils/menu";

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next();
  } else {
    let token = localStorage.getItem("user");
    if (token === "null" || token === " ") {
      next("/?redirect=" + to.path);
    } else {
      initMenu(router, store);
      next();
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
