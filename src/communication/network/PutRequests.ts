import { Put } from "../Endpoints";
import { User } from "../Types";
import { api } from "../Config";
import {Utils} from "./Utils";

export class PutRequests {
    static updateUser(user: User): Promise<void> {
        const { id, firstname, lastname, email, login, password, phone, accountTypeId } = user;

        const requestBody = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            login: login,
            password: password,
            phone: phone,
            accountTypeId: 2
        };

        return api.put(`${Put.USER_UPDATE}/${id}`, requestBody)
            .then(Utils.mapResponse<void>)
            .catch(Utils.handleError);
    }
}