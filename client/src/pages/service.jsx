import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import CustomForm from "@/components/containers/CustomForm";
import CardGrid from "@/components/containers/CardGrid";
import { jwtDecode } from "jwt-decode";

export default {
  pageData: new BasePageData(
    [
      { name: "name", label: "Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "price", label: "Price", type: "number" },
      { name: "image", label: "Image URL", type: "text" },
    ],
    "service",
  ),
  New() {
    const token = localStorage.getItem("jwtToken");
    let userData;
    if (!token) return <Navigate to="/auth" replace />;
    else userData = jwtDecode(token);

    if (userData.type !== "EMPLOYEE") return <Navigate to="/auth" replace />;

    return (
      <CustomForm
        title="New Service"
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
      <CardGrid
        title="All Services"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
