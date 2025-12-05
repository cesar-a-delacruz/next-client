import { Outlet } from "react-router-dom";
export default function DefaultLayout() {
  return (
    <>
      <header>
        <h1>Next Client</h1>
        <nav>
          <button
            onClick={() => {
              localStorage.clear();
              location.replace("/auth");
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              localStorage.clear();
              location.replace("/auth");
            }}
          >
            Logout
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        Developed By César De La Cruz at Universidad Tecnológica de Panamá ©{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
}
