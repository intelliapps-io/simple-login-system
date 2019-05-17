import { sign } from "jsonwebtoken";
import { Response } from "express";
import { User, UserRole } from "../entity/User";
import { Req, MyContext } from "../ts/context";
import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";

interface ITokenData {
  userId: string | null
  authCount?: number | null
  role: UserRole | null
}

const REFRESH_TOKEN_SECRET = "CHANGE_ME!";
const ACCESS_TOKEN_SECRET = "CHNAGE_ME_TOO!";

export const createTokens = (user: User) => {
  const refreshToken = sign(
    { userId: user.id, authCount: user.authCount, role: user.role },
    REFRESH_TOKEN_SECRET, { expiresIn: "7d" }
  );
  const accessToken = sign(
    { userId: user.id, role: user.role },
    ACCESS_TOKEN_SECRET, { expiresIn: "15min" }
  );

  return { refreshToken, accessToken };
};

export const verifyRefreshToken = (refreshToken: string | null): ITokenData => {
  let data: ITokenData = {
    userId: null,
    authCount: null,
    role: null
  };
  try {
    if (!refreshToken) return data;
    data = verify(refreshToken, REFRESH_TOKEN_SECRET) as ITokenData;
  } catch { }
  return data;
}

export const authMiddleware = async (req: Req, res: Response, next: () => void) => {
  const refreshToken = req.cookies ? req.cookies["refresh-token"] : null;
  const accessToken = req.cookies ? req.cookies["access-token"] : null;

  if (!refreshToken && !accessToken) return next();

  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET) as ITokenData;
    if (data.userId) req.userId = data.userId;
    if (data.role) req.role = data.role;
    return next();
  } catch { }

  if (!refreshToken) return next(); // expired access token

  const data = verifyRefreshToken(refreshToken);

  const user = await User.findOne({ where: { id: data.userId } });
  if (!user || user.authCount !== data.authCount) return next(); // token has been invalidated

  const tokens = createTokens(user);

  res.cookie("refresh-token", tokens.refreshToken);
  res.cookie("access-token", tokens.accessToken);
  if (data.userId) req.userId = data.userId;
  if (data.role) req.role = data.role;

  next();
}

export const authChecker: AuthChecker<MyContext, UserRole> = (
  { root, args, context, info },
  roles,
) => {
  let isAuthorized = false;
  const userRole = context.req.role;

  // admin role has access to all of user 
  roles.forEach(role => {
    switch (role) {
      case UserRole["USER"]:
        isAuthorized = userRole === "USER" || userRole === "ADMIN"
        break;
      case UserRole["ADMIN"]:
        isAuthorized = userRole === "ADMIN";
    }
  });

  return isAuthorized;
};