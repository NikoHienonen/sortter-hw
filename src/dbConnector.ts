import { config } from "./config";
import { MongoClient } from "mongodb";

const url = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.z4sfckr.mongodb.net/?retryWrites=true&w=majority`;

export const connectDb = async () => {
  try {
    const client = await new MongoClient(url);
    console.log("Connected to db");
    return client;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};
