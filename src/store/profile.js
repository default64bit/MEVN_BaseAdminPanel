import axios from "axios";

const refreshAuthTokenInterval = (baseUrl, csrfToken, adminAuthToken) => {
    let interval = setInterval(() => {
        axios
            .post(`${baseUrl}/api/v1/auth/refresh`, null, {
                headers: {
                    "csrf-token": csrfToken,
                    AdminAuthToken: adminAuthToken,
                },
            })
            .catch((error) => {
                clearInterval(interval);
            });
    }, 840000);
};

const state = {
    adminInfo: {
        avatar: "http://localhost:3000/img/avatars/admin.png",
        name: "",
        family: "",
        email: "",
        role: {},
        permissions: [],
    },
    refreshOnLoad: false,
};

const getters = {
    adminInfo: (state) => state.adminInfo,
};

const actions = {
    async getAdminInfo({ commit }, Options) {
        let AdminAuthToken = Options.AdminAuthToken ? Options.AdminAuthToken : "";
        await axios
            .get(`${Options.BaseUrl}/api/v1/admin/info`, {
                headers: {
                    AdminAuthToken: AdminAuthToken,
                    "csrf-token": Options.csrfToken,
                },
            })
            .then((response) => {
                if (!state.refreshOnLoad) {
                    axios
                        .post(`${Options.BaseUrl}/api/v1/auth/refresh`, null, {
                            headers: {
                                AdminAuthToken: AdminAuthToken,
                                "csrf-token": Options.csrfToken,
                            },
                        })
                        .catch((e) => {});
                    state.refreshOnLoad = true;
                }
                refreshAuthTokenInterval(Options.BaseUrl, Options.csrfToken, AdminAuthToken);
                commit("setAdminInfo", response.data);
                commit("setAdminAvatar", response.data.adminInfo.image);

                let permissions = [];
                for (let i = 0; i < response.data.adminInfo.role.permissions.length; i++) {
                    permissions.push(response.data.adminInfo.role.permissions[i].name);
                }
                commit("setAdminPermissions", permissions);
            })
            .catch((error) => {
                // console.log(error);
                throw error.response;
            });
    },

    async updateAdminAvatar({ commit }, Options) {
        await axios
            .post(`${Options.BaseUrl}/api/v1/admin/update_avatar`, Options.data, {
                headers: {
                    "csrf-token": Options.csrfToken,
                    "content-type": "application/json",
                },
            })
            .then((response) => {
                commit("setAdminAvatar", response.data.avatar);
            })
            .catch((error) => {
                throw error;
            });
    },
    async deleteAdminAvatar({ commit }, Options) {
        await axios
            .delete(`${Options.BaseUrl}/api/v1/admin/profile_avatar`, {
                headers: {
                    "csrf-token": Options.csrfToken,
                    "content-type": "application/json",
                },
            })
            .then((response) => {
                commit("setAdminAvatar", response.data.avatar);
            })
            .catch((error) => {
                throw error;
            });
    },

    async updateAdminInfo({ commit }, Options) {
        await axios
            .put(`${Options.BaseUrl}/api/v1/admin/info`, Options.data, {
                headers: {
                    "csrf-token": Options.csrfToken,
                    "content-type": "application/json",
                },
            })
            .then((response) => {
                commit("setAdminInfo", response.data);
            })
            .catch((error) => {
                throw error;
            });
    },
};

const mutations = {
    setAdminInfo: (state, data) => (state.adminInfo = data.adminInfo),
    setAdminAvatar: (state, avatar) => (state.adminInfo.avatar = avatar),
    setAdminPermissions: (state, list) => (state.adminInfo.permissions = list),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
