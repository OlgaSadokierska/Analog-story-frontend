import {Post} from "../Endpoints";
import {
    User
} from "../Types";
import {api} from "../Config";
import {Utils} from "./Utils";
export class PostRequests {
    //USERS
    static logInUser(login: string, password: string): Promise<User> {
        console.log(login, password)
        return api.post(Post.USER, {
            login: login,
            password: password
        }).then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }

    static registerUser(firstname: string, lastname: string, email: string, password: string, login: string, isAdmin: boolean): Promise<User> {
        console.log(firstname, lastname, email, password, login, isAdmin)
        return api.post(Post.USERREG, {
            firstName: firstname,
            lastName: lastname,
            email: email,
            login: login,
            password: password,
            isAdmin: isAdmin
        }).then(Utils.mapResponse<User>)
            .catch(Utils.handleError)
    }
}