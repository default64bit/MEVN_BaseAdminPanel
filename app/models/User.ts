import mongoose from "mongoose";

const _schema: mongoose.Schema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    family: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    googleID: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

interface IUser {
    image: string;
    name: string;
    family: string;
    email: string;
    password: string;
    googleID: string;
    createdAt: Date;
}

class User {
    public static model = mongoose.model<IUser>("User", _schema);
}

export default User;
