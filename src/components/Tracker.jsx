import { useState } from "react";

export default function Tracker({ products, setProducts }) {

  const [name, setName] = useState("");
  const [buy, setBuy] = useState("");
  const [sell, setSell] = useState("");

  const addProduct = () => {
    if (!name) return;

    const newProduct = {
      id: Date.now(),
      name,
      buyCost: buy,
      sellPrice: sell,
      step: 0,
      status: "active"
    };

    // ✅ ESTO ES LO IMPORTANTE
    setProducts(prev => [...prev, newProduct]);

    setName("");
    setBuy("");
    setSell("");
  };

  return (
    <div>

      <h2>Tracker</h2>

      {/* FORM */}
      <input
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Compra"
        value={buy}
        onChange={e => setBuy(e.target.value)}
      />

      <input
        placeholder="Venta"
        value={sell}
        onChange={e => setSell(e.target.value)}
      />

      <button onClick={addProduct}>
        Añadir
      </button>

      {/* LISTA */}
      {products.map(p => (
        <div key={p.id}>
          <b>{p.name}</b> {p.buyCost}€ → {p.sellPrice}€
        </div>
      ))}

    </div>
  );
}