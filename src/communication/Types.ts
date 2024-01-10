export interface User {
    id: number,
    firstname: string;
    lastname: string;
    login: string,
    email: string;
    password: string;
    phone: string;
    accountTypeId: number
}
export interface Product {
    id: number;
    product_type_id: number;
    description: string;
    price: number;
}
export interface Camera {
    id: number;
    user_id: number;
    model: string;
    brand: string;
    film_loaded: boolean;
    is_for_sale: boolean;
    product_id: number;
}

export interface Film {
    id: number;
    id_camera: number | null;
    loaded_frames: number;
    is_full: boolean;
    id_produktu: number | null;
    is_for_sale: boolean;
    user_id: number;
}

export interface UserMedia {
    kamery: Camera[];
    filmy: Film[];
}
