import { useState } from "react";
import Tracker from "./components/Tracker";
import Calculator from "./components/Calculator";
import Checklist from "./components/Checklist";
import Suppliers from "./components/Suppliers";
import Analytics from "./components/Analytics";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [view, setView] = useState("tracker");

  // 🔥 PERSISTENCIA REAL (NO se borra al recargar)
  const [products, setProducts] = useLocalStorage("productos", []);

  return (
    <div style={S.page}>

      {/* NAV */}
      <div style={S.nav}>
        <button onClick={() => setView("tracker")}>Tracker</button>
        <button onClick={() => setView("analytics")}>Analítica</button>
        <button onClick={() => setView("calc")}>ROI</button>
        <button onClick={() => setView("checklist")}>Flow</button>
        <button onClick={() => setView("suppliers")}>Proveedores</button>
      </div>

      {/* CONTENT */}
      <div style={S.content}>

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

/* ======================
   ESTILOS BÁSICOS
====================== */

const S = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    color: "#e8e8e8",
    fontFamily: "monospace"
  },

  nav: {
    display: "flex",
    gap: 10,
    padding: 16,
    borderBottom: "1px solid #1f1f1f",
    flexWrap: "wrap"
  },

  content: {
    padding: 20
  }
};