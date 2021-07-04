<template>
    <div class="dashboard_body max-w-screen-xl mx-auto bg-truegray-800 shadow-2xl">
        <div class="flex flex-wrap justify-between items-center gap-4">
            <h1 class="text-white text-4xl"><b>Update Role</b></h1>
        </div>
        <hr class="my-4 border-gray-600 border-solid" />

        <div class="flex flex-col h-full overflow-auto">
            <t-input
                class="sideway max-w-screen-sm"
                type="text"
                label="Role Name"
                desc="Role name must be unique"
                v-model:value="roleName"
                :error="roleNameError"
            />
            <hr class="my-4 border-gray-600 border-solid" />
            <h3 class="text-xl text-gray-200">Permissions</h3>
            <small class="text-gray-400">Select permissions that you want this role to have</small>
            <div v-if="selectedPermissionsError" class="flex gap-1 items-center rounded bg-red-100 text-red-700 p-1 mt-1 text-xs">
                <i class="far fa-exclamation-circle"></i>
                <b>{{ selectedPermissionsError }}</b>
            </div>
            <ul class="mt-4">
                <li class="mb-4" v-for="(group, groupName) in permissions" :key="groupName">
                    <div class="flex items-center mb-2 gap-2 cursor-pointer select-none" @click="addPermission(group)">
                        <i class="text-violet-400" :class="checkPermission(group) ? 'fas fa-check-square' : 'far fa-square'"></i>
                        <span class="text-sm">{{ groupName.toUpperCase() }}</span>
                    </div>
                    <ul class="pl-6">
                        <li class="mb-2" v-for="(item, i) in group" :key="i">
                            <div class="flex items-center gap-2 cursor-pointer select-none" @click="addPermission([item])">
                                <i class="text-violet-400" :class="checkPermission([item]) ? 'fas fa-check-square' : 'far fa-square'"></i>
                                <span class="text-sm">{{ item.label }}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <hr class="my-4 mt-auto border-gray-600 border-solid" />
        <div class="flex flex-wrap items-center gap-4">
            <button class="t_button t_button_min bg-violet-400 hover:bg-violet-500 disabled:opacity-50" :disabled="editingRole" @click="edit()">
                <b v-if="!editingRole">Save Changes</b>
                <b v-else class="fad fa-spinner fa-spin text-xl"></b>
            </button>
            <router-link class="t_button t_button_min border-rose-400 hover:bg-rose-500" to="/admin/role_manager">Go Back</router-link>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

import Input from "../../../templates/layouts/Input";

export default {
    name: "CreateRole",
    components: {
        "t-input": Input,
    },
    data() {
        return {
            editingRole: false,

            selectedPermissions: [],
            selectedPermissionsError: "",
            roleName: "",
            roleNameError: "",

            permissions: {},
        };
    },
    created() {},
    async mounted() {
        await Promise.all([this.getPermissions(), this.getRole()]);
    },
    methods: {
        ...mapActions(["makeToast"]),

        getRole() {
            axios
                .get(`${this.getBaseUrl()}/api/v1/admin/role/${this.$route.params.id}`)
                .then((response) => {
                    this.roleName = response.data.name;
                    for (let i = 0; i < response.data.permissions.length; i++) {
                        this.selectedPermissions.push(response.data.permissions[i].name);
                    }
                })
                .catch((error) => {
                    if (error.response.data) {
                        if (error.response.data.field && typeof this[error.response.data.field + "Error"] !== "undefined") {
                            this[error.response.data.field + "Error"] = error.response.data.error;
                        } else {
                            this.makeToast({
                                message: error.response.data.error,
                                type: "danger",
                            });
                        }
                    }
                    if (error.response.status == 404) {
                        this.$router.push("/admin/role_manager");
                    }
                });
        },

        edit() {
            if (this.editingRole) return;
            this.editingRole = true;

            this.roleNameError = this.selectedPermissionsError = "";

            axios
                .put(`${this.getBaseUrl()}/api/v1/admin/roles`, {
                    id: this.$route.params.id,
                    roleName: this.roleName,
                    selectedPermissions: this.selectedPermissions,
                })
                .then((response) => {
                    this.makeToast({
                        title: "Update Role",
                        message: "Role has been updated successfully",
                        type: "info",
                    });
                })
                .catch((error) => {
                    if (error.response.data) {
                        if (error.response.data.field && typeof this[error.response.data.field + "Error"] !== "undefined") {
                            this[error.response.data.field + "Error"] = error.response.data.error;
                        } else {
                            this.makeToast({
                                message: error.response.data.error,
                                type: "danger",
                            });
                        }
                    }
                })
                .finally(() => {
                    this.editingRole = false;
                });
        },

        addPermission(items) {
            let state = "";
            if (items.length > 1) state = this.checkPermission(items) ? "1" : "0";

            for (let i = 0; i < items.length; i++) {
                const index = this.selectedPermissions.indexOf(items[i].name);
                if (index === -1) {
                    if (state == "1") continue;
                    this.selectedPermissions.push(items[i].name);
                } else {
                    if (state == "0") continue;
                    this.selectedPermissions.splice(index, 1);
                }
            }
        },
        checkPermission(items) {
            let checked = true;
            for (let i = 0; i < items.length; i++) {
                if (this.selectedPermissions.indexOf(items[i].name) === -1) {
                    checked = false;
                    break;
                }
            }
            return checked;
        },

        getPermissions() {
            axios
                .get(`${this.getBaseUrl()}/api/v1/admin/permissions`)
                .then((response) => {
                    const records = response.data.records;
                    for (let i = 0; i < records.length; i++) {
                        if (!this.permissions.hasOwnProperty(records[i].group)) this.permissions[records[i].group] = [];
                        this.permissions[records[i].group].push({
                            name: records[i].name,
                            label: records[i].label,
                        });
                    }
                })
                .catch((error) => {
                    if (error.response.data && error.response.data.error) {
                        this.makeToast({
                            message: error.response.data.error,
                            type: "danger",
                        });
                    }
                });
        },
    },
};
</script>

<style></style>
