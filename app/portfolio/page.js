"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "/components/Navbar"; // Import the Navbar component

export default function PortfolioPage() {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s ease ${delay}s`,
  });

  const projects = [
    {
      id: 1,
      title: "On Scroll Animation",
      category: "mobile",
      image: "/Projeck1.jpg", // This would need to exist in your public folder
      description: "Animasi zoom-in atau zoom-out .",
      technologies: ["Node.js"],
      link: "https://challenge-nay.vercel.app/",
    },
    {
      id: 2,
      title: "UI Manage Profil Kelas",
      category: "mobile",
      image: "/project2.jpg",
      description: "Buat UI berupa card untuk setiap kelas",
      technologies: ["Node.js"],
      link: "https://challenge3-2.vercel.app/",
    },
    {
      id: 3,
      title: "Routing dengan Next Link",
      category: "mobile",
      image: "/project3.jpg",
      description: "Routing di Next JS dengan Next Link!",
      technologies: ["Node.js"],
      link: "https://chellenge3.vercel.app/",
    },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <Navbar /> {/* Add the Navbar component here */}
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
              Portfolio Proyek
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
              Berikut adalah kumpulan proyek yang telah saya kerjakan dalam bidang pengembangan web, aplikasi mobile, dan desain grafis.
            </p>
          </div>

          {/* Filter Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
              ...fadeIn(0.3),
            }}
          >
            {["all", "web", "mobile", "design"].map((category, index) => (
              <button
                key={index}
                onClick={() => setFilter(category)}
                style={{
                  padding: "0.6rem 1.5rem",
                  background: filter === category ? "linear-gradient(45deg, #42a5f5, #90caf9)" : "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: filter === category ? "0 4px 15px rgba(144, 202, 249, 0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (filter !== category) {
                    e.currentTarget.style.background = "rgba(144, 202, 249, 0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== category) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {category === "all" ? "Semua" : category === "web" ? "Web Development" : category === "mobile" ? "Mobile App" : "Desain Grafis"}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
              marginBottom: "4rem",
              ...fadeIn(0.5),
            }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  animation: `fadeInUp 0.8s ease ${0.2 + index * 0.1}s backwards`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div
                  style={{
                    height: "200px",
                    width: "100%",
                    position: "relative",
                    background: "#2a3441", // Placeholder color
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      color: "#42a5f5",
                      opacity: 0.5,
                    }}
                  >
                    {project.category === "web" ? "🌐" : project.category === "mobile" ? "📱" : "🎨"}
                  </div>

                  {/* You would replace this with an actual image in production */}
                  {/* <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                  /> */}
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      background: "rgba(144, 202, 249, 0.1)",
                      color: "#90caf9",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.category === "web" ? "Web Development" : project.category === "mobile" ? "Mobile App" : "Desain Grafis"}
                  </span>

                  <h3
                    style={{
                      fontSize: "1.3rem",
                      marginBottom: "0.75rem",
                      color: "#f0f0f0",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      color: "#9ca3af",
                      marginBottom: "1.5rem",
                      lineHeight: "1.6",
                      minHeight: "80px",
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: "0.2rem 0.5rem",
                          background: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          color: "#d1d5db",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    style={{
                      padding: "0.5rem 1.25rem",
                      background: "transparent",
                      color: "#90caf9",
                      border: "1px solid #90caf9",
                      borderRadius: "30px",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(144, 202, 249, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal */}
          {selectedProject && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
                padding: "2rem",
                animation: "fadeIn 0.3s ease-out",
              }}
              onClick={() => setSelectedProject(null)}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #1f2937, #111827)",
                  borderRadius: "16px",
                  width: "100%",
                  maxWidth: "900px",
                  maxHeight: "90vh",
                  overflow: "auto",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                  animation: "zoomIn 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    height: "300px",
                    width: "100%",
                    position: "relative",
                    background: "#2a3441",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      fontSize: "5rem",
                      color: "#42a5f5",
                      opacity: 0.5,
                    }}
                  >
                    {selectedProject.category === "web" ? "🌐" : selectedProject.category === "mobile" ? "📱" : "🎨"}
                  </div>

                  {/* <Image 
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    style={{ objectFit: "cover" }}
                  /> */}
                </div>

                <div style={{ padding: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "2rem",
                        color: "#f0f0f0",
                      }}
                    >
                      {selectedProject.title}
                    </h2>

                    <button
                      onClick={() => setSelectedProject(null)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#9ca3af",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#f0f0f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#9ca3af";
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        background: "rgba(144, 202, 249, 0.1)",
                        color: "#90caf9",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {selectedProject.category === "web" ? "Web Development" : selectedProject.category === "mobile" ? "Mobile App" : "Desain Grafis"}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#d1d5db",
                      marginBottom: "2rem",
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                    }}
                  >
                    {selectedProject.description}
                  </p>

                  <div
                    style={{
                      marginBottom: "2rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        marginBottom: "1rem",
                        color: "#90caf9",
                      }}
                    >
                      Teknologi yang Digunakan
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      {selectedProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: "0.4rem 1rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            color: "#f0f0f0",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.75rem 2rem",
                      background: "linear-gradient(45deg, #42a5f5, #90caf9)",
                      color: "#fff",
                      borderRadius: "30px",
                      fontSize: "1rem",
                      textDecoration: "none",
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
                    Lihat Proyek
                  </a>
                </div>
              </div>
            </div>
          )}
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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
