import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";

import BaseController from "./BaseController.js";

export default class AppointmentController extends BaseController {
  constructor(model, formParser) {
    super(model, formParser);
  }
  findAll = async (req, res) => {
    try {
      const rows = await this.model.findMany({
        include: { service: true, client: true },
      });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find all" });
    }
  };

  findByDay = async (req, res) => {
    const dateTime = new Date(req.params.dateTime);
    dateTime.setDate(dateTime.getDate() + 1);
    const dayStart = startOfDay(dateTime);
    const dayEnd = endOfDay(dateTime);

    try {
      const row = await this.model.findMany({
        where: {
          dateTime: {
            gte: dayStart,
            lte: dayEnd,
          },
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
    dateTime.setDate(dateTime.getDate() + 1);
    const weekStart = startOfWeek(dateTime, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(dateTime, { weekStartsOn: 1 });

    try {
      const rows = await this.model.findMany({
        where: {
          dateTime: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
        include: {
          service: true,
        },
      });
      if (!rows) return res.status(404).json({ error: "rows not founded" });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by Week" });
    }
  };
}
