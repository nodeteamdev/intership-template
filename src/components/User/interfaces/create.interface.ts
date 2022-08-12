import { IUser } from '../model';

export interface ICreate extends IUser {
    fullName: string,
    email: string
}
