import { LoginUser } from "./login-user.interface";


export interface AuthResponse {
  user: LoginUser;
  token: string;
}
