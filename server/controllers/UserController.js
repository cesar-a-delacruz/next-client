import { hash } from "bcryptjs";
import BaseController from "./BaseController.js";

export default class UserController extends BaseController {
  constructor(model, formParser) {
    super(model, formParser);
  }
  findByPhone = async (req, res) => {
    const { phone } = req.body;

    try {
      const row = await this.model.findUnique({
        where: {
          phone: parseInt(phone),
        },
      });
      if (!row) return res.status(404).json({ error: "row not found" });
      res.json(row);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by Phone" });
    }
  };

  findAll = async (req, res) => {
    let filterObject = {};
    if (req.user.businessId)
      filterObject = { where: { businessId: Number(req.user.businessId) } };
    try {
      const rows = await this.model.findMany(filterObject);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find all" });
    }
  };
  create = async (req, res) => {
    const formBody = this.formParser.run(req.body);
    formBody.password = await hash(formBody.password, 10);
    try {
      const newRow = await this.model.create({ data: { ...formBody } });
      res.status(201).json(newRow);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create" });
    }
  };
}
