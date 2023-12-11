import {Get} from "../Endpoints";
import {
    User
} from "../Types";
import {api} from "../Config";
import {Utils} from "./Utils";
export class GetRequests {
    //USERS
    static getAllUsers():Promise<User[]>{
        return api.get(Get.USERS)
            .then(Utils.mapResponse<User[]>)
            .catch(Utils.handleError)
    }

    static getUserById(id: number):Promise<User>{
        return api.get(Get.USER_BY_ID + id)
            .then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }
}