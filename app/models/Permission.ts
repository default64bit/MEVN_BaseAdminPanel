import mongoose from "mongoose";

const _schema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    label: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
        enum: ["Admin", "User"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

interface IPermission {
    name: string;
    label: string;
    group: string;
    model: string;
    createdAt: Date;
}

class Permission {
    public static model = mongoose.model<IPermission>("Permission", _schema);
}

export default Permission;
