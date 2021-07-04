import seedDefaultAdmin from "./seedDefaultAdmin";
import seedPermissions from "./seedPermissions";

export default () => {
    seedDefaultAdmin();
    seedPermissions();
};
