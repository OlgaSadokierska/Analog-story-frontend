import {Post, Put} from "../Endpoints";
import { api } from "../Config";
import {Utils} from "./Utils";

export class PutRequests {
    static updateUser(id: number, first_name: string, last_name: string, login: string, email: string, password: string, phone: string, accountTypeId: number): Promise<User> {
        const requestBody = {
            firstName: first_name,
            lastName: last_name,
            email: email,
            login: login,
            password: password,
            phone: phone,
            accountTypeId: accountTypeId
        };

        return api.put(`${Put.USER_UPDATE}/${id}`, requestBody)
            .then(Utils.mapResponse<User>)
            .catch(Utils.handleError);
    }
    static setCameraForSale(id: number, description: string, price: number): Promise<any> {
        const putData = Put.CAMERA_FOR_SALE.replace(":cameraId", id.toString());
        const requestBody = {
            description: description,
            price: price,
        };
        return api.put(putData, requestBody)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }

}