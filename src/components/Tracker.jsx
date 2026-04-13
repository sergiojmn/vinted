import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/* =========================
   DATA ORIGINAL
========================= */

const BRANDS = [
  "Stüssy","Ami Paris","Comme des Garçons","Stone Island","Chrome Hearts",
  "Nike","Adidas","New Balance","Puma","Reebok",
  "The North Face","Carhartt","Dickies","Patagonia",
  "Supreme","Palace","BAPE","Off-White","Fear of God",
  "Essentials","Represent","C.P. Company","Moncler",
  "Ralph Lauren","Tommy Hilfiger","Calvin Klein","Lacoste",
  "Burberry","Gucci","Balenciaga","Versace",
  "Levi's","Wrangler","Diesel",
  "Kappa","Fila","Ellesse","Champion",
  "Trapstar","Corteiz","424","Cactus Plant","Sp5der","Otra"
];

const STEPS = ["Localizar","Filtrar","Validar","Decidir","Publicar","Escalar"];

const STATUS_COLORS = {
  active:"#f0c040",
  won:"#4ade80",
  discarded:"#f87171"
};

const STATUS_LABELS = {
  active:"En proceso",
  won:"Ganador",
  discarded:"Descartado"
};

const newProduct = () => ({
  id: Date.now(),
  name: "",
  brand: "Stüssy",
  buyCost: "",
  sellPrice: "",
  step: 0,
  status: "active",
  vintedSaturated: false,
  soldIn7Days: false,
  notes: ""
});

/* =========================
   APP
========================= */

export default function App() {

  // 🔥 PERSISTENCIA REAL AQUÍ
  const [products, setProducts] = useLocalStorage("productos", []);

  const [view, setView] = useState("tracker");
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState(newProduct());

  const addProduct = () => {
    if (!draft.name) return;

    setProducts(prev => [...prev, { ...draft, id: Date.now() }]);

    setDraft(newProduct());
    setShowForm(false);
  };

  const updateProduct = (id, ch) =>
    setProducts(p => p.map(x => x.id === id ? { ...x, ...ch } : x));

  const removeProduct = (id) =>
    setProducts(p => p.filter(x => x.id !== id));

  const invested = products.reduce((s,p)=>s+(parseFloat(p.buyCost)||0),0);
  const earned = products.reduce((s,p)=>s+(parseFloat(p.sellPrice)||0),0);

  return (
    <div style={S.root}>

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.logo}>H→V Tracker</div>

        <div style={S.nav}>
          <button onClick={()=>setView("tracker")} style={S.navBtn}>Tracker</button>
          <button onClick={()=>setView("calc")} style={S.navBtn}>Margen</button>
          <button onClick={()=>setView("check")} style={S.navBtn}>Guía</button>
          <button onClick={()=>setView("sup")} style={S.navBtn}>Proveedores</button>
        </div>
      </header>

      {/* TRACKER */}
      {view === "tracker" && (
        <div style={S.page}>

          <h2 style={S.title}>📦 Tracker PRO</h2>

          <button style={S.addBtn} onClick={()=>setShowForm(v=>!v)}>
            {showForm ? "Cancelar" : "+ Nuevo producto"}
          </button>

          {/* FORM */}
          {showForm && (
            <div style={S.card}>
              <input
                placeholder="Nombre"
                value={draft.name}
                onChange={e=>setDraft({...draft,name:e.target.value})}
                style={S.input}
              />

              <div style={S.row}>
                <input
                  placeholder="Compra €"
                  value={draft.buyCost}
                  onChange={e=>setDraft({...draft,buyCost:e.target.value})}
                  style={S.input}
                />
                <input
                  placeholder="Venta €"
                  value={draft.sellPrice}
                  onChange={e=>setDraft({...draft,sellPrice:e.target.value})}
                  style={S.input}
                />
              </div>

              <button onClick={addProduct} style={S.saveBtn}>
                Guardar
              </button>
            </div>
          )}

          {/* STATS */}
          <div style={S.stats}>
            <div>💰 Invertido: {invested.toFixed(0)}€</div>
            <div>📈 Vendido: {earned.toFixed(0)}€</div>
            <div>📦 Productos: {products.length}</div>
          </div>

          {/* LIST */}
          <div style={{display:"grid",gap:12}}>
            {products.map(p => (
              <div key={p.id} style={S.card}>

                <div style={S.cardHeader}>
                  <div>
                    <b>{p.name || "Sin nombre"}</b>
                    <div style={{fontSize:12,color:"#777"}}>
                      {p.buyCost}€ → {p.sellPrice}€
                    </div>
                  </div>

                  <span style={{
                    ...S.badge,
                    background: STATUS_COLORS[p.status]
                  }}>
                    {STATUS_LABELS[p.status]}
                  </span>
                </div>

                {/* STEPS */}
                <div style={S.steps}>
                  {STEPS.map((s,i)=>(
                    <button
                      key={s}
                      onClick={()=>updateProduct(p.id,{step:i})}
                      style={{
                        ...S.step,
                        background: i<=p.step ? "#f0c040" : "#1a1a1a",
                        color: i<=p.step ? "#000" : "#777"
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* ACTIONS */}
                <div style={S.actions}>
                  <select
                    value={p.status}
                    onChange={e=>updateProduct(p.id,{status:e.target.value})}
                    style={S.select}
                  >
                    <option value="active">Activo</option>
                    <option value="won">Ganador</option>
                    <option value="discarded">Descartado</option>
                  </select>

                  <button onClick={()=>removeProduct(p.id)} style={S.deleteBtn}>
                    Eliminar
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* PLACEHOLDERS */}
      {view === "calc" && <div style={S.page}>🧮 Margen</div>}
      {view === "check" && <div style={S.page}>✅ Guía</div>}
      {view === "sup" && <div style={S.page}>📋 Proveedores</div>}

    </div>
  );
}

/* =========================
   ESTILOS (NO TOCADOS)
========================= */

const S = {
  root:{
    fontFamily:"monospace",
    background:"#0f0f0f",
    color:"#e8e8e8",
    minHeight:"100vh"
  },

  header:{
    display:"flex",
    justifyContent:"space-between",
    padding:16,
    borderBottom:"1px solid #222"
  },

  logo:{
    fontWeight:900,
    color:"#f0c040"
  },

  nav:{display:"flex",gap:8},

  navBtn:{
    background:"#1a1a1a",
    border:"1px solid #222",
    color:"#ccc",
    padding:"6px 10px",
    borderRadius:6,
    cursor:"pointer"
  },

  page:{padding:20},

  title:{fontSize:20},

  addBtn:{
    background:"#f0c040",
    border:"none",
    padding:"10px 14px",
    borderRadius:8,
    fontWeight:700,
    marginBottom:10,
    cursor:"pointer"
  },

  card:{
    background:"#111",
    border:"1px solid #222",
    padding:12,
    borderRadius:10
  },

  input:{
    width:"100%",
    padding:8,
    marginBottom:6,
    background:"#0f0f0f",
    border:"1px solid #222",
    color:"#fff",
    borderRadius:6
  },

  row:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},

  saveBtn:{
    width:"100%",
    background:"#4ade80",
    border:"none",
    padding:8,
    borderRadius:6,
    fontWeight:700
  },

  stats:{
    display:"flex",
    gap:12,
    margin:"10px 0",
    fontSize:12,
    color:"#888"
  },

  cardHeader:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  badge:{
    padding:"4px 8px",
    borderRadius:20,
    fontSize:10,
    fontWeight:700,
    color:"#000"
  },

  steps:{
    display:"flex",
    flexWrap:"wrap",
    gap:6,
    marginTop:10
  },

  step:{
    border:"none",
    padding:"4px 8px",
    borderRadius:6,
    fontSize:10,
    cursor:"pointer"
  },

  actions:{
    display:"flex",
    justifyContent:"space-between",
    marginTop:10
  },

  select:{
    background:"#111",
    color:"#fff",
    border:"1px solid #222"
  },

  deleteBtn:{
    background:"transparent",
    border:"1px solid #f87171",
    color:"#f87171",
    padding:"4px 8px",
    borderRadius:6,
    cursor:"pointer"
  }
};