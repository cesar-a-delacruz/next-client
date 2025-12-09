import BaseController from "./BaseController.js";

export default class ServiceController extends BaseController {
  constructor(model, formParser) {
    super(model, formParser);
  }

  findAll = async (req, res) => {
    const businessId = Number(req.user.businessId);

    try {
      const rows = await this.model.findMany({
        where: { businessId: businessId },
      });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find all" });
    }
  };
  create = async (req, res) => {
    const formBody = this.formParser.run(req.body);
    formBody.businessId = Number(req.user.businessId);

    try {
      const newRow = await this.model.create({ data: { ...formBody } });
      res.status(201).json(newRow);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create" });
    }
  };
}
