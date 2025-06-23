import React from 'react';

export default function Home() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/Public/Firefly_Old Sailing ship. 2-d drawing 87265')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}
      ></div>
      
      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '2rem'
        }}
      >
        <h1>Welcome to My Site</h1>
        <p>Your content here</p>
      </div>
    </div>
  );
}
