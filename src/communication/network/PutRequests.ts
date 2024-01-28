import { Put } from "../Endpoints";
import { User } from "../Types";
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
}