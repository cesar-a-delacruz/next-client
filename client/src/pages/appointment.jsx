import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/NewForm";
import AllTable from "@/components/AllTable";

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
    return (
      <AllTable
        title="All Appointments"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
