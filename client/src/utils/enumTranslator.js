export default {
  appointmentStatus: (text) => {
    switch (text) {
      case "PENDING":
        return "Pendiente";
      case "COMPLETED":
        return "Completada";
      case "CANCELLED":
        return "Cancelada";
      default:
        return null;
    }
  },
  userType: (text) => {
    switch (text) {
      case "CLIENT":
        return "Cliente";
      case "EMPLOYEE":
        return "Empleado";
      default:
        return null;
    }
  },
};
