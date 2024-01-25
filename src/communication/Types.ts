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
    productTypeId: number;
    description: string;
    price: number;
    // model?: string | null;
    // brand?: string | null;
}

export interface ProductType {
    id: number;
    typeName: string;
}

export interface Camera {
    product: any;
    id: number;
    user_id: number;
    model: string;
    brand: string;
    filmLoaded: boolean;
    isForSale: boolean;
    product_id: number;
}

export interface Film {
    id: number;
    idCamera: number | null;
    loadedFrames: number;
    isFull: boolean;
    id_produktu: number | null;
    isForSale: boolean;
    user_id: number;
}

export interface UserMedia {
    cameras: Camera[];
    films: Film[];
    products: Product[];
    types: ProductType[];
}

export interface Cart {
    id: number;
    userId: number;
    productId: number;
    isPurchased: boolean;
    productDto: Product;
    userDto: User;
}