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
}
