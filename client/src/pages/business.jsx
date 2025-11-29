import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/containers/NewForm";
import AllTable from "@/components/containers/AllTable";

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
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
    return (
      <NewForm
        title="New Business"
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
      <AllTable
        title="All Businesses"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
