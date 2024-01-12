const API_V1 = "/api/v1";
const USERS = "/users";
const PRODUCTS = "/products";
const ADD_PRODUCT = "/addproduct";
const PRODUCT_TYPES = "/product-types";


export class Get {
    static USERS = [API_V1, USERS].join("");
    static USER_BY_ID = [API_V1, USERS, "/id/"].join("");
    static EMPLOYEES = [API_V1, USERS, "/employees"].join("");
    static ONLY_USERS = [API_V1, USERS, "/users"].join("");
    static USER_BY_EMAIL = (email: string) => [API_V1, USERS, "/by-email"].join("") + `?email=${email}`;
    static PRODUCTS = [API_V1, PRODUCTS].join("");
    static USER_MEDIA = [API_V1, USERS, "/:userId/media"].join("");
    static PRODUCT_TYPES = [API_V1, PRODUCT_TYPES].join("");

}


export class Post {
    static USER = [API_V1, "/auth/login"].join("");
    static USERREG = [API_V1, "/auth/register"].join("");
    static USER_LOGOUT = "/logout";
    static PRODUCT = [API_V1, ADD_PRODUCT].join("");

}

export class Put {
    static USER_UPDATE = [API_V1, USERS,"/id"].join("");
}

export class Delete {
    static USER_DELETE = [API_V1, USERS].join("");
}
