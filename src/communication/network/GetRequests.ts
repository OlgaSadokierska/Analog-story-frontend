import {Get} from "../Endpoints";
import {
    Product,
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

    static getAllEmployees():Promise<User[]>{
        return api.get(Get.EMPLOYEES)
            .then(Utils.mapResponse<User[]>)
            .catch(Utils.handleError)
    }

    static getOnlyUsers():Promise<User[]>{
        return api.get(Get.ONLY_USERS)
            .then(Utils.mapResponse<User[]>)
            .catch(Utils.handleError)
    }
}