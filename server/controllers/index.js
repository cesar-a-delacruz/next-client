import { PrismaClient } from "../generated/prisma/index.js";
import { BaseController } from "./BaseController.js";

const prisma = new PrismaClient();

export const controllers = {
  appointment: new BaseController(prisma.appointment),
  business: new BaseController(prisma.business),
  service: new BaseController(prisma.service),
  user: new BaseController(prisma.user),
};
