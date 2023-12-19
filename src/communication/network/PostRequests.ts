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
        console.log(email, password)
        return apiAuth.post(Post.USER, {
            email: email,
            password: password
        }).then(Utils.mapResponse<{ token : string }>)
            .catch(Utils.handleError)
    }

    static registerUser(first_name: string, last_name: string, login: string, email: string, password: string, phone: string): Promise<User> {
        console.log(first_name, last_name, email, password)
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
}