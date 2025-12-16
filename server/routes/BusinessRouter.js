import { Router } from "express";
import autorizationMiddleware from "../middlewares/autorizationMiddleware.js";

export default class BusinessRouter {
  constructor(baseName, controller) {
    this.baseName = baseName;
    this.controller = controller;
    this.router = Router();

    this.router.get("/:id", this.controller.findById);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/", this.controller.findAll);
  }
}
