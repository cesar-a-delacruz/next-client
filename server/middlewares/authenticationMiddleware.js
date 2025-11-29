import { PrismaClient } from "../generated/prisma/index.js";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function (req, res) {
  const { phone, password } = req.body;
  const user = await new PrismaClient().user.findFirst({
    where: {
      phone: parseInt(phone),
    },
  });
  const match = await compare(password, user.password);
  if (match) {
    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
        businessId: user.businessId,
        type: user.type,
      },
      "secret",
      { expiresIn: "1h" },
    );
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
