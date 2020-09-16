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
                // 判断当前路由是否为系统管理
                if (route.path === "/system/system") {
                    // 添加默认展示子路由页面
                    let child = {
                        path: "/system/system",
                        // 不添加name属性，避免在侧边导航栏显示
                        // name: "系统管理首页",
                        component: () =>
                            import ("@/views/system/index.vue"),
                        hidden: true
                    };
                    route.children.push(child);
                } else if (route.path === "/assessment/assessment") {
                    //  判断当前路由是否为绩效考核  
                    // 添加默认展示子路由页面
                    let child1 = {
                        path: "/assessment/assessment",
                        // 不添加name属性，避免在侧边导航栏显示
                        // name: "绩效考核首页",
                        component: () =>
                            import ("@/views/assessment/assIndex.vue"),
                        hidden: true
                    };
                    route.children.push(child1);
                } else if (route.path === "/diagnosis/diagnosis") {
                    //  判断当前路由是否为油水井诊断  
                    // 添加默认展示子路由页面
                    let child2 = {
                        path: "/diagnosis/diagnosis",
                        // 不添加name属性，避免在侧边导航栏显示
                        // name: "油水井诊断首页",
                        component: () =>
                            import ("@/views/diagnosis/index.vue"),
                        hidden: true
                    };
                    route.children.push(child2);
                }
                menu[0].children.push(route);
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