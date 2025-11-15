export class BaseController {
  #model;
  constructor(model) {
    this.#model = model;
  }

  findAll = async (req, res) => {
    try {
      const rows = await this.#model.findMany();
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find all" });
    }
  };
  findById = async (req, res) => {
    const { id } = req.params;
    try {
      const row = await this.#model.findUnique({ where: { id: parseInt(id) } });
      if (!row) return res.status(404).json({ error: "row not found" });
      res.json(row);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by ID" });
    }
  };
  create = async (req, res) => {
    console.log(req.body);
    try {
      const newRow = await this.#model.create({ data: { ...req.body } });
      res.status(201).json(newRow);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create" });
    }
  };
  update = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedRow = await this.#model.update({
        where: { id: parseInt(id) },
        data: { ...req.body },
      });
      res.json(updatedRow);
    } catch (error) {
      res.status(500).json({ error: "Failed to update" });
    }
  };
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await this.#model.delete({ where: { id: parseInt(id) } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete" });
    }
  };
}
