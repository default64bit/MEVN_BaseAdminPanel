import mongoose from "mongoose";

const _schema: mongoose.Schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    message: {
        type: String,
    },
    readAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    deletedAt: {
        type: Date,
    },
});

export interface IAdminChatMessages {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    readAt: Date;
    createdAt: Date;
    deletedAt: Date;
}

class AdminChatMessages {
    public static model = mongoose.model<IAdminChatMessages>("AdminChatMessages", _schema);
}

export default AdminChatMessages;
