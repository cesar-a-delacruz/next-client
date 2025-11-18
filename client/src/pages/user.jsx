import BasePageData from "@/utils/BasePageData";
import Form from "@/components/Form";
import Table from "@/components/Table";

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
      <Form
        title="New User"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
      />
    );
  },
  All() {
    return (
      <Table
        title="All Users"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
