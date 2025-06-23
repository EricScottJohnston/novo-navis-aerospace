import React from 'react';

export default function GridHome() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Courier New', monospace"
    }}>
      {/* Animated grid background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        animation: "gridMove 20s linear infinite",
        zIndex: 1
      }} />

      {/* Perspective grid lines */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "200%",
        height: "50%",
        background: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 48px,
            rgba(0, 255, 255, 0.4) 50px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            rgba(0, 255, 255, 0.4) 50px
          )
        `,
        transformOrigin: "center bottom",
        transform: "translateX(-50%) perspective(300px) rotateX(75deg)",
        zIndex: 1
      }} />

      {/* Main content container */}
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center"
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#00ffff",
          textAlign: "center",
          marginBottom: "3rem",
          textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
          letterSpacing: "0.1em",
          animation: "glow 2s ease-in-out infinite alternate"
        }}>
          NOVO NAVIS
        </h1>

        {/* Grid of 3D shapes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "4rem",
          maxWidth: "800px",
          width: "100%"
        }}>
          {/* Triangle - Aerospace Operations */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: "120px",
              height: "120px",
              margin: "2rem",
              perspective: "200px"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                animation: "rotate3d 4s linear infinite"
              }}>
                <div style={{
                  position: "absolute",
                  width: 0,
                  height: 0,
                  borderLeft: "60px solid transparent",
                  borderRight: "60px solid transparent",
                  borderBottom: "104px solid #ff00ff",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "drop-shadow(0 0 15px #ff00ff)",
                  animation: "pulse 2s ease-in-out infinite alternate"
                }} />
              </div>
            </div>
            <h3 style={{
              color: "#ff00ff",
              fontSize: "1.2rem",
              textAlign: "center",
              textShadow: "0 0 10px #ff00ff",
              letterSpacing: "0.05em"
            }}>
              AEROSPACE<br />OPERATIONS
            </h3>
          </div>

          {/* Square - Fiber Dynamics */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: "120px",
              height: "120px",
              margin: "2rem",
              perspective: "200px"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#ffff00",
                position: "relative",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
                animation: "rotate3d 3s linear infinite",
                filter: "drop-shadow(0 0 15px #ffff00)",
                boxShadow: "inset 0 0 20px rgba(255, 255, 0, 0.5)"
              }} />
            </div>
            <h3 style={{
              color: "#ffff00",
              fontSize: "1.2rem",
              textAlign: "center",
              textShadow: "0 0 10px #ffff00",
              letterSpacing: "0.05em"
            }}>
              FIBER<br />DYNAMICS
            </h3>
          </div>

          {/* Sphere - TRAC Labs */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: "120px",
              height: "120px",
              margin: "2rem",
              perspective: "200px"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#00ff00",
                borderRadius: "50%",
                position: "relative",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                animation: "rotate3d 5s linear infinite",
                filter: "drop-shadow(0 0 15px #00ff00)",
                boxShadow: "inset -20px -20px 40px rgba(0, 0, 0, 0.3), inset 20px 20px 40px rgba(255, 255, 255, 0.1)"
              }} />
            </div>
            <h3 style={{
              color: "#00ff00",
              fontSize: "1.2rem",
              textAlign: "center",
              textShadow: "0 0 10px #00ff00",
              letterSpacing: "0.05em"
            }}>
              TRAC<br />LABS
            </h3>
          </div>

          {/* Rod - ALTER Project */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: "120px",
              height: "120px",
              margin: "2rem",
              perspective: "200px"
            }}>
              <div style={{
                width: "12px",
                height: "80px",
                backgroundColor: "#ff4500",
                position: "relative",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
                animation: "rotate3d 2s linear infinite",
                filter: "drop-shadow(0 0 15px #ff4500)",
                boxShadow: "inset 0 0 10px rgba(255, 69, 0, 0.5)"
              }} />
            </div>
            <h3 style={{
              color: "#ff4500",
              fontSize: "1.2rem",
              textAlign: "center",
              textShadow: "0 0 10px #ff4500",
              letterSpacing: "0.05em"
            }}>
              ALTER<br />PROJECT
            </h3>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes rotate3d {
          0% { transform: translate(-50%, -50%) rotateY(0deg); }
          25% { transform: translate(-50%, -50%) rotateY(90deg); }
          50% { transform: translate(-50%, -50%) rotateY(180deg); }
          75% { transform: translate(-50%, -50%) rotateY(270deg); }
          100% { transform: translate(-50%, -50%) rotateY(360deg); }
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff; }
          to { text-shadow: 0 0 30px #00ffff, 0 0 40px #00ffff, 0 0 50px #00ffff; }
        }
        
        @keyframes pulse {
          from { filter: drop-shadow(0 0 15px #ff00ff) brightness(1); }
          to { filter: drop-shadow(0 0 25px #ff00ff) brightness(1.2); }
        }
        
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          h1 {
            font-size: 2rem !important;
          }
          h3 {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
