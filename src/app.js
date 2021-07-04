import { createApp, createSSRApp } from "vue";
import createRouter from "./router";
import createStore from "./store";
import App from "./components/App.vue";
import "./assets/css/app.css";

export default (args) => {
    const isServer = typeof window === "undefined";
    const app = isServer ? createSSRApp(App) : createApp(App);
    // const app = createSSRApp(App);

    const router = createRouter();
    const store = createStore();

    app.use(router);
    app.use(store);

    app.mixin({
        methods: {
            getBaseUrl() {
                return "http://localhost:3000";
            },
            checkAdminPermission(Permissions = [], AdminPermissions = []) {
                for (let i = 0; i < Permissions.length; i++) {
                    if (AdminPermissions.indexOf(Permissions[i]) == -1) return false;
                }
                return true;
            },
        },
    });

    return { app, router };
};
