import mongoose from "mongoose";

const _schema: mongoose.Schema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    locale: {
        type: String,
        required: true,
    },
});

interface IPanelSettings {
    companyName: string;
    theme: string;
    locale: string;
}

class PanelSettings {
    public static model = mongoose.model<IPanelSettings>("PanelSettings", _schema);
}

export default PanelSettings;
