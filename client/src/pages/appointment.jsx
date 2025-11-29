import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/containers/NewForm";
import CalendarApp from "@/components/containers/Calendar";

export default {
  pageData: new BasePageData(
    [
      {
        name: "dateTime",
        label: "Date & Time",
        type: "datetime-local",
        render: (val) => new Date(val).toLocaleString(),
      },
      { name: "serviceId", label: "Service", type: "number" },
      { name: "clientId", label: "Client", type: "number" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "PENDING", label: "Pending" },
          { value: "CANCELLED", label: "Cancelled" },
          { value: "COMPLETED", label: "Completed" },
        ],
        default: "PENDING",
      },
      {
        name: "createdAt",
        label: "Created At",
        type: "datetime-local",
        render: (val) => new Date(val).toLocaleString(),
      },
      { name: "businessId", label: "Business", type: "number" },
    ],
    "appointment",
  ),
  New() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
    return (
      <NewForm
        title="New Appointment"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
      />
    );
  },
  All() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
    return (
      <CalendarApp
        title="All Appointments"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
