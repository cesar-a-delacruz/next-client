import * as appointment from "./appointmentRouter.js";
import * as business from "./businessRouter.js";
import * as user from "./userRouter.js";
import * as service from "./serviceRouter.js";

export default {
  appointment: appointment.default,
  business: business.default,
  user: user.default,
  service: service.default,
};
