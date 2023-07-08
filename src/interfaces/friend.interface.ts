import { IUserResponse } from "./auth.interface";

export interface IAddFriend {
    targetEmail: string;
    targetUsername: string;
}

export interface IAddFriendResponse {
    sender: IUserResponse;
    receiver: IUserResponse;
    createdAt: Date;
    status: number;
}