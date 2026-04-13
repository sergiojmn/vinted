import { useState } from "react";

export default function Calculator() {
  const [c,setC] = useState("");
  const [s,setS] = useState("");

  const profit = (c,s)=>(+s||0)-(+c||0);
  const roi = (c,s)=>{
    const cv=+c||0;
    return cv ? (((+s||0)-cv)/cv*100).toFixed(0) : 0;
  };

  return (
    <div>
      <h2>📊 ROI Engine</h2>

      <div className="card" style={{display:"grid", gap:10}}>
        <input placeholder="Coste" onChange={e=>setC(e.target.value)} />
        <input placeholder="Venta" onChange={e=>setS(e.target.value)} />

        <div style={{display:"flex", gap:10}}>
          <div className="card">💰 {profit(c,s)}€</div>
          <div className="card">📈 {roi(c,s)}%</div>
        </div>
      </div>
    </div>
  );
}