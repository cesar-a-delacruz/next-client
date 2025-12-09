import autorizationMiddleware from "../middlewares/autorizationMiddleware.js";
import BaseRouter from "./BaseRouter.js";

export default class AppointmentRouter extends BaseRouter {
  constructor(baseName, controller) {
    super(baseName, controller);

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
