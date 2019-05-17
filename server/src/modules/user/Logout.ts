import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "../../ts/context";

@Resolver()
export class LogoutResolver {
  @Mutation(() => String, { nullable: true })
  async logout(@Ctx() ctx: MyContext): Promise<string | null> {
    ctx.res.cookie("refresh-token", "");
    ctx.res.cookie("access-token", "");
    return ctx.req.userId ? ctx.req.userId : null;
  }
}