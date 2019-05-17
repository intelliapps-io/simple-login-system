import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { MyContext } from "../../ts/context";
import { createTokens } from "../../helpers/auth";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw "email and or password are invalid";

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw "email and or password is invalid";

    const tokens = createTokens(user);

    ctx.res.cookie("refresh-token", tokens.refreshToken);
    ctx.res.cookie("access-token", tokens.accessToken);

    return user;
  }
}