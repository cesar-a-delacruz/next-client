import BasePageData from "@/utils/BasePageData";
import Form from "@/components/Form";
import Table from "@/components/Table";

export default {
  pageData: new BasePageData(
    [
      { name: "name", label: "Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "logo", label: "Logo URL", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
    "business",
  ),
  New() {
    return (
      <Form
        title="New Business"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
      />
    );
  },
  All() {
    return (
      <Table
        title="All Businesses"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
