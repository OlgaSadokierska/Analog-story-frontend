const API_V1 = "/api/v1";
const USERS = "/users";
const PRODUCTS = "/products";
const CARTS ="/carts";
const PRODUCT_TYPES = "/product-types";
const CAMERA = "/cameras";
const FILM = "/films";


export class Get {
    static USERS = [API_V1, USERS].join("");
    static USER_BY_ID = [API_V1, USERS, "/id/"].join("");
    static EMPLOYEES = [API_V1, USERS, "/employees"].join("");
    static ONLY_USERS = [API_V1, USERS, "/users"].join("");
    static USER_BY_EMAIL = (email: string) => [API_V1, USERS, "/by-email"].join("") + `?email=${email}`;
    static PRODUCTS = [API_V1, PRODUCTS].join("");
    static USER_MEDIA = [API_V1, USERS, "/:userId/media"].join("");
    static PRODUCT_TYPES = [API_V1, PRODUCT_TYPES].join("");

    static CARTS_UNACCEPTED_EMPLOYEE = [API_V1, CARTS, "/unaccepted"].join("");
    static CARTS_ACCEPTED_EMPLOYEE = [API_V1, CARTS, "/accepted"].join("");

    static CARTS_UNACCEPTED_USER = [API_V1, CARTS, "/unaccepted"].join("");
    static CARTS_ACCEPTED_USER = [API_V1, CARTS, "/accepted"].join("");

}

export class Post {
    static USER = [API_V1, "/auth/login"].join("");
    static USERREG = [API_V1, "/auth/register"].join("");
    static USER_LOGOUT = "/logout";

    static USER_ADD_EMPLOYEE = [API_V1, USERS, "/addEmployee"].join("");

    static ADD_PRODUCT = [API_V1, PRODUCTS, "/create/:userId"].join("")

    static ADD_TO_CART = [API_V1, CARTS, "/add-to-cart/:userId/:productId"].join("");
    static ACCEPT_CART = [API_V1, CARTS, "/mark-as-purchased/:cartId"].join("");

    static ADD_CAMERA = [API_V1, CAMERA, "/add/:userId"].join("");

    static ADD_FILM = [API_V1, FILM, "/add/:userId"].join("");
}

export class Put {
    static USER_UPDATE = [API_V1, USERS,"/id"].join("");
    static CAMERA_FOR_SALE = [API_V1, CAMERA, "/setForSale/:cameraId"].join("");
    static UPDATE_PRODUCT = [API_V1, PRODUCTS, "/:productId"].join("")
    static UPDATE_CAMERA_DETAILS = [API_V1, CAMERA, "/updateDetails/:cameraId"].join("")
    static UPDATE_FILM = [API_V1, FILM, '/updateDetails/:filmId'].join("")
}

export class Delete {
    static USER_DELETE = [API_V1, USERS].join("");
    static PRODUCT_DELETE = (id: number) => [API_V1, PRODUCTS, `/${id}`].join("");
    static CAMERA_DELETE = (id: number) => [API_V1, CAMERA, `/deleteCamera/${id}`].join("");
    static FILM_DELETE = (id: number) => [API_V1, FILM, `/deleteFilm/${id}`].join("");
    static FILM_REMOVE = (id: number) => [API_V1, FILM, `/removeCamera/${id}`].join("");
}
