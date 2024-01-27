import {Post} from "../Endpoints";
import {
    User,
    Product
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
    static createProduct(product_type_id: number, description: string, price: number): Promise<any> {
        const postData = {
            productTypeId: product_type_id,
            description: description,
            price: price
        };

        return api.post(Post.PRODUCT, postData)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }

    static addProductToCart(user_id: string, product_id: number): Promise<any> {
        const postData = Post.ADD_TO_CART.replace(":userId", user_id.toString()).replace(":productId", product_id.toString());

        return api.post(postData)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }

    static markAsPurchased(cart_Id: number): Promise<any> {
        const postData = Post.ACCEPT_CART.replace(":cartId", cart_Id.toString());

        return api.post(postData)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }

    static addCamera(user_id: string, model: string, brand: string): Promise<any> {
        const postData = Post.ADD_CAMERA.replace(":userId", user_id.toString());
        const requestBody = {
            model: model,
            brand: brand,
        };
        return api.post(postData, requestBody)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }




}
