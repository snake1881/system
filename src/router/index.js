import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 静态路由
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    hidden: true
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    hidden: true
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("@/views/Home"),
    hidden: true,
    children: [
      {
        path: "/Home",
        name: "首页",
        component: () => import("@/views/Index.vue"),
        hidden: true
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
