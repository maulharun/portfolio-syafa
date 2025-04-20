"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "/components/Navbar";
import Rating from "/components/Rating"; // Import the Rating component
import CommentSection from "/components/CommentSection";
import ChatBot from "/components/ChatBot"; // Import the ChatBot component

export default function ContactPage() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    console.log("Form submitted:", formData);
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset form submitted state after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }, 500);
  };

  const fadeIn = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s ease ${delay}s`,
  });

  const socialLinks = [
    {
      name: "Instagram",
      icon: "📸",
      url: "https://instagram.com/syafanuraprily",
      color: "#e1306c"
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/syafanuraprily",
      color: "#1da1f2"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/syafanuraprily",
      color: "#0077b5"
    },
    {
      name: "GitHub",
      icon: "👨‍💻",
      url: "https://github.com/syafanuraprily",
      color: "#6e5494"
    }
  ];

  return (
    <>
      {/* Add the Navbar component here */}
      <Navbar />
      
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
              Hubungi Saya
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
              Jika Anda ingin berbicara lebih lanjut tentang proyek, kesempatan kerja sama, atau sekadar bertemu, silakan hubungi saya melalui formulir di bawah atau media sosial saya.
            </p>
          </div>

          {/* Contact Section */}
          <div 
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "3rem",
              marginBottom: "4rem",
              ...fadeIn(0.3),
            }}
          >
            {/* Contact Info */}
            <div
              style={{
                flex: "1 1 300px",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  marginBottom: "2rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                    color: "#90caf9",
                  }}
                >
                  Informasi Kontak
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
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
                        fontSize: "1.2rem",
                      }}
                    >
                      📧
                    </div>
                    <div>
                      <div style={{ color: "#9ca3af", marginBottom: "0.25rem" }}>Email</div>
                      <div style={{ color: "#f0f0f0" }}>syafanurapril@gmail.com</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
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
                        fontSize: "1.2rem",
                      }}
                    >
                      📱
                    </div>
                    <div>
                      <div style={{ color: "#9ca3af", marginBottom: "0.25rem" }}>Telepon</div>
                      <div style={{ color: "#f0f0f0" }}>+62 853 4567 8901</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
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
                        fontSize: "1.2rem",
                      }}
                    >
                      📍
                    </div>
                    <div>
                      <div style={{ color: "#9ca3af", marginBottom: "0.25rem" }}>Lokasi</div>
                      <div style={{ color: "#f0f0f0" }}>Bandung, Jawa Barat</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
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
                  Media Sosial
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  {socialLinks.map((social, index) => (
                   <a
                   key={index}
                   href={social.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "0.75rem",
                     padding: "0.75rem 1rem",
                     borderRadius: "8px",
                     background: `rgba(${social.color}, 0.1)`,
                     color: "#f0f0f0",
                     textDecoration: "none",
                     transition: "all 0.3s ease",
                     flex: "1 1 calc(50% - 0.5rem)",
                     minWidth: "130px",
                   }}
                   onMouseOver={(e) => {
                     e.currentTarget.style.background = `rgba(${social.color}, 0.2)`;
                     e.currentTarget.style.transform = "translateY(-3px)";
                   }}
                   onMouseOut={(e) => {
                     e.currentTarget.style.background = `rgba(${social.color}, 0.1)`;
                     e.currentTarget.style.transform = "translateY(0)";
                   }}
                 >
                   <span style={{ fontSize: "1.5rem" }}>{social.icon}</span>
                   <span>{social.name}</span>
                 </a>
               ))}
             </div>
           </div>
         </div>

         {/* Contact Form */}
         <div
           style={{
             flex: "1 1 500px",
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
             Kirim Pesan
           </h2>

           {formSubmitted ? (
             <div
               style={{
                 textAlign: "center",
                 padding: "2rem",
                 animation: "fadeIn 0.5s ease",
               }}
             >
               <div
                 style={{
                   width: "60px",
                   height: "60px",
                   borderRadius: "50%",
                   background: "rgba(72, 187, 120, 0.2)",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   fontSize: "2rem",
                   margin: "0 auto 1rem auto",
                 }}
               >
                 ✓
               </div>
               <h3
                 style={{
                   fontSize: "1.5rem",
                   marginBottom: "1rem",
                   color: "#48bb78",
                 }}
               >
                 Terima Kasih!
               </h3>
               <p style={{ color: "#d1d5db", marginBottom: "1rem" }}>
                 Pesan Anda telah terkirim. Saya akan segera menghubungi Anda kembali.
               </p>
             </div>
           ) : (
             <form onSubmit={handleSubmit}>
               <div
                 style={{
                   display: "grid",
                   gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                   gap: "1rem",
                   marginBottom: "1.5rem",
                 }}
               >
                 <div>
                   <label
                     htmlFor="name"
                     style={{
                       display: "block",
                       marginBottom: "0.5rem",
                       color: "#d1d5db",
                     }}
                   >
                     Nama
                   </label>
                   <input
                     id="name"
                     name="name"
                     type="text"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     style={{
                       width: "100%",
                       padding: "0.75rem 1rem",
                       borderRadius: "8px",
                       background: "rgba(255, 255, 255, 0.07)",
                       border: "1px solid rgba(255, 255, 255, 0.1)",
                       color: "#f0f0f0",
                       fontSize: "1rem",
                       transition: "all 0.3s ease",
                     }}
                     onFocus={(e) => {
                       e.target.style.borderColor = "rgba(144, 202, 249, 0.5)";
                       e.target.style.boxShadow = "0 0 0 2px rgba(144, 202, 249, 0.25)";
                     }}
                     onBlur={(e) => {
                       e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                       e.target.style.boxShadow = "none";
                     }}
                   />
                 </div>

                 <div>
                   <label
                     htmlFor="email"
                     style={{
                       display: "block",
                       marginBottom: "0.5rem",
                       color: "#d1d5db",
                     }}
                   >
                     Email
                   </label>
                   <input
                     id="email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     style={{
                       width: "100%",
                       padding: "0.75rem 1rem",
                       borderRadius: "8px",
                       background: "rgba(255, 255, 255, 0.07)",
                       border: "1px solid rgba(255, 255, 255, 0.1)",
                       color: "#f0f0f0",
                       fontSize: "1rem",
                       transition: "all 0.3s ease",
                     }}
                     onFocus={(e) => {
                       e.target.style.borderColor = "rgba(144, 202, 249, 0.5)";
                       e.target.style.boxShadow = "0 0 0 2px rgba(144, 202, 249, 0.25)";
                     }}
                     onBlur={(e) => {
                       e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                       e.target.style.boxShadow = "none";
                     }}
                   />
                 </div>
               </div>

               <div style={{ marginBottom: "1.5rem" }}>
                 <label
                   htmlFor="subject"
                   style={{
                     display: "block",
                     marginBottom: "0.5rem",
                     color: "#d1d5db",
                   }}
                 >
                   Subjek
                 </label>
                 <input
                   id="subject"
                   name="subject"
                   type="text"
                   value={formData.subject}
                   onChange={handleChange}
                   required
                   style={{
                     width: "100%",
                     padding: "0.75rem 1rem",
                     borderRadius: "8px",
                     background: "rgba(255, 255, 255, 0.07)",
                     border: "1px solid rgba(255, 255, 255, 0.1)",
                     color: "#f0f0f0",
                     fontSize: "1rem",
                     transition: "all 0.3s ease",
                   }}
                   onFocus={(e) => {
                     e.target.style.borderColor = "rgba(144, 202, 249, 0.5)";
                     e.target.style.boxShadow = "0 0 0 2px rgba(144, 202, 249, 0.25)";
                   }}
                   onBlur={(e) => {
                     e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                     e.target.style.boxShadow = "none";
                   }}
                 />
               </div>

               <div style={{ marginBottom: "2rem" }}>
                 <label
                   htmlFor="message"
                   style={{
                     display: "block",
                     marginBottom: "0.5rem",
                     color: "#d1d5db",
                   }}
                 >
                   Pesan
                 </label>
                 <textarea
                   id="message"
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   required
                   rows={5}
                   style={{
                     width: "100%",
                     padding: "0.75rem 1rem",
                     borderRadius: "8px",
                     background: "rgba(255, 255, 255, 0.07)",
                     border: "1px solid rgba(255, 255, 255, 0.1)",
                     color: "#f0f0f0",
                     fontSize: "1rem",
                     transition: "all 0.3s ease",
                     resize: "vertical",
                   }}
                   onFocus={(e) => {
                     e.target.style.borderColor = "rgba(144, 202, 249, 0.5)";
                     e.target.style.boxShadow = "0 0 0 2px rgba(144, 202, 249, 0.25)";
                   }}
                   onBlur={(e) => {
                     e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                     e.target.style.boxShadow = "none";
                   }}
                 />
               </div>

               <button
                 type="submit"
                 style={{
                   width: "100%",
                   padding: "0.85rem 1rem",
                   borderRadius: "8px",
                   background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
                   color: "#ffffff",
                   fontSize: "1rem",
                   fontWeight: "500",
                   border: "none",
                   cursor: "pointer",
                   transition: "all 0.3s ease",
                 }}
                 onMouseOver={(e) => {
                   e.target.style.transform = "translateY(-2px)";
                   e.target.style.boxShadow = "0 4px 12px rgba(66, 165, 245, 0.4)";
                 }}
                 onMouseOut={(e) => {
                   e.target.style.transform = "translateY(0)";
                   e.target.style.boxShadow = "none";
                 }}
               >
                 Kirim Pesan
               </button>
             </form>
           )}
         </div>
       </div>

       {/* Rating Component - Added here */}
       <div style={fadeIn(0.4)}>
         <Rating />
       </div>

       {/* FAQ Section */}
       <div style={fadeIn(0.5)}>
         <h2
           style={{
             fontSize: "2rem",
             fontWeight: "bold",
             textAlign: "center",
             marginBottom: "2rem",
             color: "#90caf9",
           }}
         >
     
         </h2>

         <div
           style={{
             display: "grid",
             gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
             gap: "1.5rem",
             marginBottom: "3rem",
           }}
         >
           {[
             
          ].map((faq, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  marginBottom: "0.75rem",
                  color: "#90caf9",
                }}
              >
                {faq.question}
              </h3>
              <p style={{ color: "#d1d5db", lineHeight: "1.6" }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <div style={fadeIn(0.6)}>
        <CommentSection />
      </div>

      {/* Map Section */}
      <div style={fadeIn(0.7)}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#90caf9",
          }}
        >
          Lokasi Saya
        </h2>

        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "3rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* In a real app, you would integrate a map API here */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#9ca3af",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              🗺️
            </div>
            <p>Peta Lokasi Bandung, Jawa Barat</p>
            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
              (Integrasi peta akan ditampilkan di sini)
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
          ...fadeIn(0.8),
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            background: "linear-gradient(45deg, #90caf9, #42a5f5, #64b5f6)",
            backgroundSize: "200% auto",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s infinite linear",
          }}
        >
          Mari Bekerja Sama
        </h2>
        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto 2rem auto",
            fontSize: "1.1rem",
            lineHeight: "1.7",
            color: "#d1d5db",
          }}
        >
          Saya selalu terbuka untuk diskusi proyek baru dan kesempatan berkolaborasi. Jangan ragu untuk menghubungi saya kapan saja.
        </p>
        <Link
          href="/portfolio"
          style={{
            display: "inline-block",
            padding: "0.85rem 2rem",
            borderRadius: "8px",
            background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(66, 165, 245, 0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          Lihat Portfolio Saya
        </Link>
      </div>
    </div>
  </div>

  {/* Add ChatBot component */}
  <ChatBot />

  {/* Add global styles */}
  <style jsx global>{`
    @keyframes gradientFlow {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
    
    @keyframes shimmer {
      0% { background-position: 0% 50% }
      100% { background-position: 200% 50% }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Fix the social media links color issue */
    a[style*="rgba("] {
      background: rgba(255, 255, 255, 0.1) !important;
    }
    
    a[style*="rgba("]:hover {
      background: rgba(255, 255, 255, 0.2) !important;
    }
  `}</style>
</>
);
}