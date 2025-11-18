import BasePageData from "@/utils/BasePageData";
import Form from "@/components/Form";
import Table from "@/components/Table";

export default {
  pageData: new BasePageData(
    [
      { name: "name", label: "Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "price", label: "Price", type: "number" },
      { name: "image", label: "Image URL", type: "text" },
      { name: "businessId", label: "Business", type: "number" },
    ],
    "service",
  ),
  New() {
    return (
      <Form
        title="New Service"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
      />
    );
  },
  All() {
    return (
      <Table
        title="All Services"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
