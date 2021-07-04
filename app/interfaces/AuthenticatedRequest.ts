import { Request } from "express";
import {IAdmin} from "../models/Admin";

interface AuthenticatedRequest extends Request {
    admin: IAdmin;
}

export default AuthenticatedRequest;
