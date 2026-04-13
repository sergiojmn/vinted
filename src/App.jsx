import { useState } from "react";
import Tracker from "./components/Tracker";
import Calculator from "./components/Calculator";
import Checklist from "./components/Checklist";
import Suppliers from "./components/Suppliers";
import Analytics from "./components/Analytics";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {

  /* =========================
     NAV
  ========================= */
  const [view, setView] = useState("tracker");

  /* =========================
     LOGIN
  ========================= */
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    if (user === "s" && pass === "s") {
      setLogged(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  /* =========================
     DATA (persistente)
  ========================= */
  const [products, setProducts] = useLocalStorage("productos", []);

  /* =========================
     LOGIN SCREEN (BLOQUEO APP)
  ========================= */
  if (!logged) {
    return (
      <div style={S.loginPage}>
        <div style={S.loginBox}>

          <h2>🔐 Login</h2>

          <input
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={S.input}
          />

          <input
            placeholder="Contraseña"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={S.input}
          />

          <button onClick={login} style={S.loginBtn}>
            Entrar
          </button>

        </div>
      </div>
    );
  }

  /* =========================
     APP
  ========================= */

  return (
    <div>

      {/* NAV */}
      <div style={S.nav}>
        <button onClick={() => setView("tracker")}>Tracker</button>
        <button onClick={() => setView("analytics")}>Analítica</button>
        <button onClick={() => setView("calc")}>ROI</button>
        <button onClick={() => setView("checklist")}>Flow</button>
        <button onClick={() => setView("suppliers")}>Proveedores</button>
      </div>

      {/* VIEWS */}
      <div style={{ padding: 20 }}>
        {view === "tracker" && (
          <Tracker
            products={products}
            setProducts={setProducts}
          />
        )}

        {view === "analytics" && (
          <Analytics products={products} />
        )}

        {view === "calc" && <Calculator />}
        {view === "checklist" && <Checklist />}
        {view === "suppliers" && <Suppliers />}
      </div>

    </div>
  );
}

/* =========================
   STYLES
========================= */

const S = {

  nav: {
    display: "flex",
    gap: 10,
    padding: 16,
    borderBottom: "1px solid #1e293b"
  },

  loginPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f0f0f",
    color: "#fff",
    fontFamily: "monospace"
  },

  loginBox: {
    width: 280,
    padding: 20,
    border: "1px solid #222",
    borderRadius: 12,
    background: "#111",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: 8,
    background: "#0f0f0f",
    border: "1px solid #222",
    color: "#fff",
    borderRadius: 6
  },

  loginBtn: {
    background: "#f0c040",
    border: "none",
    padding: 10,
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer"
  }
};