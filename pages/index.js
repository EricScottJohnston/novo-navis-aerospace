export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#0a0a23"
    }}>
      {/* Animated starry background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}>
        {/* Create multiple layers of stars */}
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              backgroundColor: "white",
              borderRadius: "50%",
              left: Math.random() * 120 + "%",
              top: Math.random() * 100 + "%",
              animation: `starMove ${2 + Math.random() * 3}s linear infinite`,
              opacity: 0.7 + Math.random() * 0.3,
              boxShadow: "0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.5)"
            }}
          />
        ))}
      </div>

      {/* Ship background image */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/ship.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 2,
        opacity: 0.4
      }}></div>

      {/* Semi-transparent overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 3
      }}></div>
      
      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 4,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}>
        {/* NOVO NAVIS Button */}
        <button style={{
          padding: "1.5rem 3rem",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "white",
          fontWeight: "700",
          fontSize: "1.5rem",
          letterSpacing: "0.1em",
          borderRadius: "0.75rem",
          border: "2px solid rgba(255,255,255,0.3)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          backdropFilter: "blur(15px)",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
          e.target.style.borderColor = "rgba(255,255,255,0.6)";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
          e.target.style.borderColor = "rgba(255,255,255,0.3)";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        }}
        >
          NOVO NAVIS
        </button>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes starMove {
          0% {
            transform: translateX(20vw) translateY(0);
          }
          100% {
            transform: translateX(-120vw) translateY(10px);
          }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          p {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
