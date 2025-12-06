import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/containers/NewForm";
import AllTable from "@/components/containers/AllTable";
import { jwtDecode } from "jwt-decode";

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
    const token = localStorage.getItem("jwtToken");
    if (token) {
      return <Navigate to="/appointments/all" replace />;
    }
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
    const token = localStorage.getItem("jwtToken");
    let userData;
    if (!token) return <Navigate to="/auth" replace />;
    else userData = jwtDecode(token);

    if (userData.type !== "EMPLOYEE") return <Navigate to="/auth" replace />;
    return (
      <AllTable
        title="All Users"
        fields={this.pageData.fields.filter(
          (field) => field.name !== "password" && field.name !== "businessId",
        )}
        endpoint={this.pageData.endpoint}
      />
    );
  },
};
