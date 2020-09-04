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
    component: () => import("@/views/Home.vue"),
    hidden: true,
    children: [
      {
        path: "/sendNotice",
        name: "sendNotice",
        component: () => import("@/views/Notice/sendNotice"),
        hidden: true
      },
      {
        path: "/receiveNotice",
        name: "receiveNotice",
        component: () => import("@/views/Notice/receiveNotice"),
        hidden: true
      },
      {
        path: "/detailsNotice",
        name: "detailsNotice",
        component: () => import("@/views/Notice/detailsNotice"),
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
