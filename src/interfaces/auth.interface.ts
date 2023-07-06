export interface IRegister {
    username: string;
    password: string;
    email: string;
    name: string;
}

export interface IUserResponse {
    username: string;
    email: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
}