import { BaseController } from "./BaseController.js";

export class AppointmentController extends BaseController {
  constructor(model, formParser) {
    super(model, formParser);
  }
  findByDay = async (req, res) => {
    let { dateTime } = req.params;
    const currentDay = new Date(dateTime).getDate();
    let nextDateTime = new Date(dateTime);
    nextDateTime.setDate(currentDay + 1);
    nextDateTime = nextDateTime.toISOString();
    dateTime = new Date(dateTime).toISOString();

    try {
      const row = await this.model.findMany({
        where: {
          AND: [
            {
              dateTime: {
                gte: dateTime,
              },
            },
            {
              dateTime: {
                lt: nextDateTime,
              },
            },
          ],
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
    let { dateTime } = req.params;
    const currentDay = new Date(dateTime).getDate();

    let priorDateTime = new Date(dateTime);
    priorDateTime.setDate(currentDay - 7);
    priorDateTime = priorDateTime.toISOString();
    let nextDateTime = new Date(dateTime);
    nextDateTime.setDate(currentDay + 1);
    nextDateTime = nextDateTime.toISOString();

    try {
      const rows = await this.model.findMany({
        where: {
          AND: [
            {
              dateTime: {
                gte: priorDateTime,
              },
              dateTime: {
                lt: nextDateTime,
              },
            },
          ],
        },
      });
      if (!rows) return res.status(404).json({ error: "rows not founded" });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to find by Week" });
    }
  };
}
