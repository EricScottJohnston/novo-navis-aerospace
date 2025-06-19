export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#00d4ff' }}>
          Novo Navis Aerospace Operations
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#cccccc' }}>
          A Novo Navis Company
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', minWidth: '200px' }}>
            <h3 style={{ color: '#00d4ff' }}>Aerospace Operations</h3>
            <p>Advanced aerospace engineering solutions</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', minWidth: '200px' }}>
            <h3 style={{ color: '#00d4ff' }}>TRAC Labs</h3>
            <p>Threat Response and Control</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', minWidth: '200px' }}>
            <h3 style={{ color: '#00d4ff' }}>Fiber Dynamics</h3>
            <p>Next-generation fiber technology</p>
          </div>
        </div>
      </div>
    </div>
  )
}
