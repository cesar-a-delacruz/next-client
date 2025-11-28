import BaseRouter from "./BaseRouter.js";

export default class AppointmentRouter extends BaseRouter {
  constructor(baseName, controller) {
    super(baseName, controller);
    this.router.get("/piechart/:dateTime", this.controller.findByDay);
    this.router.get("/linechart/:dateTime", this.controller.findByWeek);
    this.router.get("/numberchart/:dateTime", this.controller.findByDay);
    this.router.get("/barchart/:dateTime", this.controller.findByWeek);
  }
}
