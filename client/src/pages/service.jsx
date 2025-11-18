import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/NewForm";
import AllTable from "@/components/AllTable";

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
      <NewForm
        title="New Service"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Create"
      />
    );
  },
  All() {
    return (
      <AllTable
        title="All Services"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
