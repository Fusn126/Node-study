import { Context } from 'koa';
export default class VirualController {
    public static async log(ctx: Context) {
      ctx.body = '你还好吗，来自虚拟的信息';
    }
  
  }