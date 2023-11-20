const API_V1 = "/api/v1";
const USERS = "/users";

export class Get{
    //USERS
    static USERS = [API_V1, USERS].join("");

}

export class Post{
    static USER = [API_V1, USERS, "/login"].join("");
    static USERREG = [API_V1, USERS, "/register"].join("");

}

export class Put{

}

export class Delete{

}
