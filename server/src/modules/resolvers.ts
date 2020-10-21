import { LoginResolver } from "./user/Login";
import { LogoutResolver } from "./user/Logout";
import { MeResolver } from "./user/Me";
import { RegisterResolver } from "./user/Register";

export const resolvers: [Function, ...Function[]] = [
  // User
  LoginResolver,
  LogoutResolver,
  MeResolver,
  RegisterResolver
]