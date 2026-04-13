import { useState } from "react";

const SUPPLIERS = [
  { cat:"Ropa", subcat:"Camisetas", phone:"+56932792653", desc:"Poleras de Adidas" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56978607526", desc:"Poleras Champion, Jordan, Converse" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56967173733", desc:"Poleras de varias marcas" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56979452191", desc:"Poleras Guess, Gucci" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56965964962", desc:"Poleras réplicas mayor calidad" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56958387805", desc:"Poleras al por mayor" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56953996270", desc:"Poleras AAA" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+56989293401", desc:"Conjuntos Jordan, Adidas, Nike" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+8618378999627", desc:"Proveedor CN" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+8615099991198", desc:"Proveedor CN" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+8619148271513", desc:"Proveedor CN" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+8618102685487", desc:"Proveedor CN" },
  { cat:"Ropa", subcat:"Camisetas", phone:"+8615280231187", desc:"Proveedor CN" },

  { cat:"Ropa", subcat:"Chaquetas y Abrigos", phone:"+56965822048", desc:"Parkas Lippi, Doite, The North Face" },
  { cat:"Ropa", subcat:"Chaquetas y Abrigos", phone:"+56941841114", desc:"Chaquetas réplicas Doite" },
  { cat:"Ropa", subcat:"Chaquetas y Abrigos", phone:"+56941464753", desc:"Chaquetas, ropa mujer" },

  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+56971929416", desc:"Hoodies Supreme, Gucci" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+56954776795", desc:"Polerón Adidas y Jordan réplicas" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+56979094223", desc:"Conjuntos Adidas y Nike réplicas" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+8613828418891", desc:"Camisetas de Fútbol" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+8615626207077", desc:"Camisetas de Fútbol" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+8619925699521", desc:"Ropa de deporte" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+8615160484398", desc:"Nike Factory" },
  { cat:"Ropa", subcat:"Ropa Deportiva", phone:"+8613859549176", desc:"Nike Tech" },

  { cat:"Calzado", subcat:"Zapatillas", phone:"+56972912996", desc:"Zapatillas y bototos niño/hombre/mujer" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+56998678008", desc:"Zapatillas réplicas buena calidad" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+56936750249", desc:"Zapatillas por mayor" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+56959916507", desc:"Zapatillas, botas, camisetas fútbol" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+56996155075", desc:"Botas, pantuflas" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+8613225061120", desc:"GoWest Zapatillas" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+8618959551711", desc:"Proveedor Zapatillas" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+8618605945312", desc:"Proveedor Zapatillas" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+8618506022612", desc:"Zapatillas réplica" },
  { cat:"Calzado", subcat:"Zapatillas", phone:"+8618805063542", desc:"Jordan, Vans, calzado personalizado" },

  { cat:"Accesorios", subcat:"Bolsos y Cinturones", phone:"+56964969821", desc:"Cinturones, bolsos, relojes" },
  { cat:"Accesorios", subcat:"Bolsos y Cinturones", phone:"+8613104882987", desc:"Bolsos y carteras originales" },
  { cat:"Accesorios", subcat:"Bolsos y Cinturones", phone:"+56995749890", desc:"Carteras y accesorios" },
  { cat:"Accesorios", subcat:"Bolsos y Cinturones", phone:"+56954566572", desc:"Billeteras, cinturones, gorras" },

  { cat:"Accesorios", subcat:"Relojes", phone:"+8618965578831", desc:"Relojes" },
  { cat:"Accesorios", subcat:"Relojes", phone:"+56956191674", desc:"Relojes chilenos excelente calidad" },
  { cat:"Accesorios", subcat:"Relojes", phone:"+56949403770", desc:"Relojes patronato" },
  { cat:"Accesorios", subcat:"Relojes", phone:"+16463214908", desc:"Relojes internacionales" },

  { cat:"Tecnología", subcat:"Cascos", phone:"+56956758471", desc:"Cascos inalámbricos" },
  { cat:"Tecnología", subcat:"Cascos", phone:"+56993919041", desc:"Cascos y altavoces JBL" },
  { cat:"Tecnología", subcat:"Cascos", phone:"+56996455883", desc:"Cascos de Apple" },

  { cat:"Tecnología", subcat:"Celulares", phone:"+56935685624", desc:"Proveedor iPhone" },
  { cat:"Tecnología", subcat:"Celulares", phone:"+56959525131", desc:"Proveedor iPhone Oficial" },
  { cat:"Tecnología", subcat:"Celulares", phone:"+56977408043", desc:"Cables USB, fundas iPhone" },

  { cat:"Tecnología", subcat:"Juegos y Digital", phone:"+56957759853", desc:"Juegos PS4" },
  { cat:"Tecnología", subcat:"Juegos y Digital", phone:"+56982569147", desc:"Juegos PS4" },
];

export default function Suppliers() {
  const [cat, setCat] = useState("Ropa");
  const [subcat, setSubcat] = useState(null);
  const [q, setQ] = useState("");

  const cats = [...new Set(SUPPLIERS.map(s => s.cat))];

  const subcats = [...new Set(
    SUPPLIERS.filter(s => s.cat === cat).map(s => s.subcat)
  )];

  const filtered = SUPPLIERS.filter(s => {
    if (s.cat !== cat) return false;
    if (subcat && s.subcat !== subcat) return false;

    if (q) {
      const search = q.toLowerCase();
      return (
        s.desc.toLowerCase().includes(search) ||
        s.phone.includes(search)
      );
    }

    return true;
  });

  const flag = (phone) => {
    if (phone.startsWith("+569") || phone.startsWith("+56")) return "🇨🇱";
    if (phone.startsWith("+86")) return "🇨🇳";
    if (phone.startsWith("+34")) return "🇪🇸";
    if (phone.startsWith("+90")) return "🇹🇷";
    if (phone.startsWith("+92")) return "🇵🇰";
    if (phone.startsWith("+1")) return "🇺🇸";
    return "🌍";
  };

  return (
    <div>
      <h2>📋 Proveedores PRO</h2>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {cats.map(c => (
          <button
            key={c}
            onClick={() => { setCat(c); setSubcat(null); }}
            style={{
              padding: "6px 12px",
              background: cat === c ? "#f0c040" : "#222",
              color: cat === c ? "#000" : "#aaa",
              border: "none",
              borderRadius: 20
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <button onClick={() => setSubcat(null)}>Todas</button>
        {subcats.map(sc => (
          <button key={sc} onClick={() => setSubcat(sc)}>
            {sc}
          </button>
        ))}
      </div>

      <input
        placeholder="Buscar..."
        value={q}
        onChange={e => setQ(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((s, i) => (
          <a
            key={i}
            href={`https://wa.me/${s.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: 12,
              border: "1px solid #222",
              background: "#111",
              textDecoration: "none",
              color: "#fff",
              borderRadius: 10
            }}
          >
            <div>{flag(s.phone)} {s.subcat}</div>
            <div><b>{s.desc}</b></div>
            <div style={{ color: "#888" }}>{s.phone}</div>
            <div style={{ color: "#4ade80" }}>💬 WhatsApp</div>
          </a>
        ))}
      </div>
    </div>
  );
}