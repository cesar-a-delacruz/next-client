import { Router } from "express";
import autorizationMiddleware from "../middlewares/autorizationMiddleware.js";

export default class UserRouter {
  constructor(baseName, controller) {
    this.baseName = baseName;
    this.controller = controller;
    this.router = Router();

    this.router.get("/", autorizationMiddleware, this.controller.findAll);
    this.router.get("/:id", autorizationMiddleware, this.controller.findById);
    this.router.put("/:id", autorizationMiddleware, this.controller.update);
    this.router.delete("/:id", autorizationMiddleware, this.controller.delete);
    this.router.post("/", this.controller.create);
  }
}
