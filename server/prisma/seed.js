import { PrismaClient } from "../generated/prisma/index.js"; // adjust path if needed
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Businesses
  await prisma.business.createMany({
    data: [
      {
        name: "Barbería Estilo",
        description: "Cortes y estilos modernos",
        phone: 60000001,
        logo: "barberia_logo.png",
        password: bcrypt.hashSync("password1", 10),
      },
      {
        name: "Spa Relax",
        description: "Masajes y tratamientos relajantes",
        phone: 60000002,
        logo: "spa_logo.png",
        password: bcrypt.hashSync("password2", 10),
      },
    ],
  });

  // Services
  await prisma.service.createMany({
    data: [
      {
        name: "Corte de Cabello",
        description: "Corte clásico",
        price: 10.0,
        image: "corte.png",
        businessId: 1, // references the first business
      },
      {
        name: "Afeitado",
        description: "Afeitado con toalla caliente",
        price: 8.0,
        image: "afeitado.png",
        businessId: 1,
      },
      {
        name: "Masaje Relajante",
        description: "Masaje de 60 minutos",
        price: 25.0,
        image: "masaje.png",
        businessId: 2,
      },
      {
        name: "Facial Hidratante",
        description: "Tratamiento facial",
        price: 20.0,
        image: "facial.png",
        businessId: 2,
      },
    ],
  });

  // Users
  await prisma.user.createMany({
    data: [
      {
        name: "Juan Pérez",
        phone: 6001001,
        password: bcrypt.hashSync("emp1", 10),
        type: "EMPLOYEE",
        businessId: 1,
      },
      {
        name: "Carlos Gómez",
        phone: 6002001,
        password: bcrypt.hashSync("cli1", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Ana Torres",
        phone: 6002002,
        password: bcrypt.hashSync("cli2", 10),
        type: "CLIENT",
      },
      {
        name: "Laura Martínez",
        phone: 6003001,
        password: bcrypt.hashSync("emp2", 10),
        type: "EMPLOYEE",
        businessId: 2,
      },
      {
        name: "Pedro López",
        phone: 6004001,
        password: bcrypt.hashSync("cli3", 10),
        type: "CLIENT",
        businessId: 2,
      },
      {
        name: "María Fernández",
        phone: 6004002,
        password: bcrypt.hashSync("cli4", 10),
        type: "CLIENT",
      },
    ],
  });

  // Appointments
  await prisma.appointment.createMany({
    data: [
      {
        dateTime: new Date("2025-11-05T10:00:00"),
        serviceId: 1,
        clientId: 2,
        status: "COMPLETED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-11-06T14:00:00"),
        serviceId: 2,
        clientId: 3,
        status: "PENDING",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-11-07T09:00:00"),
        serviceId: 3,
        clientId: 5,
        status: "COMPLETED",
        businessId: 2,
      },
      {
        dateTime: new Date("2025-11-08T11:00:00"),
        serviceId: 4,
        clientId: 6,
        status: "CANCELLED",
        businessId: 2,
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Seeding completed!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
