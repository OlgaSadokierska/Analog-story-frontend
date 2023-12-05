import {Post} from "../Endpoints";
import {
    User
} from "../Types";
import {api} from "../Config";
import {Utils} from "./Utils";
export class PostRequests {
    //USERS
    static logInUser(email: string, password: string): Promise<{ token : string }>{
        console.log(email, password)
        return api.post(Post.USER, {
            email: email,
            password: password
        }).then(Utils.mapResponse<{ token : string }>)
            .catch(Utils.handleError)
    }

    static registerUser(first_name: string, last_name: string, email: string, password: string): Promise<User> {
        console.log(first_name, last_name, email, password)
        return api.post(Post.USERREG, {
            firstname: first_name,
            lastname: last_name,
            email: email,
            password: password
        }).then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }
}