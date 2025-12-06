import { Navigate } from "react-router-dom";
import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/containers/NewForm";

export default {
  pageData: new BasePageData(
    [
      { name: "phone", label: "Phone", type: "number" },
      { name: "password", label: "Password", type: "password" },
    ],
    "auth",
  ),
  Login() {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      return <Navigate to="/appointment/all" replace />;
    }
    return (
      <NewForm
        title="Login"
        fields={this.pageData.fields}
        endpoint={this.pageData.endpoint}
        action="Enter"
        tokenSetter={true}
      />
    );
  },
};
