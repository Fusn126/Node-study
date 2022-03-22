// src/controllers/login.ts
import { Context } from 'koa';
import crypto from 'crypto';
import { getManager } from 'typeorm';

import { User } from '../entity/user';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';
import { UnauthorizedException } from '../utils/exceptions'; //异常处理

export default class AuthController {
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository
      .createQueryBuilder()
      .where({ name: ctx.request.body.name })
      .addSelect('User.password')
      .getOne();

    if (!user) {
      //throw new UnauthorizedException('用户名不存在');
      ctx.status = 200;
      ctx.body = { message: '没有这个用户，请重试' , code: 401 };
    } else if (
      (await crypto.createHash('md5').update(ctx.request.body.password).digest('hex')) ===
      user.password
    ) {
      ctx.status = 200;
      ctx.body = { token: jwt.sign({ id: user.id }, JWT_SECRET) , code:200 };
    } else {
      ctx.status = 200;
      ctx.body = { message: '密码错误，请重试' , code: 401 };
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await crypto
      .createHash('md5')
      .update(ctx.request.body.password)
      .digest('hex');

    // 保存到数据库
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = {...user, code:200};
  }
}
