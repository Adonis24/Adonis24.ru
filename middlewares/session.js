import { session, Store, MemoryStore } from "next-session";
import MongoStore from "connect-mongo";


// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res, next) {
  return session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      autoRemove: "interval",
      autoRemoveInterval: 10,
      client: req.dbClient,
      dbName: "Authenticate",
    }),
  })(req, res, next);
}
