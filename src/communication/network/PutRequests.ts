import {Post, Put} from "../Endpoints";
import { api } from "../Config";
import {Utils} from "./Utils";
import {Camera, Film, Product, User} from "../Types";

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

    static updateProduct(id: number, product_type_id: number, description: string, price: number, model: string, brand: string): Promise<any> {
        const putData = Put.UPDATE_PRODUCT.replace(":productId", id.toString());
        const requestBody = {
            productTypeId: product_type_id,
            description: description,
            price: price,
            model: model,
            brand: brand,
        };
        return api.put(putData, requestBody)
            .then(Utils.mapResponse<any>)
            .catch(Utils.handleError);
    }


    static updateCameraDetails(id: number, updatedCameraDTO: Camera, updatedProductDTO: Product): Promise<Camera> {
        const putData = Put.UPDATE_CAMERA_DETAILS.replace(":cameraId", id.toString());
        const requestBody = {
            model: updatedCameraDTO.model,
            brand: updatedCameraDTO.brand,
            productDto: {
                description: updatedProductDTO.description,
                price: updatedProductDTO.price
            }
        };

        console.log('Request body to be sent:', requestBody);

        return api.put(putData, requestBody)
            .then(Utils.mapResponse<Camera>)
            .catch(Utils.handleError);
    }

    static updateFilmDetails(id: number, updatedFilmDTO: Film, updatedProductDTO: Product): Promise<Film> {
        const putData = Put.UPDATE_FILM.replace(":filmId", id.toString());
        const requestBody = {
            model: updatedFilmDTO.model,
            brand: updatedFilmDTO.brand,
            loadedFrames: updatedFilmDTO.loadedFrames,
            maxLoaded: updatedFilmDTO.maxLoaded,
            productDto: {}
        };
        console.log('Request body to be sent:', requestBody);
        return api.put(putData, requestBody)
            .then(Utils.mapResponse<Film>)
            .catch(Utils.handleError);
    }


}