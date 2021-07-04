import mongoose from "mongoose";
import AdminChatMessages, { IAdminChatMessages } from "./AdminChatMessages";

const _schema: mongoose.Schema = new mongoose.Schema({
    userOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    userTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    lastMessage: {
        type: AdminChatMessages.prototype,
    },
    lastMessageDate: {
        type: Date,
    },
});

interface IAdminChat {
    userOne: mongoose.Types.ObjectId;
    userTwo: mongoose.Types.ObjectId;
    lastMessage: IAdminChatMessages;
    lastMessageDate: Date;
}

class AdminChat {
    public static model = mongoose.model<IAdminChat>("AdminChat", _schema);
}

export default AdminChat;
