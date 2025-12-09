import { Router } from "express";
import autorizationMiddleware from "../middlewares/autorizationMiddleware.js";

export default class BaseRouter {
  constructor(baseName, controller) {
    this.baseName = baseName;
    this.controller = controller;
    this.router = Router();

    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", autorizationMiddleware, this.controller.findById);
    this.router.post("/", autorizationMiddleware, this.controller.create);
    this.router.put("/:id", autorizationMiddleware, this.controller.update);
    this.router.delete("/:id", autorizationMiddleware, this.controller.delete);
  }
}
