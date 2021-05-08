import { getRequest } from "./request";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    let userId = JSON.parse(window.sessionStorage.getItem("user")).userId;
    getRequest("/system/sysModule/getModuleTreeByUserId?userId=" + userId).then(resp => {
        if (resp) {
            let fmtRoutes = formatRoutes(resp.data);
            console.log(fmtRoutes);
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
                        name: "用户管理",
                        component: () =>
                            import ("@/views/system/user.vue"),
                        hidden: true
                    };
                    route.children.push(child);
                } else if (route.path === "/assessment/assessment") {
                    //  判断当前路由是否为绩效考核  
                    // 添加默认展示子路由页面
                    let child1 = {
                        path: "/assessment/assessment",
                        name: "考核模板",
                        component: () =>
                            import ("@/views/assessment/template.vue"),
                        hidden: true
                    };
                    route.children.push(child1);
                } else if (route.path === "/diagnosis/diagnosis") {
                    //  判断当前路由是否为油水井诊断  
                    // 添加默认展示子路由页面
                    let child2 = {
                        path: "/diagnosis/diagnosis",
                        name: "水井异常",
                        component: () =>
                            import ("@/views/diagnosis/abnormal/waterAbnormal.vue"),
                        hidden: true
                    };
                    route.children.push(child2);
                }else if (route.path === "/unattended/unattended") {
                    //  判断当前路由是否为无人值守 
                    // 添加默认展示子路由页面
                    let child3 = {
                        path: "/unattended/unattended",
                        name: "无人值守",
                        component: () =>
                            import ("@/views/unattended/proTeam.vue"),
                        hidden: true
                    };
                    route.children.push(child3);
                // }else if (route.path === "/information/information") {
                //     //  判断当前路由是否为基础信息
                //     // 添加默认展示子路由页面
                //     let child4 = {
                //         path: "/information/information",
                //         name: "单井信息",
                //         component: () =>
                //             import ("@/views/information/baswellinfor.vue"),
                //         hidden: true
                //     };
                //     route.children.push(child4);
                }else if (route.path === "/downholeOperations/downholeOperations") {
                    //  判断当前路由是否为井下作业
                    // 添加默认展示子路由页面
                    let child5 = {
                        path: "/downholeOperations/downholeOperations",
                        name: "井下作业",
                        component: () =>
                            import ("@/views/downholeOperations/downholeOperations.vue"),
                        hidden: true
                    };
                    route.children.push(child5);
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