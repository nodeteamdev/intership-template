import { ObjectId } from "mongoose";
import { IUserModel } from "./model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

    findAll(): Promise<IUserModel[]>;

     /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findById(id: string): Promise < IUserModel | null >;

     /**
     * @param {IUserModel} body
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    create(body: IUserModel): Promise < IUserModel | undefined >;

     /**
     * @param {IUserModel} body
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    updateById(body: IUserModel): Promise < IUserModel | undefined | null>;

     /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    deleteById(id: ObjectId): Promise < void >;
}