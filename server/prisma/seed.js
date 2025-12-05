import { PrismaClient } from "../generated/prisma/index.js";
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
        businessId: 1,
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
        name: "Coloración",
        description: "Aplicación de tintes profesionales",
        price: 15.0,
        image: "coloracion.png",
        businessId: 1,
      },
      {
        name: "Peinado",
        description: "Peinados modernos y elegantes",
        price: 12.0,
        image: "peinado.png",
        businessId: 1,
      },
      {
        name: "Tratamiento Capilar",
        description: "Reparación y nutrición del cabello",
        price: 18.0,
        image: "tratamiento.png",
        businessId: 1,
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
        name: "Sofía Herrera",
        phone: 6005001,
        password: bcrypt.hashSync("cli5"),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Diego Ramírez",
        phone: 6005002,
        password: bcrypt.hashSync("cli6"),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Valentina Cruz",
        phone: 6005003,
        password: bcrypt.hashSync("cli7"),
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
      // Existing ones (already adjusted)
      {
        dateTime: new Date("2025-12-01T10:00:00"),
        serviceId: 1,
        clientId: 2,
        status: "COMPLETED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-02T14:00:00"),
        serviceId: 2,
        clientId: 3,
        status: "PENDING",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-03T09:30:00"),
        serviceId: 5,
        clientId: 7,
        status: "CANCELLED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-04T15:00:00"),
        serviceId: 6,
        clientId: 8,
        status: "COMPLETED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-05T11:00:00"),
        serviceId: 7,
        clientId: 9,
        status: "PENDING",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-06T13:00:00"),
        serviceId: 1,
        clientId: 7,
        status: "COMPLETED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-07T10:00:00"),
        serviceId: 2,
        clientId: 8,
        status: "CANCELLED",
        businessId: 1,
      },
      // ➕ New appointments for the same week
      {
        dateTime: new Date("2025-12-01T12:00:00"), // same day as first
        serviceId: 6, // Peinado
        clientId: 9, // Valentina Cruz
        status: "PENDING",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-02T16:00:00"), // same day as second
        serviceId: 7, // Tratamiento Capilar
        clientId: 7, // Sofía Herrera
        status: "COMPLETED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-03T11:00:00"), // same day as third
        serviceId: 1, // Corte de Cabello
        clientId: 8, // Diego Ramírez
        status: "PENDING",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-04T17:00:00"), // same day as fourth
        serviceId: 5, // Coloración
        clientId: 2, // Carlos Gómez
        status: "CANCELLED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-05T09:00:00"), // same day as fifth
        serviceId: 2, // Afeitado
        clientId: 3, // Ana Torres
        status: "COMPLETED",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-06T15:30:00"), // same day as sixth
        serviceId: 7, // Tratamiento Capilar
        clientId: 9, // Valentina Cruz
        status: "PENDING",
        businessId: 1,
      },
      {
        dateTime: new Date("2025-12-07T12:00:00"), // same day as seventh
        serviceId: 6, // Peinado
        clientId: 7, // Sofía Herrera
        status: "COMPLETED",
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
