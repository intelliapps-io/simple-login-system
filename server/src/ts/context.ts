import { Request, Response } from "express";
import { UserRole } from "../entity/User";

export interface Req extends Request {
  userId?: string
  role?: UserRole
}

export interface MyContext {
  req: Req
  res: Response
}