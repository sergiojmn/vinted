import { useMemo } from "react";

export default function Analytics({ products }) {

  const stats = useMemo(() => {
    const total = products.length;

    const vendidos = products.filter(p => p.status === "won");
    const activos = products.filter(p => p.status === "active");
    const descartados = products.filter(p => p.status === "discarded");

    const invertido = products.reduce((a, p) => a + (parseFloat(p.buyCost) || 0), 0);
    const vendidoTotal = vendidos.reduce((a, p) => a + (parseFloat(p.sellPrice) || 0), 0);

    const beneficio = vendidoTotal - invertido;

    const roi = invertido ? ((beneficio / invertido) * 100) : 0;
    const winRate = total ? (vendidos.length / total) * 100 : 0;

    return {
      total,
      vendidos: vendidos.length,
      activos: activos.length,
      descartados: descartados.length,
      invertido,
      vendidoTotal,
      beneficio,
      roi,
      winRate
    };
  }, [products]);

  const Card = ({ title, value, sub, color }) => (
    <div style={styles.card}>
      <div style={{ ...styles.value, color }}>{value}</div>
      <div style={styles.title}>{title}</div>
      {sub && <div style={styles.sub}>{sub}</div>}
    </div>
  );

  const Progress = ({ label, value, color }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={styles.progressLabel}>
        <span>{label}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div style={styles.barBg}>
        <div style={{ ...styles.barFill, width: `${Math.min(value, 100)}%`, background: color }} />
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>📊 Analítica de Negocio</h2>

      {/* GRID PRINCIPAL */}
      <div style={styles.grid}>
        <Card title="Total productos" value={stats.total} color="#60a5fa" />
        <Card title="Vendidos" value={stats.vendidos} color="#4ade80" />
        <Card title="Activos" value={stats.activos} color="#facc15" />
        <Card title="Descartados" value={stats.descartados} color="#f87171" />
      </div>

      {/* FINANZAS */}
      <div style={styles.grid2}>
        <Card title="Invertido" value={`${stats.invertido.toFixed(0)}€`} color="#a78bfa" />
        <Card title="Ingresos" value={`${stats.vendidoTotal.toFixed(0)}€`} color="#22c55e" />
        <Card title="Beneficio" value={`${stats.beneficio.toFixed(0)}€`} color="#4ade80" />
      </div>

      {/* BARRAS */}
      <div style={styles.panel}>
        <h3 style={styles.h3}>📈 Rendimiento</h3>

        <Progress label="ROI" value={stats.roi} color="#60a5fa" />
        <Progress label="Tasa de éxito" value={stats.winRate} color="#4ade80" />
      </div>

      {/* INSIGHTS */}
      <div style={styles.insights}>
        <h3 style={styles.h3}>🧠 Insights</h3>

        {stats.roi > 100 && (
          <div style={styles.good}>🔥 Estás en modo escala: ROI excelente</div>
        )}

        {stats.winRate < 30 && (
          <div style={styles.bad}>⚠️ Baja tasa de éxito: revisa selección de productos</div>
        )}

        {stats.beneficio > 0 && (
          <div style={styles.good}>💰 Negocio rentable en positivo</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    color: "#e5e5e5"
  },
  h2: {
    marginBottom: 20,
    fontSize: 22
  },
  h3: {
    marginBottom: 12
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 20
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginBottom: 20
  },

  card: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: 12,
    padding: 16
  },

  value: {
    fontSize: 22,
    fontWeight: 800
  },

  title: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4
  },

  sub: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 6
  },

  panel: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },

  insights: {
    background: "#0f0f0f",
    border: "1px solid #222",
    borderRadius: 12,
    padding: 16
  },

  good: {
    padding: 10,
    background: "#052e1a",
    border: "1px solid #14532d",
    borderRadius: 8,
    marginBottom: 8
  },

  bad: {
    padding: 10,
    background: "#2a0a0a",
    border: "1px solid #7f1d1d",
    borderRadius: 8,
    marginBottom: 8
  },

  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 6
  },

  barBg: {
    height: 8,
    background: "#222",
    borderRadius: 999
  },

  barFill: {
    height: "100%",
    borderRadius: 999
  }
};