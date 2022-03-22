// src/controllers/user.ts
import { Context } from 'koa';
import { getManager } from 'typeorm';
import { User } from '../entity/user';
import { NotFoundException, ForbiddenException } from '../utils/exceptions';


export default class UserController {
  /* 查看用户的列表 */
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }
  /* 查看用户的详细信息 */
  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      throw new NotFoundException();
    }
  }
  /* 更新用户的本身信息 */
  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.id;
    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }
    const userRepository = getManager().getRepository(User);
    await userRepository.update(+ctx.params.id, ctx.request.body);
    const updatedUser = await userRepository.findOne(+ctx.params.id);

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
    }
  }
  /* 删除用户 */
  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.id);

    ctx.status = 204;
  }
   /* 增加新的用户 */
  public static async addUser(ctx: Context) {
    console.log(ctx);
    const userRepository = getManager().getRepository(User);
    await userRepository.save(ctx.request.body);

    if (userRepository) {
      ctx.status = 200;
      ctx.body = { msg: '添加成功', code: 200 };
    } else {
      ctx.status = 404;
    }
  }
}
