import { getRequest } from "./request";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/sysModule/getSysModuleTree").then(resp => {
        if (resp) {
            let fmtRoutes = formatRoutes(resp.data);
            let menu = [{
                path: "/Home",
                name: "Home",
                component: () =>
                    import ("@/views/Home"),
                hidden: true,
                children: [{
                    path: "/Index",
                    name: "首页",
                    component: () =>
                        import ("@/views/Index.vue"),
                    hidden: true
                }]
            }];
            fmtRoutes.forEach(route => {
                menu[0].children.push(route)
            });
            router.addRoutes(menu);
            store.commit("initRoutes", menu);
        }
    });
};
export const formatRoutes = routes => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            moduleId,
            moduleUrl,
            moduleName,
            sequence,
            icon,
            moduleType,
            active,
            children,
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            index: moduleId,
            path: moduleUrl,
            name: moduleName,
            icon: icon,
            sequence: sequence,
            children: children,
            moduleType: moduleType,
            active: active,
            component(resolve) {
                require(["../views" + moduleUrl + ".vue"], resolve);
            }
        };
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
};