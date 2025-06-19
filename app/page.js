export default function Page() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a2e',
      color: 'white',
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ color: '#00d4ff', fontSize: '3rem' }}>
        Novo Navis Aerospace Operations
      </h1>
      <p style={{ fontSize: '1.5rem' }}>A Novo Navis Company</p>
      <div style={{ marginTop: '40px' }}>
        <h2>Our Divisions:</h2>
        <p>• Aerospace Operations</p>
        <p>• TRAC Labs (Threat Response and Control)</p>
        <p>• Fiber Dynamics</p>
      </div>
    </div>
  )
}
