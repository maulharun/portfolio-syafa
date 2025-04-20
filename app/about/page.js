"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import ChatBot from "../../components/ChatBot.jsx"; // Import the ChatBot component

export default function AboutPage() {
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false); // State to toggle chat visibility

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s ease ${delay}s`,
  });

  const education = [
    {
      period: "2023 - Sekarang",
      institution: "Universitas Ma'soem",
      degree: "D-III Komputerisasi Akuntansi",
      description: "Fokus pada pengembangan aplikasi web dan mobile.",
    },
    {
      period: "2020 - 2023",
      institution: "SMA NEGRI 1 NAGREG",
      degree: "Jurusan IPA ",
      description: "Mempelajari keterampilan administratif dan manajemen dokumen.",
    },
  ];

  const experience = [
    {
      period: "2023 - 2024",
      role: "Sekretaris Himpunan (Departemen Pendidikan)",
      organization: "Universitas Ma'soem",
      description: "Mengelola administrasi dan dokumentasi kegiatan himpunan mahasiswa.",
    },
    {
      period: "2021 - 2022",
      role: "Magang Administrasi",
      organization: "PT. Karya Muda Indonesia",
      description: "Membantu pengelolaan dokumen, surat-menyurat, dan pengarsipan digital.",
    },
  ];

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          padding: "7rem 2rem 4rem 2rem",
          background: "linear-gradient(135deg, #111827, #1f2937, #111827)",
          backgroundSize: "200% 200%",
          animation: "gradientFlow 15s ease infinite",
          position: "relative", // Added to position chat button
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
              Tentang Saya
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
              Saya adalah mahasiswa yang memiliki ketertarikan dalam bidang administrasi dan pengembangan web. Berikut adalah perjalanan akademis dan profesional saya.
            </p>
          </div>

          {/* Profile Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "3rem",
              marginBottom: "4rem",
              justifyContent: "center",
              alignItems: "center",
              ...fadeIn(0.3),
            }}
          >
            {/* Profile Photo Section */}
            <div
              style={{
                flex: "0 1 350px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  padding: "8px",
                  background: "linear-gradient(45deg, #42a5f5, #90caf9, #64b5f6)",
                  boxShadow: "0 10px 30px rgba(66, 165, 245, 0.3)",
                  animation: "rotate 10s linear infinite",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Image src="/syafa.jpg" alt="Syafa Nur April Yanti" layout="fill" objectFit="cover" className="profile-image" />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, rgba(144, 202, 249, 0.2) 0%, rgba(66, 165, 245, 0) 50%, rgba(100, 181, 246, 0.2) 100%)",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-15px",
                    background: "#42a5f5",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    zIndex: 2,
                  }}
                >
                  <span style={{ color: "white", fontSize: "1.2rem" }}>👩‍🎓</span>
                </div>
              </div>
            </div>

            <div
              style={{
                flex: "1 1 400px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  color: "#90caf9",
                }}
              >
                Biodata Diri
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "1rem",
                  fontSize: "1.1rem",
                }}
              >
                <div style={{ color: "#9ca3af" }}>Nama Lengkap</div>
                <div style={{ color: "#f0f0f0" }}>Syafa Nur April Yanti</div>

                <div style={{ color: "#9ca3af" }}>Tanggal Lahir</div>
                <div style={{ color: "#f0f0f0" }}>07 April 2005</div>

                <div style={{ color: "#9ca3af" }}>Alamat</div>
                <div style={{ color: "#f0f0f0" }}>Bandung, Jawa Barat</div>

                <div style={{ color: "#9ca3af" }}>Email</div>
                <div style={{ color: "#f0f0f0" }}>syafanurapril@gmail.com</div>

                <div style={{ color: "#9ca3af" }}>Telepon</div>
                <div style={{ color: "#f0f0f0" }}>+62 853 4567 8901</div>
              </div>
            </div>

            <div
              style={{
                flex: "1 1 400px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  color: "#90caf9",
                }}
              >
                Tentang Diri Saya
              </h2>

              <p
                style={{
                  lineHeight: "1.8",
                  color: "#f0f0f0",
                  marginBottom: "1rem",
                }}
              >
                Saya adalah mahasiswa semester 4 Universitas Ma'soem jurusan D-III Komputerisasi Akuntansi. Saya memiliki minat khusus dalam bidang administrasi dan pengelolaan data.
              </p>

              <p
                style={{
                  lineHeight: "1.8",
                  color: "#f0f0f0",
                  marginBottom: "1rem",
                }}
              >
                Meskipun dengan latar belakang pendidikan SMA dengan jurusan IPA, saya menggabungkan keterampilan administratif dengan pengetahuan teknologi untuk menciptakan solusi yang efisien.
              </p>

              <p
                style={{
                  lineHeight: "1.8",
                  color: "#f0f0f0",
                }}
              >
                Saya aktif dalam kegiatan organisasi kampus sebagai sekretaris himpunan mahasiswa yang memberikan saya pengalaman dalam koordinasi tim dan manajemen proyek.
              </p>
            </div>
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: "4rem", ...fadeIn(0.5) }}>
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "2rem",
                color: "#90caf9",
              }}
            >
              Pendidikan
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {education.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    borderLeft: "4px solid #42a5f5",
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
                      color: "#90caf9",
                      fontSize: "0.9rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.period}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      marginBottom: "0.5rem",
                      color: "#f0f0f0",
                    }}
                  >
                    {item.degree}
                  </h3>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#d1d5db",
                    }}
                  >
                    {item.institution}
                  </div>
                  <p
                    style={{
                      color: "#9ca3af",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div style={{ marginBottom: "4rem", ...fadeIn(0.7) }}>
            <h2
              style={{
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "2rem",
                color: "#90caf9",
              }}
            >
              Pengalaman
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {experience.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    borderLeft: "4px solid #64b5f6",
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
                      color: "#90caf9",
                      fontSize: "0.9rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.period}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      marginBottom: "0.5rem",
                      color: "#f0f0f0",
                    }}
                  >
                    {item.role}
                  </h3>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#d1d5db",
                    }}
                  >
                    {item.organization}
                  </div>
                  <p
                    style={{
                      color: "#9ca3af",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.description}
                  </p>
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
            <Link href="/contact">
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
                Hubungi Saya
              </button>
            </Link>
          </div>
        </div>

        {/* Chat Button - Fixed Position */}
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 999,
          }}
        >
          <button
            onClick={() => setShowChat(!showChat)}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #42a5f5, #90caf9)",
              border: "none",
              boxShadow: "0 4px 15px rgba(66, 165, 245, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {showChat ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Chat Dialog */}
        {showChat && (
          <div
            style={{
              position: "fixed",
              bottom: "5rem",
              right: "2rem",
              width: "350px",
              height: "500px",
              zIndex: 998,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ChatBot />
          </div>
        )}

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

          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .profile-image {
            transition: transform 0.5s ease;
          }

          .profile-image:hover {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </>
  );
}