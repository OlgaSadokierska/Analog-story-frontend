import {Post} from "../Endpoints";
import {
    User
} from "../Types";
import {api} from "../Config";
import {Utils} from "./Utils";
import {apiAuth} from "./AuthRequest";
export class PostRequests {
    //USERS
    static logInUser(email: string, password: string): Promise<{ token : string }>{
        return apiAuth.post(Post.USER, {
            email: email,
            password: password
        }).then(Utils.mapResponse<{ token : string }>)
            .catch(Utils.handleError)
    }

    static registerUser(first_name: string, last_name: string, login: string, email: string, password: string, phone: string): Promise<User> {
        return apiAuth.post(Post.USERREG, {
            firstname: first_name,
            lastname: last_name,
            login: login,
            email: email,
            password: password,
            phone: phone
        }).then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }

    static logout(): Promise<any>{
        return apiAuth.post(Post.USER_LOGOUT).then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }

    static addEmployee(
        first_name: string,
        last_name: string,
        login: string,
        email: string,
        password: string,
        phone: string
    ): Promise<User> {
        return apiAuth.post(Post.USER_ADD_EMPLOYEE, {
            firstName: first_name,
            lastName: last_name,
            login: login,
            email: email,
            password: password,
            phone: phone
        }).then(Utils.mapResponse<User>)
            .catch(Utils.handleError);
    }
}