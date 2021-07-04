import { Router } from "express";
import multer from "multer";
import adminAuth from "../middlewares/adminAuth";

import ProfileController from "../controllers/admin/ProfileController";
import ProfileValidator from "../validators/admin/ProfileValidator";

import NotificationController from "../controllers/admin/NotificationController";

import MessageBoardController from "../controllers/admin/MessageBoardController";

import AdminsController from "../controllers/admin/AdminsController";
import AdminsValidator from "../validators/admin/AdminsValidator";

import RolesController from "../controllers/admin/RolesController";
import RolesValidator from "../validators/admin/RolesValidator";

import PermissionController from "../controllers/admin/PermissionController";

import PanelSettingsController from "../controllers/admin/PanelSettingsController";
import PanelSettingsValidator from "../validators/admin/PanelSettingsValidator";

const router = Router();
const profileController = new ProfileController();
const notificationController = new NotificationController();
const messageBoardController = new MessageBoardController();
const adminsController = new AdminsController();
const rolesController = new RolesController();
const permissionController = new PermissionController();
const panelSettingsController = new PanelSettingsController();

router.use(adminAuth.ensureAuth);

router.get("/info", profileController.getInfo);
router.put("/info", ProfileValidator.updateInfo, profileController.updateInfo);
router.post("/update_avatar", multer({ dest: process.env.TEMP_FILE_UPLOAD }).single("avatar"), profileController.updateAvatar);
router.delete("/profile_avatar", profileController.deleteAvatar);
router.post("/change_password", ProfileValidator.changePassword, profileController.changePassword);

router.get("/notifications", notificationController.getNotifs);
router.post("/notifications/read", notificationController.readNotifs);
router.delete("/notifications", notificationController.clearNotifs);

router.get("/message_board/chats", messageBoardController.getChats);
router.get("/message_board/messages", messageBoardController.getMessages);
router.get("/message_board/peoples", messageBoardController.getPeoples);

router.get("/admins", AdminsValidator.getAdmins, adminsController.getAdmins);
router.get("/admins/:id", AdminsValidator.getAdmin, adminsController.getAdmin);
router.post("/admins", multer({ dest: process.env.TEMP_FILE_UPLOAD }).single("avatar"), AdminsValidator.addAdmin, adminsController.addAdmin);
router.put("/admins", multer({ dest: process.env.TEMP_FILE_UPLOAD }).single("avatar"), AdminsValidator.editAdmin, adminsController.editAdmin);
router.delete("/admins/:id", AdminsValidator.deleteAdmin, adminsController.deleteAdmin);

router.get("/roles", RolesValidator.getRoles, rolesController.getRoles);
router.get("/role/:id", RolesValidator.getRole, rolesController.getRole);
router.post("/roles", RolesValidator.addRole, rolesController.addRole);
router.put("/roles", RolesValidator.editRole, rolesController.editRole);
router.delete("/role/:id", RolesValidator.deleteRole, rolesController.deleteRole);

router.get("/permissions", permissionController.getPermissions);

router.get("/panel_settings", panelSettingsController.getSettings);
router.post("/panel_settings", PanelSettingsValidator.editAdmin, panelSettingsController.updateSettings);

export default router;
