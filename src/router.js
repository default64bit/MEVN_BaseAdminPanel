import { createRouter, createMemoryHistory, createWebHistory } from "vue-router";

const isServer = typeof window === "undefined";
const history = isServer ? createMemoryHistory() : createWebHistory();

export default () => {
    return createRouter({
        history,
        routes: [
            { path: "/", component: () => import("./components/pages/web/Home"), name: "Home" },

            {
                path: "/admin",
                component: () => import("./components/templates/admin/Dashboard"),
                children: [
                    { path: "", component: () => import("./components/pages/admin/Home"), name: "AdminHome" },
                    {
                        path: "account_settings",
                        component: () => import("./components/templates/admin/AccountSettings"),
                        children: [
                            { path: "profile", component: () => import("./components/pages/admin/account_settings/Profile") },
                            { path: "security", component: () => import("./components/pages/admin/account_settings/Security") },
                            { path: "notification", component: () => import("./components/pages/admin/account_settings/Notification") },
                        ],
                    },

                    { path: "admins_list", component: () => import("./components/pages/admin/admins_list/AdminsList") },
                    { path: "admins_list/create_admin", component: () => import("./components/pages/admin/admins_list/CreateAdmin") },
                    { path: "admins_list/admin/:id", component: () => import("./components/pages/admin/admins_list/EditAdmin") },

                    { path: "role_manager", component: () => import("./components/pages/admin/role_manager/RoleManager") },
                    { path: "role_manager/add_role", component: () => import("./components/pages/admin/role_manager/CreateRole") },
                    { path: "role_manager/role/:id", component: () => import("./components/pages/admin/role_manager/EditRole") },

                    { path: "panel_settings", component: () => import("./components/pages/admin/PanelSettings") },
                ],
            },
            { path: "/admin/login", component: () => import("./components/pages/admin/Login"), name: "AdminLogin" },
        ],
    });
};
