import { Router } from "express";

export default class BusinessRouter {
  constructor(baseName, controller) {
    this.baseName = baseName;
    this.controller = controller;
    this.router = Router();

    this.router.get("/", this.controller.findAll);
  }
}
