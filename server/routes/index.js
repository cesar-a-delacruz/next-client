import { controllers } from "../controllers/index.js";
import { AppointmentRouter } from "./AppointmentRouter.js";
import { BaseRouter } from "./BaseRouter.js";

export const routes = {
  appointment: new AppointmentRouter("appointment", controllers.appointment),
  business: new BaseRouter("business", controllers.business),
  service: new BaseRouter("service", controllers.service),
  user: new BaseRouter("user", controllers.user),
};
