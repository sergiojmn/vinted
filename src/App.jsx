import { useState } from "react";
import Tracker from "./components/Tracker";
import Calculator from "./components/Calculator";
import Checklist from "./components/Checklist";
import Suppliers from "./components/Suppliers";
import Analytics from "./components/Analytics";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [view, setView] = useState("tracker");
  const [products, setProducts] = useLocalStorage("productos", []);

  return (
    <div>
      <div style={{
        display:"flex",
        gap:10,
        padding:16,
        borderBottom:"1px solid #1e293b"
      }}>
        <button onClick={()=>setView("tracker")}>Tracker</button>
        <button onClick={()=>setView("analytics")}>Analítica</button>
        <button onClick={()=>setView("calc")}>ROI</button>
        <button onClick={()=>setView("checklist")}>Flow</button>
        <button onClick={()=>setView("suppliers")}>Proveedores</button>
      </div>

      <div style={{padding:20}}>
        {view==="tracker" && (
          <Tracker products={products} setProducts={setProducts} />
        )}

        {view==="analytics" && (
          <Analytics products={products} />
        )}

        {view==="calc" && <Calculator />}
        {view==="checklist" && <Checklist />}
        {view==="suppliers" && <Suppliers />}
      </div>
    </div>
  );
}