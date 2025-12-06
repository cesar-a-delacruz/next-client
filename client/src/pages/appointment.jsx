import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import CustomForm from "@/components/containers/CustomForm";
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

    if (userData.type !== "CLIENT") return <Navigate to="/auth" replace />;
    return (
      <CustomForm
        title="New Appointment"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
        submitActions={[]}
      />
    );
  },
  All() {
    const token = localStorage.getItem("jwtToken");
    if (!token) return <Navigate to="/auth" replace />;

    return (
      <Calendar
        title="All Appointments"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
