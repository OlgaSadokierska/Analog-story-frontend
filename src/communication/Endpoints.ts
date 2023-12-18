const API_V1 = "/api/v1";
const USERS = "/users";

export class Get {

    static USERS = [API_V1, USERS].join("");
    static USER_BY_ID = [API_V1, USERS, "/"].join("");
    static USER_BY_EMAIL = (email: string) => [API_V1, USERS, "/by-email"].join("") + `?email=${email}`;
}

export class Post {
    static USER = [API_V1, "/auth/login"].join("");
    static USERREG = [API_V1, "/auth/register"].join("");
}

export class Put {}

export class Delete {}
