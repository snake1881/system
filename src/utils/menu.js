import { getRequest } from "./request";

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/system/sysModule/getSysModuleTree").then(resp => {
    if (resp) {
      let fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit("initRoutes", fmtRoutes);
    }
  });
};
export const formatRoutes = routes => {
  let fmRoutes = [];
  routes.forEach(router => {
    let {
      moduleUrl,
      moduleName,
      sequence,
      icon,
      moduleType,
      active,
      children,
      parentModuleId
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: moduleUrl,
      name: moduleName,
      icon: icon,
      sequence: sequence,
      children: children,
      moduleType: moduleType,
      active: active,
      component(resolve) {
        if (moduleType === "1" && active === "1" && parentModuleId !== "0") {
          require(["../views" + moduleUrl + ".vue"], resolve);
        } else if (parentModuleId === "0") {
          require(["../views/Home.vue"], resolve);
        }
      }
    };
    fmRoutes.push(fmRouter);
  });
  return fmRoutes;
};
