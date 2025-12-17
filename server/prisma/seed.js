import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Businesses
  await prisma.business.createMany({
    data: [
      {
        name: "Barbería Piaza",
        // description: "Cortes y estilos modernos",
        phone: 62951821,
        // logo: "barberia_logo.png",
      },
    ],
  });

  // Services
  await prisma.service.createMany({
    data: [
      {
        name: "Corte de Cabello",
        description: "Corte clásico",
        price: 5.0,
        image:
          "https://res.cloudinary.com/dbjffqlow/image/upload/v1765909537/Corte_de_adulto.jpg",
        businessId: 1,
      },
      {
        name: "Corte de niño menor a 10 años",
        description: "Corte simple",
        price: 3.0,
        image:
          "https://res.cloudinary.com/dbjffqlow/image/upload/v1765909535/Corte_de_ni%C3%B1o_menor_a_10_a%C3%B1os.jpg",
        businessId: 1,
      },
      {
        name: "Barba",
        description: "Marcos y corte",
        price: 2.0,
        image:
          "https://res.cloudinary.com/dbjffqlow/image/upload/v1765909535/Barba.jpg",
        businessId: 1,
      },
      {
        name: "Cejas",
        description: "Marcado con navaja",
        price: 2.0,
        image:
          "https://res.cloudinary.com/dbjffqlow/image/upload/v1765909534/Cejas.jpg",
        businessId: 1,
      },
    ],
  });

  // Users
  await prisma.user.createMany({
    data: [
      {
        name: "Alexis Miranda",
        phone: 62951821,
        password: bcrypt.hashSync("emp1", 10),
        type: "EMPLOYEE",
        businessId: 1,
      },
      {
        name: "Carlos Gómez",
        phone: 66341987,
        password: bcrypt.hashSync("cli1", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Juan Pérez",
        phone: 62017725,
        password: bcrypt.hashSync("cli2", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Luis Fernández",
        phone: 67007248,
        password: bcrypt.hashSync("cli3", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Miguel Rodríguez",
        phone: 63390772,
        password: bcrypt.hashSync("cli4", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Andrés Martínez",
        phone: 67475912,
        password: bcrypt.hashSync("cli5", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Jorge Ramírez",
        phone: 66387898,
        password: bcrypt.hashSync("cli6", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Diego Torres",
        phone: 62331729,
        password: bcrypt.hashSync("cli7", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Ricardo López",
        phone: 66785895,
        password: bcrypt.hashSync("cli8", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Fernando Castillo",
        phone: 69316810,
        password: bcrypt.hashSync("cli9", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Alejandro Cruz",
        phone: 649900333,
        password: bcrypt.hashSync("cli10", 10),
        type: "CLIENT",
        businessId: 1,
      },
      {
        name: "Admin",
        phone: 67898465,
        password: bcrypt.hashSync("admin", 10),
        type: "EMPLOYEE",
        businessId: null,
      },
    ],
  });

  // Appointments
  await prisma.appointment.createMany({
    data: [
      // Semana 1
      // Lunes 1 dic
      {
        dateTime: new Date("2025-12-01T10:00:00"),
        serviceId: 2,
        clientId: 2,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-01T16:00:00"),
        serviceId: 1,
        clientId: 3,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-01T19:00:00"),
        serviceId: 4,
        clientId: 4,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Martes 2 dic
      {
        dateTime: new Date("2025-12-02T09:30:00"),
        serviceId: 3,
        clientId: 5,
        status: "COMPLETED",
        businessId: 1,
      }, // 2
      {
        dateTime: new Date("2025-12-02T15:30:00"),
        serviceId: 1,
        clientId: 6,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-02T19:30:00"),
        serviceId: 1,
        clientId: 7,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Miércoles 3 dic
      {
        dateTime: new Date("2025-12-03T11:00:00"),
        serviceId: 1,
        clientId: 8,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-03T15:30:00"),
        serviceId: 2,
        clientId: 9,
        status: "COMPLETED",
        businessId: 1,
      }, // 3

      // Jueves 4 dic
      {
        dateTime: new Date("2025-12-04T16:00:00"),
        serviceId: 1,
        clientId: 2,
        status: "CANCELLED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-04T17:30:00"),
        serviceId: 2,
        clientId: 3,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-04T19:00:00"),
        serviceId: 3,
        clientId: 4,
        status: "COMPLETED",
        businessId: 1,
      }, // 2

      // Viernes 5 dic
      {
        dateTime: new Date("2025-12-05T15:30:00"),
        serviceId: 1,
        clientId: 6,
        status: "CANCELLED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-05T18:30:00"),
        serviceId: 3,
        clientId: 7,
        status: "COMPLETED",
        businessId: 1,
      }, // 2
      {
        dateTime: new Date("2025-12-05T19:30:00"),
        serviceId: 1,
        clientId: 8,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Sábado 6 dic
      {
        dateTime: new Date("2025-12-06T10:00:00"),
        serviceId: 2,
        clientId: 9,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-06T16:00:00"),
        serviceId: 1,
        clientId: 10,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-06T17:30:00"),
        serviceId: 3,
        clientId: 2,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Domingo 7 dic
      {
        dateTime: new Date("2025-12-07T15:00:00"),
        serviceId: 1,
        clientId: 4,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-07T16:30:00"),
        serviceId: 2,
        clientId: 5,
        status: "COMPLETED",
        businessId: 1,
      }, // 3

      // Semana 2
      // Lunes 8 dic
      {
        dateTime: new Date("2025-12-08T10:00:00"),
        serviceId: 2,
        clientId: 7,
        status: "CANCELLED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-08T17:30:00"),
        serviceId: 3,
        clientId: 8,
        status: "COMPLETED",
        businessId: 1,
      }, // 2
      {
        dateTime: new Date("2025-12-08T19:00:00"),
        serviceId: 4,
        clientId: 9,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Martes 9 dic
      {
        dateTime: new Date("2025-12-09T09:30:00"),
        serviceId: 3,
        clientId: 10,
        status: "CANCELLED",
        businessId: 1,
      }, // 2
      {
        dateTime: new Date("2025-12-09T15:30:00"),
        serviceId: 1,
        clientId: 2,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-09T19:30:00"),
        serviceId: 1,
        clientId: 3,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Miércoles 10 dic
      {
        dateTime: new Date("2025-12-10T15:30:00"),
        serviceId: 2,
        clientId: 5,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-10T16:30:00"),
        serviceId: 3,
        clientId: 6,
        status: "COMPLETED",
        businessId: 1,
      }, // 2

      // Jueves 11 dic
      {
        dateTime: new Date("2025-12-11T16:00:00"),
        serviceId: 1,
        clientId: 7,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-11T19:00:00"),
        serviceId: 3,
        clientId: 9,
        status: "COMPLETED",
        businessId: 1,
      }, // 2

      // Viernes 12 dic
      {
        dateTime: new Date("2025-12-12T09:00:00"),
        serviceId: 4,
        clientId: 10,
        status: "COMPLETED",
        businessId: 1,
      }, // 2
      {
        dateTime: new Date("2025-12-12T18:30:00"),
        serviceId: 3,
        clientId: 2,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada
      {
        dateTime: new Date("2025-12-12T19:30:00"),
        serviceId: 1,
        clientId: 3,
        status: "COMPLETED",
        businessId: 1,
      }, // 5

      // Sábado 13 dic
      {
        dateTime: new Date("2025-12-13T10:00:00"),
        serviceId: 2,
        clientId: 4,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-13T16:00:00"),
        serviceId: 1,
        clientId: 5,
        status: "CANCELLED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-13T19:00:00"),
        serviceId: 4,
        clientId: 6,
        status: "CANCELLED",
        businessId: 1,
      }, // 2

      // Domingo 14 dic (solo 3 citas)
      {
        dateTime: new Date("2025-12-14T16:30:00"),
        serviceId: 2,
        clientId: 8,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-14T18:00:00"),
        serviceId: 3,
        clientId: 9,
        status: "COMPLETED",
        businessId: 1,
      }, // 2

      // Semana del 15 al 21 de diciembre 2025

      // Lunes 15 dic
      {
        dateTime: new Date("2025-12-15T10:00:00"),
        serviceId: 2,
        clientId: 2,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      {
        dateTime: new Date("2025-12-15T16:00:00"),
        serviceId: 1,
        clientId: 3,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-15T19:30:00"),
        serviceId: 4,
        clientId: 5,
        status: "CANCELLED",
        businessId: 1,
      }, // cancelada

      // Martes 16 dic
      {
        dateTime: new Date("2025-12-16T15:30:00"),
        serviceId: 1,
        clientId: 7,
        status: "CANCELLED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-16T17:00:00"),
        serviceId: 2,
        clientId: 8,
        status: "CANCELLED",
        businessId: 1,
      }, // 3

      // Miércoles 17 dic (último día con citas normales antes de las 18:00)
      {
        dateTime: new Date("2025-12-17T11:00:00"),
        serviceId: 1,
        clientId: 10,
        status: "COMPLETED",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-17T15:30:00"),
        serviceId: 2,
        clientId: 2,
        status: "COMPLETED",
        businessId: 1,
      }, // 3
      // A partir de las 18:00 → PENDING
      {
        dateTime: new Date("2025-12-17T18:30:00"),
        serviceId: 4,
        clientId: 4,
        status: "PENDING",
        businessId: 1,
      }, // 2

      // Jueves 18 dic (menos citas, todas PENDING después de las 18:00)
      {
        dateTime: new Date("2025-12-18T18:30:00"),
        serviceId: 2,
        clientId: 6,
        status: "PENDING",
        businessId: 1,
      }, // 3

      // Viernes 19 dic
      {
        dateTime: new Date("2025-12-19T15:30:00"),
        serviceId: 3,
        clientId: 7,
        status: "PENDING",
        businessId: 1,
      }, // 2
      {
        dateTime: new Date("2025-12-19T18:00:00"),
        serviceId: 1,
        clientId: 8,
        status: "PENDING",
        businessId: 1,
      }, // 5

      // Sábado 20 dic
      {
        dateTime: new Date("2025-12-20T16:00:00"),
        serviceId: 2,
        clientId: 9,
        status: "PENDING",
        businessId: 1,
      }, // 3

      // Domingo 21 dic (solo 2 citas para realismo)
      {
        dateTime: new Date("2025-12-21T15:00:00"),
        serviceId: 1,
        clientId: 2,
        status: "PENDING",
        businessId: 1,
      }, // 5
      {
        dateTime: new Date("2025-12-21T18:00:00"),
        serviceId: 4,
        clientId: 3,
        status: "CANCELLED",
        businessId: 1,
      }, // 2
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
