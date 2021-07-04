import mongoose from "mongoose";
import Permission from "./Permission";

const _schema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
        enum: ["Admin", "User"],
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

interface IRole {
    name: string;
    model: string;
    permissions: Permission[];
    createdAt: Date;
}

class Role {
    public static model = mongoose.model<IRole>("Role", _schema);
}

export default Role;
