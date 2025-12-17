import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";
import BaseController from "./BaseController.js";

export default class AppointmentController extends BaseController {
  constructor(model, formParser) {
    super(model, formParser);
  }
  findAll = async (req, res) => {
    const businessId = Number(req.user.businessId);
    try {
      const rows = await this.model.findMany({
        include: { service: true, client: true },
        where: { businessId: businessId },
        orderBy: {
          dateTime: "desc",
        },
      });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find all" });
    }
  };

  create = async (req, res) => {
    const formBody = this.formParser.run(req.body);
    formBody.businessId = Number(req.user.businessId);
    formBody.clientId = Number(req.user.userId);
    formBody.dateTime.setHours(formBody.dateTime.getHours() + 5);

    try {
      const newRow = await this.model.create({ data: { ...formBody } });
      res.status(201).json(newRow);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const formBody = this.formParser.run(req.body);
    formBody.dateTime.setHours(formBody.dateTime.getHours() + 5);

    try {
      const updatedRow = await this.model.update({
        where: { id: parseInt(id) },
        data: { ...formBody },
      });
      res.json(updatedRow);
    } catch (error) {
      res.status(500).json({ error: "Failed to update" });
    }
  };

  findByDay = async (req, res) => {
    const dateTime = new Date(req.params.dateTime);
    const dayStart = startOfDay(dateTime);
    const dayEnd = endOfDay(dateTime);
    const businessId = Number(req.user.businessId);

    try {
      const row = await this.model.findMany({
        where: {
          dateTime: {
            gte: dayStart,
            lte: dayEnd,
          },
          businessId: businessId,
        },
        include: {
          service: true,
        },
      });
      if (!row) return res.status(404).json({ error: "rows not founded" });
      res.json(row);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by Day" });
    }
  };
  findByWeek = async (req, res) => {
    const dateTime = new Date(req.params.dateTime);
    const weekStart = startOfWeek(dateTime, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(dateTime, { weekStartsOn: 1 });
    const businessId = Number(req.user.businessId);

    try {
      const rows = await this.model.findMany({
        where: {
          dateTime: {
            gte: weekStart,
            lte: weekEnd,
          },
          businessId: businessId,
        },
        include: {
          service: true,
        },
        orderBy: {
          dateTime: "asc",
        },
      });
      if (!rows) return res.status(404).json({ error: "rows not founded" });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by Week" });
    }
  };
}
