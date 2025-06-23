export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/ship.jpg')"
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-70 z-10" />
      
      {/* Content */}
      <div className="relative z-20 p-8 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome to My Site
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover amazing content and experiences crafted just for you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
