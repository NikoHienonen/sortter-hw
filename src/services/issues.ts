import { connectDb } from "../dbConnector";
import { sendMail } from "../mailer";
import { Issue } from "../types";

async function getIssues() {
  const client = await connectDb();
  try {
    const database = client.db("sortter-demo");
    const issues = database.collection<Issue>("issues");
    const result = issues.find();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  } finally {
    client.close();
  }
}

async function addIssue(issue: Issue) {
  const client = await connectDb();
  try {
    const database = client.db("sortter-demo");
    const issues = database.collection<Issue>("issues");
    const result = await issues.insertOne(issue);
    sendMail(issue);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  } finally {
    client.close();
  }
}

export { getIssues, addIssue };
