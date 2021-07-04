import Permission from "../../models/Permission";

export default async () => {
    await Permission.model.insertMany(
        [
            { name: "dashboard.view", label: "View Dashboard", group: "dashboard", model: "Admin" },

            { name: "admins.view", label: "View Admins", group: "admins", model: "Admin" },
            { name: "admins.add", label: "Create New Admins", group: "admins", model: "Admin" },
            { name: "admins.edit", label: "Edit Admins Info", group: "admins", model: "Admin" },
            { name: "admins.delete", label: "Delete Admins", group: "admins", model: "Admin" },

            { name: "roles.view", label: "View Roles", group: "roles", model: "Admin" },
            { name: "roles.add", label: "Create New Roles", group: "roles", model: "Admin" },
            { name: "roles.edit", label: "Edit Roles Name And Permission", group: "roles", model: "Admin" },
            { name: "roles.delete", label: "Delete Roles", group: "roles", model: "Admin" },

            { name: "panel_settings.view", label: "View Panel Settings", group: "panel_settings", model: "Admin" },
            { name: "panel_settings.edit", label: "Edit Panel Settings", group: "panel_settings", model: "Admin" },
        ],
        {}
    ).then((doc)=>{
        console.log("Permissions Seed Successfully");
    }).catch((e)=>{
        console.error(e);
    });
};
