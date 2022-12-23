import { Context, Next } from "koa";

export default async function errorHandling(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    if (typeof err.statusCode === "number") {
      console.warn(err);
      ctx.status = err.statusCode;
      ctx.body = {
        message: err.message,
      };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {
        message: "Internal server error",
      };
    }
  }
}
