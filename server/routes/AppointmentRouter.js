import BaseRouter from "./BaseRouter.js";

export default class AppointmentRouter extends BaseRouter {
  constructor(baseName, controller) {
    super(baseName, controller);

    this.router.get(
      "/business/:businessId/user/:userId",
      this.controller.findAll,
    );
    this.router.post(
      "/business/:businessId/user/:userId",
      this.controller.create,
    );

    this.router.get(
      "/business/:businessId/piechart/:dateTime",
      this.controller.findByDay,
    );
    this.router.get(
      "/business/:businessId/linechart/:dateTime",
      this.controller.findByWeek,
    );
    this.router.get(
      "/business/:businessId/numberchart/:dateTime",
      this.controller.findByDay,
    );
    this.router.get(
      "/business/:businessId/barchart/:dateTime",
      this.controller.findByWeek,
    );
  }
}
