import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import { User, UserRole } from "../../entity/User";
import { MyContext } from "../../ts/context";

@Resolver()
export class MeResolver {
  @Query(() => [User])
  @Authorized("ADMIN")
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null | undefined> {
    if (!ctx.req.userId) return null;
    return await User.findOne({ where: { id: ctx.req.userId } });
  }
}