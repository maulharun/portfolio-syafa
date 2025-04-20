"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Fix import paths
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
// Import from the ThemeContext file
import { useTheme } from "./context/ThemeContext";

export default function HomePage() {
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use the theme context
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Debug: log when theme changes
  useEffect(() => {
    console.log("Current theme in HomePage:", theme, "isDarkTheme:", isDarkTheme);
  }, [theme, isDarkTheme]);

  const textOptions = ["Mahasiswa Perguruan Tinggi", "Administrasi Enthusiast", "Organisasi Aktif"];

  // Rest of your component stays the same...

  // Ensure the toggle button is working
  const handleThemeToggle = () => {
    console.log("Toggle button clicked");
    toggleTheme();
  };

  // In your theme toggle button JSX, update onClick:
  // onClick={handleThemeToggle} instead of onClick={toggleTheme}

  // Rest of your code...
  // Rest of your component code remains the same...
  // Refs for scroll animation elements
  const sectionsRef = useRef([]);
  const imageRef = useRef(null);
  const welcomeRef = useRef(null);
  const nameRef = useRef(null);
  const textRef = useRef(null);
  const bioRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardsRef = useRef(null);
  const skillsRef = useRef([]);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe all section elements
    const elements = [imageRef.current, welcomeRef.current, nameRef.current, textRef.current, bioRef.current, buttonsRef.current, cardsRef.current, ...sectionsRef.current, ...skillsRef.current].filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const text = textOptions[currentTextIndex];
    let index = 0;
    let typingInterval;

    // Type text
    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);

          // Wait before erasing
          setTimeout(startErasing, 2000);
        }
      }, 100);
    };

    // Erase text
    const startErasing = () => {
      typingInterval = setInterval(() => {
        if (typedText.length > 0) {
          setTypedText((prev) => prev.slice(0, -1));
        } else {
          clearInterval(typingInterval);

          // Make sure typedText is completely empty
          setTypedText("");

          // Move to next text
          setCurrentTextIndex((prevIndex) => (prevIndex === textOptions.length - 1 ? 0 : prevIndex + 1));

          // Start typing again after a pause
          setTimeout(startTyping, 500);
        }
      }, 50);
    };

    startTyping();

    return () => clearInterval(typingInterval);
  }, [currentTextIndex, textOptions, typedText]);

  // Theme styles
  const themeStyles = {
    background: isDarkTheme ? "linear-gradient(135deg, #111827, #1f2937, #111827)" : "linear-gradient(135deg, #f0f9ff, #e0f2fe, #f0f9ff)",
    textColor: isDarkTheme ? "#fff" : "#1e293b",
    accentColor: isDarkTheme ? "#90caf9" : "#3b82f6",
    cardBackground: isDarkTheme ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
    buttonGradient: isDarkTheme ? "linear-gradient(45deg, #42a5f5, #90caf9)" : "linear-gradient(45deg, #3b82f6, #60a5fa)",
    buttonTextColor: isDarkTheme ? "#fff" : "#fff",
    secondaryButtonBorder: isDarkTheme ? "2px solid #90caf9" : "2px solid #3b82f6",
    secondaryButtonColor: isDarkTheme ? "#fff" : "#3b82f6",
    borderColor: isDarkTheme ? "rgba(144, 202, 249, 0.3)" : "rgba(59, 130, 246, 0.3)",
    boxShadow: isDarkTheme ? "0 0 25px rgba(144, 202, 249, 0.4)" : "0 0 25px rgba(59, 130, 246, 0.2)",
    headingGradient: isDarkTheme ? "linear-gradient(45deg, #90caf9, #42a5f5)" : "linear-gradient(45deg, #3b82f6, #60a5fa)",
  };

  return (
    <>
      {/* Global Animations CSS */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(144, 202, 249, 0.6);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(144, 202, 249, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(144, 202, 249, 0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background-color: ${themeStyles.accentColor};
          margin-left: 2px;
          animation: blink 1s infinite;
          vertical-align: text-bottom;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        /* Animation classes for scroll */
        .animate-fadeInUp {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-fadeInLeft {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-fadeInRight {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-fadeInScale {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-fadeInRotate {
          opacity: 0;
          transform: rotate(-10deg) scale(0.9);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animate-visible {
          opacity: 1 !important;
          transform: translate(0) rotate(0) scale(1) !important;
        }

        /* Staggered animations */
        .stagger-item:nth-child(1) {
          transition-delay: 0.1s;
        }
        .stagger-item:nth-child(2) {
          transition-delay: 0.2s;
        }
        .stagger-item:nth-child(3) {
          transition-delay: 0.3s;
        }
        .stagger-item:nth-child(4) {
          transition-delay: 0.4s;
        }
      `}</style>

      {/* Add the Navbar component here */}
      <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "0 2rem",
          backgroundImage: themeStyles.background,
          backgroundSize: "200% 200%",
          animation: "gradientFlow 15s ease infinite",
          color: themeStyles.textColor,
          transition: "background 0.5s ease, color 0.5s ease",
        }}
      >
        {/* Theme Toggle Button - You can remove this if the Navbar has the toggle */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 100,
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: themeStyles.buttonGradient,
              border: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            }}
          >
            {isDarkTheme ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="white" />
                <path d="M12 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 20V22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M4.93 4.93L6.34 6.34" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M17.66 17.66L19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M6.34 17.66L4.93 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M19.07 4.93L17.66 6.34" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#1e293b" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1200px",
            padding: "2rem",
            margin: "0 auto",
          }}
        >
          {/* Hero Section */}
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "4rem",
              width: "100%",
              paddingTop: "4rem",
              paddingBottom: "4rem",
            }}
          >
            {/* Image Column */}
            <div
              style={{
                flex: "1 1 400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                ref={imageRef}
                className="animate-fadeInLeft"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  border: `4px solid ${themeStyles.borderColor}`,
                  boxShadow: themeStyles.boxShadow,
                  transition: "border 0.5s ease, box-shadow 0.5s ease",
                }}
              >
                <Image
                  src="/syafa2.jpg"
                  alt="Foto Syafa"
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            {/* Text Column */}
            <div
              style={{
                flex: "1 1 400px",
                textAlign: "center",
                color: themeStyles.textColor,
                transition: "color 0.5s ease",
              }}
            >
              <h3
                ref={welcomeRef}
                className="animate-fadeInUp"
                style={{
                  fontSize: "1.2rem",
                  color: themeStyles.accentColor,
                  marginBottom: "0.5rem",
                  transition: "color 0.5s ease",
                }}
              >
                Selamat Datang di Website Saya
              </h3>

              <h1
                ref={nameRef}
                className="animate-fadeInUp"
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  backgroundImage: themeStyles.headingGradient,
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 3s infinite linear",
                  transition: "background-image 0.5s ease",
                }}
              >
                Syafa Nur April Yanti
              </h1>

              <div
                ref={textRef}
                className="animate-fadeInUp"
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "2rem",
                  minHeight: "2.2rem",
                  color: themeStyles.textColor,
                  transition: "color 0.5s ease",
                }}
              ></div>

              <p
                ref={bioRef}
                className="animate-fadeInUp"
                style={{
                  lineHeight: "1.7",
                  fontSize: "1.1rem",
                  marginBottom: "2rem",
                  maxWidth: "500px",
                  margin: "0 auto 2rem auto",
                  color: themeStyles.textColor,
                  transition: "color 0.5s ease",
                }}
              >
                Saya seorang mahasiswa semester 4 memiliki ketertarikan di bidang administrasi. Terbiasa menggunakan aplikasi administrasi seperti Microsoft Office dan Google Docs. Saya memiliki pengalaman berorganisasi dan proyek kegiatan
                sekolah.
              </p>

              <div
                ref={buttonsRef}
                className="animate-fadeInUp"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Link href="/about">
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: themeStyles.buttonGradient,
                      color: themeStyles.buttonTextColor,
                      border: "none",
                      borderRadius: "30px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease, background 0.5s ease, color 0.5s ease",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 7px 20px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                    }}
                  >
                    Tentang Saya
                  </button>
                </Link>

                <Link href="/contact">
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "transparent",
                      color: themeStyles.secondaryButtonColor,
                      border: themeStyles.secondaryButtonBorder,
                      borderRadius: "30px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease, background 0.5s ease, color 0.5s ease, border 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDarkTheme ? "rgba(144, 202, 249, 0.1)" : "rgba(59, 130, 246, 0.1)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Hubungi Saya
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div
            ref={(el) => (sectionsRef.current[0] = el)}
            className="animate-fadeInUp"
            style={{
              width: "100%",
              padding: "5rem 0",
              textAlign: "center",
              minHeight: "50vh",
              color: themeStyles.textColor,
              transition: "color 0.5s ease",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "2rem",
                backgroundImage: themeStyles.headingGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "background-image 0.5s ease",
              }}
            >
              Siapa Saya?
            </h2>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.8",
                fontSize: "1.1rem",
                color: themeStyles.textColor,
                transition: "color 0.5s ease",
              }}
            >
              Saya adalah seorang mahasiswa yang penuh semangat di bidang administrasi dengan ketertarikan mendalam terhadap organisasi dan manajemen. Dengan pengalaman di berbagai organisasi kampus dan proyek sekolah, saya telah
              mengembangkan keterampilan dalam hal koordinasi dan administrasi yang efektif.
            </p>
          </div>

          {/* Skills Summary Section */}
          <div
            ref={(el) => (sectionsRef.current[1] = el)}
            className="animate-fadeInUp"
            style={{
              width: "100%",
              padding: "5rem 0",
              minHeight: "50vh",
              transition: "color 0.5s ease",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "2rem",
                backgroundImage: themeStyles.headingGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "background-image 0.5s ease",
              }}
            >
              Kemampuan?
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
              {[
                { title: "Microsoft Office", description: "Mahir menggunakan Word, Excel, dan PowerPoint", icon: "📊" },
                { title: "Administrasi", description: "Pengalaman dalam pengelolaan dokumen dan koordinasi", icon: "📝" },
                { title: "Organisasi", description: "Aktif dalam kepengurusan organisasi kampus", icon: "👥" },
              ].map((skill, index) => (
                <div
                  key={index}
                  ref={(el) => (skillsRef.current[index] = el)}
                  className="animate-fadeInScale"
                  style={{
                    flex: "1 1 300px",
                    maxWidth: "350px",
                    padding: "2rem",
                    backgroundColor: themeStyles.cardBackground,
                    borderRadius: "15px",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s ease",
                    color: themeStyles.textColor,
                    // Make sure the skills are visible by default on mobile
                    opacity: 1,
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = isDarkTheme ? "0 10px 30px rgba(144, 202, 249, 0.2)" : "0 10px 30px rgba(59, 130, 246, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{skill.icon}</div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "1rem",
                      color: themeStyles.accentColor,
                      transition: "color 0.5s ease",
                    }}
                  >
                    {skill.title}
                  </h3>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer showing quick links */}
          <div
            ref={cardsRef}
            className="animate-fadeInUp"
            style={{
              marginTop: "4rem",
              marginBottom: "4rem",
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {[
              { name: "Hard Skills", href: "/skills", icon: "📊" },
              { name: "Soft Skills", href: "/skills", icon: "🧠" },
              { name: "Portfolio", href: "/portfolio", icon: "📑" },
              { name: "Contact", href: "/contact", icon: "📞" },
            ].map((item, index) => (
              <Link href={item.href} key={index}>
                <div
                  className="stagger-item animate-fadeInScale"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "1rem",
                    borderRadius: "12px",
                    background: themeStyles.cardBackground,
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease, background-color 0.5s ease",
                    cursor: "pointer",
                    minWidth: "120px",
                    color: themeStyles.textColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDarkTheme ? "rgba(144, 202, 249, 0.1)" : "rgba(59, 130, 246, 0.1)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = themeStyles.cardBackground;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Add the ChatBot component */}
      <ChatBot />
    </>
  );
}
