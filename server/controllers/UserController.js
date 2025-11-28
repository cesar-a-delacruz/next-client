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
          phone,
        },
      });
      if (!row) return res.status(404).json({ error: "row not found" });
      res.json(row);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by Phone" });
    }
  };
  create = async (req, res) => {
    const formBody = this.formParser.run(req.body);
    formBody.password = await hash(formBody.password, 10);
    console.log(formBody);
    try {
      const newRow = await this.model.create({ data: { ...formBody } });
      res.status(201).json(newRow);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create" });
    }
  };
}
