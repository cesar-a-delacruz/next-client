import BasePageData from "@/utils/BasePageData";
import NewForm from "@/components/NewForm";

export default {
    pageData: new BasePageData(
        [
            { name: "phone", label: "Phone", type: "number" },
            { name: "password", label: "Password", type: "password" },
        ],
        "user/auth",
    ),
    Auth() {
        return (
            <NewForm
                title="Login"
                fields={this.pageData.fields}
                endpoint={this.pageData.endpoint}
                action="Create"
            />
        );
    },
};
