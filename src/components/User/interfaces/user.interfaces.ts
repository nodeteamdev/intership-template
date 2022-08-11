import { Document, Model } from 'mongoose';

export interface newUserInterface {
  firstname: string;
  lastname: string;
  email: string;
  password: number;
}

export interface loginUserInterface {
  email: string;
  password: number;
}

export interface payloadInterface {
  accessToken: string;
  refreshToken: string;
  _id: string;
  firstname: string;
}

export interface userSchemaInterface extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  token?: string;
  refreshToken?: string;
}

export interface userModelInterface extends Model<userSchemaInterface> {}

export interface refreshSchemaInterface extends Document {
  accessToken: string;
  refreshToken: string;
  _id: string;
  firstname: string;
}

export interface refreshModelInterface extends Model<refreshSchemaInterface> {}
