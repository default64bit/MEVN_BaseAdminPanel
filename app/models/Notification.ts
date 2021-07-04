import mongoose from "mongoose";

const _schema: mongoose.Schema = new mongoose.Schema({
    template: {
        type: String,
        required: true,
        default: "DefaultNotifTemplate",
    },
    modelType: {
        type: String,
        required: true,
        enum: ["Admin", "User"],
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "model_type",
    },
    data: {
        type: Object,
    },
    readAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

interface INotification {
    template: string;
    modelType: string;
    model: mongoose.Types.ObjectId;
    data: object;
    readAt: Date;
    createdAt: Date;
}

class Notification {
    public static model = mongoose.model<INotification>("Notification", _schema);
}

export default Notification;