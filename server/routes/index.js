import * as appointment from "./appointmentRouter.js";
import * as business from "./businessRouter.js";
import * as client from "./clientRouter.js";
import * as service from "./serviceRouter.js";

export default {
  appointment: appointment.default,
  business: business.default,
  client: client.default,
  service: service.default,
};
