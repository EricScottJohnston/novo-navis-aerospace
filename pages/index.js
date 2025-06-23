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
        minHeight: "100vh",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color: "white",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
        }}>
          Welcome to My Site
        </h1>
        <p style={{
          fontSize: "1.5rem",
          color: "rgba(255,255,255,0.9)",
          marginBottom: "2rem",
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
        }}>
          Sailing through the digital cosmos
        </p>
        
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button style={{
            padding: "1rem 2rem",
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            color: "white",
            fontWeight: "600",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "rgba(59, 130, 246, 1)"}
          onMouseOut={(e) => e.target.style.backgroundColor = "rgba(59, 130, 246, 0.8)"}
          >
            Get Started
          </button>
          <button style={{
            padding: "1rem 2rem",
            backgroundColor: "transparent",
            color: "white",
            fontWeight: "600",
            borderRadius: "0.5rem",
            border: "2px solid rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
            e.target.style.borderColor = "rgba(255,255,255,0.8)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.borderColor = "rgba(255,255,255,0.5)";
          }}
          >
            Learn More
          </button>
        </div>
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
