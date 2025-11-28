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
              location.replace("/user/auth");
            }}
          >
            Login
          </button>
          <button
            on
            onClick={async () => {
              await fetch("http://localhost:3000/user/auth");
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
