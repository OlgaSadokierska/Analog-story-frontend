import { Delete } from "../Endpoints";
import { User } from "../Types";
import { api } from "../Config";
import {Utils} from "./Utils";

export class DeleteRequest {
    static deleteUser(id: number): Promise<User> {
        return api.delete(`${Delete.USER_DELETE}/${id}`)
            .then(Utils.mapResponse<User>)
            .catch(Utils.handleError);
    }
}