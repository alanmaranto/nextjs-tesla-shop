export interface IUser {
  _id: string;
  name: string;
  password?: string; // only backend
  email: string;
  role: string;
  createdAt?: string; // only backend
  updatedAt?: string;   // only backend
}
