import {Get} from "../Endpoints";
import {
    Product,
    User,
    UserMediaDTO
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

    static getUserDataByEmail(): Promise<Number[]> | null {
        const email = localStorage.getItem("User");

        if (email) {
            const endpoint = Get.USER_BY_EMAIL(email);
            return api.get(endpoint)
                .then(Utils.mapResponse<Number[]>)
                .catch(Utils.handleError);
        } else {
            console.error("User email is undefined or null");
            return null;
        }

    }
    static getAllProducts():Promise<Product[]>{
        return api.get(Get.PRODUCTS)
            .then(Utils.mapResponse<Product[]>)
            .catch(Utils.handleError)
    }

    static getUserMedia(userId: number): Promise<UserMediaDTO> {
        const userMediaEndpoint = Get.USER_MEDIA.replace(":userId", userId.toString());

        return api.get(userMediaEndpoint)
            .then(Utils.mapResponse<UserMediaDTO>)
            .catch(Utils.handleError);
    }




}

