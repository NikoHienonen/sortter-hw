import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import { connectDb } from "./dbConnector";
import { addIssue, getIssues } from "./services/issues";
import { Issue } from "./types";
import errorHandling from "./errorHandling";
import { mailer } from "./mailer";

const server = new Koa();
const router = new Router();
const port = 3000;
server.use(json());
server.use(bodyparser());
server.use(errorHandling);

server.use(router.routes()).use(router.allowedMethods());

router.get("/issues", async (ctx, next) => {
  const issues = await getIssues();
  ctx.body = issues;
  ctx.status = 200;
});

router.post("/issues", async (ctx, next) => {
  const issue = ctx.request.body as Issue;
  const result = addIssue(issue);
  ctx.body = result;
  ctx.status = 200;
});

router.get("/test", async (ctx, next) => {
  ctx.body = { message: "Success!" };
  ctx.status = 200;
});

server.listen(port, () => console.log(`Server running on ${port}`));
