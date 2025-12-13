import { Router } from "express";
import autorizationMiddleware from "../middlewares/autorizationMiddleware.js";

export default class AppointmentRouter {
  constructor(baseName, controller) {
    this.baseName = baseName;
    this.controller = controller;
    this.router = Router();

    this.router.get("/", autorizationMiddleware, this.controller.findAll);
    this.router.get("/:id", autorizationMiddleware, this.controller.findById);
    this.router.post("/", autorizationMiddleware, this.controller.create);
    this.router.put("/:id", autorizationMiddleware, this.controller.update);
    this.router.delete("/:id", autorizationMiddleware, this.controller.delete);

    this.router.get(
      "/piechart/:dateTime",
      autorizationMiddleware,
      this.controller.findByDay,
    );
    this.router.get(
      "/linechart/:dateTime",
      autorizationMiddleware,
      this.controller.findByWeek,
    );
    this.router.get(
      "/numberchart/:dateTime",
      autorizationMiddleware,
      this.controller.findByDay,
    );
    this.router.get(
      "/barchart/:dateTime",
      autorizationMiddleware,
      this.controller.findByWeek,
    );
  }
}
