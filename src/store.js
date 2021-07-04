import { createStore } from "vuex";
import profile from "./store/profile";
import toast from "./store/toast";

export default () => {
    return createStore({
        modules: {
            profile,toast
        },
    });
};
