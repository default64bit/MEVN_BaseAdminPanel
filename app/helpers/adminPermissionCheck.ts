import { Request } from "express";

const PermissionAccessList = {
    "GET=>/admins": ["admins.view"],
    "GET=>/admins/:id": ["admins.view", "admins.edit"],
    "POST=>/admins": ["admins.add"],
    "PUT=>/admins": ["admins.edit"],
    "DELETE=>/admins/:id": ["admins.delete"],

    "GET=>/roles": ["roles.view"],
    "GET=>/role/:id": ["roles.view", "roles.edit"],
    "POST=>/roles": ["roles.add"],
    "PUT=>/roles": ["roles.edit"],
    "DELETE=>/role/:id": ["roles.delete"],

    "GET=>/permissions": [],

    "GET=>/panel_settings": ["panel_settings.view"],
    "POST=>/panel_settings": ["panel_settings.edit"],
};

export default (req: Request, admin) => {
    if (!req.route) return false;

    const request = `${req.method}=>${req.route.path}`;
    if (!PermissionAccessList[request]) return false;
    let permissionList = PermissionAccessList[request];

    let adminPermissionList = [];
    for (let j = 0; j < admin.role.permissions.length; j++) {
        adminPermissionList.push(admin.role.permissions[j].name);
    }

    for (let i = 0; i < permissionList.length; i++) {
        if (adminPermissionList.indexOf(permissionList[i]) == -1) {
            return false;
        }
    }

    return true;
};
