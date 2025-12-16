import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import "./default.css";

export default function DefaultLayout() {
  const token = localStorage.getItem("jwtToken");
  const userData = token ? jwtDecode(token) : null;
  return (
    <>
      <header>
        <h1>Next Client</h1>
        {token && (
          <nav>
            <div>
              <a href="/appointment/all">Citas</a>
            </div>
            <div>
              <a href="/service/all">Servicios</a>
            </div>
            {userData && userData.type === "EMPLOYEE" ? (
              <>
                <div>
                  <a href="/user/all">Usuarios</a>
                </div>
                <div>
                  <a href="/stats">Estadísticas</a>
                </div>
              </>
            ) : (
              <></>
            )}
          </nav>
        )}
        <div className="options">
          {!token ? (
            <>
              <button
                onClick={() => {
                  localStorage.clear();
                  location.replace("/auth");
                }}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  location.replace("/user/new");
                }}
              >
                Registrarse
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("jwtToken");
                localStorage.clear();
                location.replace("/auth");
              }}
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        Desarrollado en la Universidad Tecnológica de Panamá ©{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
}
