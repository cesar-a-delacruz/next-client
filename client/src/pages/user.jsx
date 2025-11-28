import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/NewForm";
import AllTable from "@/components/AllTable";

export default {
  pageData: new BasePageData(
    [
      { name: "name", label: "Name", type: "text" },
      { name: "phone", label: "Phone", type: "number" },
      { name: "password", label: "Password", type: "password" },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: [
          { value: "CLIENT", label: "Client" },
          { value: "EMPLOYEE", label: "Employee" },
        ],
        default: "CLIENT",
      },
      { name: "businessId", label: "Business", type: "number" },
    ],
    "user",
  ),
  New() {
    return (
      <NewForm
        title="New User"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
      />
    );
  },
  All() {
    return (
      <AllTable
        title="All Users"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
