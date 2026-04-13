export default function Checklist() {
  const steps = [
    "Find product",
    "Validate demand",
    "Buy stock",
    "List on Vinted",
    "Sell & reinvest"
  ];

  return (
    <div>
      <h2>⚙️ Workflow</h2>

      <div style={{display:"grid", gap:10}}>
        {steps.map((s,i)=>(
          <div key={i} className="card">
            <span style={{color:"#60a5fa"}}>STEP {i+1}</span>
            <div>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}