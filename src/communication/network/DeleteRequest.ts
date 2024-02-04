import {Delete, Post} from "../Endpoints";
import {Product, User} from "../Types";
import { api } from "../Config";
import {Utils} from "./Utils";

export class DeleteRequest {
    static deleteUser(id: number): Promise<User> {
        return api.delete(`${Delete.USER_DELETE}/${id}`)
            .then(Utils.mapResponse<User>)
            .catch(Utils.handleError);
    }
    static deleteProduct(id: number): Promise<any> {
        const deleteData = Delete.PRODUCT_DELETE(id).replace(":id", id.toString());
        return api.delete(deleteData)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }

    static deleteCamera(id: number): Promise<any> {
        const deleteData = Delete.CAMERA_DELETE(id).replace(":id", id.toString());
        console.log(deleteData)
        return api.delete(deleteData)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }

    static deleteFilm(id: number): Promise<any> {
        const deleteData = Delete.FILM_DELETE(id).replace(":id", id.toString());
        return api.delete(deleteData)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }
}