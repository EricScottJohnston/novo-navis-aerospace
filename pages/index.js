import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Test with online image */}
      <img src="https://picsum.photos/200/300" alt="test" style={{width: '200px', height: '200px'}} />
      
      <div 
        style={{
          minHeight: '100vh',
          backgroundImage: "url('https://picsum.photos/1920/1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, padding: '2rem' }}>
          <h1>Welcome to My Site</h1>
          <p>Testing with online image</p>
        </div>
      </div>
    </div>
  );
}
