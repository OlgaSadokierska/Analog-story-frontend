import { Put } from "../Endpoints";
import { api } from "../Config";
import {Utils} from "./Utils";

export class PutRequests {
    static updateUser(id: number, first_name: string, last_name: string, login: string, email: string, password: string, phone: string, accountTypeId: number): Promise<void> {
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
            .then(Utils.mapResponse<void>)
            .catch(Utils.handleError);
    }

    static setCameraForSale(id: number, isForSale: boolean): Promise<void> {
        const requestBody = {
            isForSale: isForSale
        };
        return api.put(`${Put.CAMERA_FOR_SALE}/${id}`, requestBody)
            .then(Utils.mapResponse<void>)
            .catch(Utils.handleError);
    }
}