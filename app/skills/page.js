"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "/components/Navbar"; // Importing the Navbar component

export default function SkillsPage() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s ease ${delay}s`,
  });

  const hardSkills = [
    {
      name: "Microsoft Office",
      level: 95,
      icon: "📊",
      description: "Menguasai Word, Excel, PowerPoint, dan Outlook untuk administrasi dan presentasi."
    },
    {
      name: "Database Management",
      level: 80,
      icon: "🗄️",
      description: "Pengalaman dalam mengelola database sederhana dan penyusunan laporan."
    },
    {
      name: "HTML & CSS",
      level: 75,
      icon: "🌐",
      description: "Mampu membuat dan memodifikasi halaman web sederhana dengan HTML dan CSS."
    },
    {
      name: "JavaScript",
      level: 65,
      icon: "💻",
      description: "Pemahaman dasar tentang JavaScript dan penggunaannya pada website."
    },
    {
      name: "React.js",
      level: 60,
      icon: "⚛️",
      description: "Mampu mengembangkan aplikasi web dengan React.js framework."
    },
    {
      name: "Adobe Photoshop",
      level: 70,
      icon: "🎨",
      description: "Keterampilan mengedit gambar dan desain grafis untuk keperluan administratif."
    }
  ];

  const softSkills = [
    {
      name: "Komunikasi",
      level: 90,
      icon: "🗣️",
      description: "Mampu berkomunikasi dengan jelas dan efektif dalam situasi profesional."
    },
    {
      name: "Manajemen Waktu",
      level: 85,
      icon: "⏱️",
      description: "Terbiasa mengelola waktu dengan efisien dan memenuhi tenggat waktu."
    },
    {
      name: "Kerja Tim",
      level: 95,
      icon: "👥",
      description: "Terampil bekerja dalam tim dan berkolaborasi untuk mencapai tujuan."
    },
    {
      name: "Kepemimpinan",
      level: 80,
      icon: "👑",
      description: "Pengalaman memimpin tim kecil dalam proyek kampus dan organisasi."
    },
    {
      name: "Pemecahan Masalah",
      level: 85,
      icon: "🧩",
      description: "Mampu menganalisis masalah dan menemukan solusi yang efektif."
    },
    {
      name: "Adaptabilitas",
      level: 90,
      icon: "🔄",
      description: "Cepat beradaptasi dengan lingkungan dan teknologi baru."
    }
  ];

  const certificates = [
    {
      name: "Microsoft Office Specialist",
      issuer: "Microsoft",
      date: "Agustus 2023",
      icon: "🏆"
    },
    {
      name: "Fundamental Web Development",
      issuer: "Dicoding Indonesia",
      date: "Mei 2023",
      icon: "🌐"
    },
    {
      name: "Basic Database Management",
      issuer: "Politeknik Mulia Kaltara",
      date: "November 2022",
      icon: "📚"
    }
  ];

  return (
    <>
      <Navbar /> {/* Adding the Navbar component here */}
      <div
        style={{
          minHeight: "100vh",
          padding: "7rem 2rem 4rem 2rem",
          background: "linear-gradient(135deg, #111827, #1f2937, #111827)",
          backgroundSize: "200% 200%",
          animation: "gradientFlow 15s ease infinite",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header Section */}
          <div style={fadeIn(0.1)}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "1rem",
                background: "linear-gradient(45deg, #90caf9, #42a5f5, #64b5f6)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s infinite linear",
              }}
            >
              Keterampilan
            </h1>
            <p
              style={{
                textAlign: "center",
                maxWidth: "700px",
                margin: "0 auto 3rem auto",
                fontSize: "1.1rem",
                lineHeight: "1.7",
                color: "#d1d5db",
              }}
            >
              Berikut adalah keterampilan yang saya miliki dan terus saya kembangkan untuk meningkatkan kualitas diri dalam dunia profesional.
            </p>
          </div>

          {/* Hard Skills Section */}
          <div style={{ marginBottom: "4rem", ...fadeIn(0.3) }}>
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "2rem",
                color: "#90caf9",
              }}
            >
              Hard Skills
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {hardSkills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(144, 202, 249, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        color: "#f0f0f0",
                      }}
                    >
                      {skill.name}
                    </h3>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#d1d5db" }}>Kemampuan</span>
                      <span style={{ color: "#90caf9" }}>{skill.level}%</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${skill.level}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #42a5f5, #90caf9)",
                          borderRadius: "4px",
                          animation: "slideIn 1.5s ease-out",
                        }}
                      />
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#9ca3af",
                      lineHeight: "1.6",
                    }}
                  >
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div style={{ marginBottom: "4rem", ...fadeIn(0.5) }}>
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "2rem",
                color: "#90caf9",
              }}
            >
              Soft Skills
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgba(144, 202, 249, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        color: "#f0f0f0",
                      }}
                    >
                      {skill.name}
                    </h3>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#d1d5db" }}>Kemampuan</span>
                      <span style={{ color: "#90caf9" }}>{skill.level}%</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${skill.level}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #64b5f6, #90caf9)",
                          borderRadius: "4px",
                          animation: "slideIn 1.5s ease-out",
                        }}
                      />
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#9ca3af",
                      lineHeight: "1.6",
                    }}
                  >
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Section */}
          <div style={{ marginBottom: "4rem", ...fadeIn(0.7) }}>
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "2rem",
                color: "#90caf9",
              }}
            >
              Sertifikasi
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {cert.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      color: "#f0f0f0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {cert.name}
                  </h3>
                  <div
                    style={{
                      color: "#90caf9",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {cert.issuer}
                  </div>
                  <div
                    style={{
                      color: "#9ca3af",
                    }}
                  >
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              ...fadeIn(0.9),
            }}
          >
            <Link href="/portfolio">
              <button
                style={{
                  padding: "0.75rem 2rem",
                  background: "linear-gradient(45deg, #42a5f5, #90caf9)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(144, 202, 249, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 7px 20px rgba(144, 202, 249, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(144, 202, 249, 0.3)";
                }}
              >
                Lihat Portfolio
              </button>
            </Link>
          </div>
        </div>

        <style jsx>{`
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
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes slideIn {
            0% {
              width: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}