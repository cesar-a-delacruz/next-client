import BaseRouter from "./BaseRouter.js";

export default class UserRouter extends BaseRouter {
    constructor(baseName, controller) {
        super(baseName, controller);

        this.router.get("/business/:businessId", this.controller.findAll);
    }
}
