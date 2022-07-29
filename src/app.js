import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/routers/auth.js";
import postRoutes from "./routes/routers/post.js";
import commentRoutes from "./routes/routers/comment.js";

import { sequelize } from "./models/index.js";

import { error404, error } from "./middlewares/error.js";

class App {
  constructor() {
    this.app = express();
    this.setDatabaseConnect();
    this.setMiddleWare();
    this.setRouter();
    this.setErrorHandler();
  }
  setDatabaseConnect() {
    sequelize
      .sync()
      // .sync({ force: true })
      .then(() => console.log("db connect"))
      .catch(err => console.error(err));
  }
  setMiddleWare() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  setRouter() {
    this.app.use("/auth", authRoutes);
    this.app.use("/post", postRoutes);
    this.app.use("/comment", commentRoutes);
  }
  setErrorHandler() {
    this.app.use(error404);
    this.app.use(error);  
  }
}

export default new App().app;