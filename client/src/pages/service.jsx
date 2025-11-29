import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/NewForm";
import CardGrid from "@/components/CardGrid";

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
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
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
      <CardGrid
        title="All Services"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
