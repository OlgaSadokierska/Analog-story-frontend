export interface User {
    id?: number,
    firstname?: string;
    lastname?: string;
    email?: string;
    login: string;
    password: string;
    isAdmin: boolean;
}