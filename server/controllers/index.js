import { PrismaClient } from "../generated/prisma/index.js";
import { BaseController } from "./BaseController.js";
import { FormParser } from "../utils/FormParser.js";

const prisma = new PrismaClient();

export const controllers = {
  appointment: new BaseController(
    prisma.appointment,
    new FormParser({
      dateTime: "date",
      serviceId: "number",
      clientId: "number",
      status: "string",
      businessId: "number",
    }),
  ),
  business: new BaseController(
    prisma.business,
    new FormParser({
      name: "string",
      description: "string",
      phone: "number",
      logo: "string",
      password: "string",
    }),
  ),
  service: new BaseController(
    prisma.service,
    new FormParser({
      name: "string",
      description: "string",
      price: "number",
      image: "string",
      businessId: "number",
    }),
  ),
  user: new BaseController(
    prisma.user,
    new FormParser({
      name: "string",
      phone: "number",
      password: "string",
      type: "string",
      businessId: "number",
    }),
  ),
};
