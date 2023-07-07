export interface IRegister {
    username: string;
    password: string;
    email: string;
    name: string;
}
export interface ILogin {
    email: string;
    password: string;
}

export interface IUserResponse {
    username: string;
    email: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
}

export interface IJwtPayload {
    username: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}