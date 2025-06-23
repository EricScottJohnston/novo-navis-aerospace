jsx
export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{backgroundImage: "url('/Public/Firefly_Old Sailing ship. 2-d drawing 87265')"}}
    >
      {/* Overlay for fading effect */}
      <div className="absolute inset-0 bg-white bg-opacity-70"></div>
      
      {/* Your content */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold">Welcome to My Site</h1>
        <p>Your content here</p>
      </div>
    </div>
  );
}






