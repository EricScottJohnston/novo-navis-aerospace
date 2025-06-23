import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Test with img tag first */}
      <img src="/ship.jpg" alt="test" style={{width: '100px', height: '100px'}} />
      
      <div 
        style={{
          minHeight: '100vh',
          background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/ship.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, padding: '2rem' }}>
          <h1>Welcome to My Site</h1>
          <p>Your content here</p>
        </div>
      </div>
    </div>
  );
}
