import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/containers/NewForm";
import Calendar from "@/components/containers/Calendar";
import { jwtDecode } from "jwt-decode";

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
    ],
    "appointment",
  ),
  New() {
    const token = localStorage.getItem("jwtToken");
    let userData;
    if (!token) return <Navigate to="/auth" replace />;
    else userData = jwtDecode(token);

    if (userData.type !== "CLIENT") return;
    return (
      <NewForm
        title="New Appointment"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
        userData={userData}
      />
    );
  },
  All() {
    const token = localStorage.getItem("jwtToken");
    let userData;
    if (!token) return <Navigate to="/auth" replace />;
    else userData = jwtDecode(token);

    return (
      <Calendar
        title="All Appointments"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        userData={userData}
      />
    );
  },
};
