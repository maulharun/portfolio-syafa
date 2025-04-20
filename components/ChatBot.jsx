"use client";
import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

  // Styles defined directly in the component
  const styles = {
    container: {
      position: "fixed",
      bottom: "px", // Move to very bottom of the page
      right: "0",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    chatButton: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ec4899 0%, #7e22ce 100%)",
      color: "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "none",
      cursor: "pointer",
      marginBottom: "20px", // Add space from bottom of screen
    },
    chatWindow: {
      width: "320px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      animation: "fadeInUp 0.3s ease-out",
      marginBottom: "10px",
    },
    header: {
      background: "linear-gradient(90deg, #db2777 0%, #7e22ce 100%)",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    headerAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
    },
    headerTitle: {
      margin: 0,
      color: "white",
      fontWeight: "500",
      fontSize: "16px",
    },
    headerSubtitle: {
      margin: 0,
      color: "#fce7f3",
      fontSize: "12px",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "rgba(255, 255, 255, 0.8)",
      cursor: "pointer",
      padding: "8px",
      marginLeft: "auto",
    },
    messagesArea: {
      height: "350px",
      overflowY: "auto",
      padding: "16px",
      backgroundColor: "#fdf2f8",
    },
    messageBubbleUser: {
      maxWidth: "75%",
      padding: "12px",
      borderRadius: "18px",
      background: "linear-gradient(135deg, #ec4899 0%, #7e22ce 100%)",
      color: "white",
      marginBottom: "16px",
      marginLeft: "auto",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    messageBubbleBot: {
      maxWidth: "75%",
      padding: "12px",
      borderRadius: "18px",
      backgroundColor: "white",
      color: "#1f2937",
      border: "1px solid #fbcfe8",
      marginBottom: "16px",
      marginRight: "auto",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    botRow: {
      display: "flex",
      marginBottom: "16px",
    },
    botAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #ec4899 0%, #7e22ce 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      marginRight: "8px",
      fontSize: "12px",
      flexShrink: 0,
    },
    inputArea: {
      borderTop: "1px solid #fbcfe8",
      padding: "12px",
      backgroundColor: "white",
    },
    form: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    emojiButton: {
      padding: "8px",
      borderRadius: "50%",
      color: "#ec4899",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    textInput: {
      flex: 1,
      padding: "8px 16px",
      backgroundColor: "#fdf2f8",
      border: "1px solid #fbcfe8",
      borderRadius: "9999px",
      outline: "none",
      fontSize: "14px",
    },
    sendButton: {
      padding: "8px",
      borderRadius: "50%",
      backgroundColor: "#ec4899",
      color: "white",
      border: "none",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    sendButtonDisabled: {
      padding: "8px",
      borderRadius: "50%",
      backgroundColor: "#e5e7eb",
      color: "#9ca3af",
      border: "none",
      cursor: "not-allowed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    suggestionArea: {
      padding: "8px 12px",
      backgroundColor: "white",
      borderTop: "1px solid #fbcfe8",
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      justifyContent: "center",
    },
    suggestionPill: {
      padding: "6px 12px",
      borderRadius: "9999px",
      backgroundColor: "#fce7f3",
      color: "#6b21a8",
      border: "1px solid #fbcfe8",
      fontSize: "12px",
      cursor: "pointer",
    },
    loadingDots: {
      display: "flex",
      gap: "4px",
    },
    dot1: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#ec4899",
      animation: "bounce 1s infinite",
    },
    dot2: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#db2777",
      animation: "bounce 1s infinite",
      animationDelay: "0.2s",
    },
    dot3: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#7e22ce",
      animation: "bounce 1s infinite",
      animationDelay: "0.4s",
    },
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();

    // Add greeting message on first load
    if (messages.length === 0) {
      setTimeout(() => {
        const greeting = {
          sender: "bot",
          text: `Selamat pagi! Saya asisten virtual Syafa. Apakah ada yang bisa saya bantu?`,
        };
        setMessages([greeting]);
      }, 800);
    }
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API response
      setTimeout(() => {
        const botResponse = getEnhancedResponse(input);
        const botMessage = { sender: "bot", text: botResponse };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "bot", text: "Maaf, ada kesalahan dalam memproses pesan Anda." };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  // Get greeting based on time of day
  const getGreetingByTime = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Selamat pagi";
    if (hour >= 12 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 19) return "Selamat sore";
    return "Selamat malam";
  };

  // Enhanced chatbot logic with more responses
  const getEnhancedResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // Greetings
    if (lowerMsg.includes("halo") || lowerMsg.includes("hai") || lowerMsg.includes("hi")) {
      return `${getGreetingByTime()}! Ada yang bisa saya bantu hari ini?`;
    }
    // Time-based greetings
    else if (lowerMsg.includes("pagi")) {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return "Selamat pagi juga! Semoga hari Anda menyenangkan!";
      } else {
        return `Saat ini sudah bukan pagi lagi. ${getGreetingByTime()}!`;
      }
    } else if (lowerMsg.includes("siang")) {
      const hour = new Date().getHours();
      if (hour >= 12 && hour < 15) {
        return "Selamat siang juga! Sudah makan siang?";
      } else {
        return `Saat ini sudah bukan siang lagi. ${getGreetingByTime()}!`;
      }
    } else if (lowerMsg.includes("sore")) {
      const hour = new Date().getHours();
      if (hour >= 15 && hour < 19) {
        return "Selamat sore juga! Semoga hari Anda menyenangkan!";
      } else {
        return `Saat ini sudah bukan sore lagi. ${getGreetingByTime()}!`;
      }
    } else if (lowerMsg.includes("malam")) {
      const hour = new Date().getHours();
      if ((hour >= 19 && hour <= 23) || (hour >= 0 && hour < 5)) {
        return "Selamat malam juga! Sudah waktunya istirahat?";
      } else {
        return `Saat ini sudah bukan malam lagi. ${getGreetingByTime()}!`;
      }
    }
    // Time related questions
    else if (lowerMsg.includes("jam") || lowerMsg.includes("waktu") || lowerMsg.includes("sekarang jam")) {
      const now = new Date();
      return `Sekarang jam ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} WIB.`;
    } else if (lowerMsg.includes("hari") && lowerMsg.includes("ini")) {
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const now = new Date();
      return `Hari ini adalah hari ${days[now.getDay()]}.`;
    } else if (lowerMsg.includes("tanggal")) {
      const now = new Date();
      return `Sekarang tanggal ${now.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][now.getMonth()]} ${now.getFullYear()}.`;
    }
    // About chatbot and Syafa
    else if (lowerMsg.includes("nama")) {
      return "Saya adalah SyafaBot, asisten virtual milik Syafa. Senang berkenalan dengan Anda!";
    } else if (lowerMsg.includes("syafa")) {
      return "Syafa adalah seorang mahasiswa semester 4 yang memiliki ketertarikan di bidang administrasi dan teknologi informasi.";
    } else if (lowerMsg.includes("skill") || lowerMsg.includes("kemampuan")) {
      return "Syafa memiliki kemampuan dalam Microsoft Office, administrasi, manajemen, dan aktif berorganisasi. Dia juga tertarik pada pengembangan diri dan teknologi terbaru.";
    } else if (lowerMsg.includes("kontak") || lowerMsg.includes("hubungi")) {
      return "Anda dapat menghubungi Syafa melalui halaman Contact atau email di syafanurapril@gmail.com";
    }
    // Weather (simulated)
    else if (lowerMsg.includes("cuaca")) {
      return "Maaf, saya tidak memiliki akses ke data cuaca terkini. Namun Anda bisa mengeceknya melalui layanan cuaca online.";
    }
    // Fun responses
    else if (lowerMsg.includes("lucu") || lowerMsg.includes("joke") || lowerMsg.includes("humor")) {
      const jokes = [
        "Mengapa seekor komputer tidak pernah haus? Karena sudah ada Windows!",
        "Apa bedanya programmer dengan tukang service AC? Tukang AC memperbaiki bug, programmer membuat bug.",
        "Bagaimana cara menangkap kucing yang unik? Unique!",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    // Emotional support
    else if (lowerMsg.includes("sedih") || lowerMsg.includes("kesal") || lowerMsg.includes("marah")) {
      return "Saya mengerti perasaan Anda. Terkadang kita perlu waktu untuk menenangkan diri. Mungkin Anda bisa mencoba aktivitas yang menyenangkan untuk memperbaiki suasana hati?";
    } else if (lowerMsg.includes("senang") || lowerMsg.includes("bahagia") || lowerMsg.includes("sukses")) {
      return "Saya turut senang mendengarnya! Semoga hari-hari Anda selalu dipenuhi kebahagiaan.";
    }
    // Gratitude
    else if (lowerMsg.includes("terima kasih") || lowerMsg.includes("makasih") || lowerMsg.includes("thanks")) {
      return "Sama-sama! Senang bisa membantu. Ada yang bisa saya bantu lagi?";
    }
    // Default response
    else {
      const defaultResponses = [
        "Maaf, saya tidak mengerti. Bisa dijelaskan lebih spesifik?",
        "Hmm, saya masih belajar. Bisa sampaikan dengan cara lain?",
        "Maaf, saya tidak memahami pertanyaan Anda. Coba tanyakan tentang Syafa, waktu, atau hal lainnya.",
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  return (
    <div style={styles.container}>
      {/* Chat container */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerAvatar}>
              <span>S</span>
            </div>
            <div>
              <h2 style={styles.headerTitle}>Syafa Bot</h2>
              <p style={styles.headerSubtitle}>Asisten virtual Syafa</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div style={styles.messagesArea}>
            {messages.map((msg, i) =>
              msg.sender === "user" ? (
                <div key={i} style={styles.messageBubbleUser}>
                  <p style={{ margin: 0, fontSize: "14px" }}>{msg.text}</p>
                </div>
              ) : (
                <div key={i} style={styles.botRow}>
                  <div style={styles.botAvatar}>
                    <span>S</span>
                  </div>
                  <div style={styles.messageBubbleBot}>
                    <p style={{ margin: 0, fontSize: "14px" }}>{msg.text}</p>
                  </div>
                </div>
              )
            )}

            {isLoading && (
              <div style={styles.botRow}>
                <div style={styles.botAvatar}>
                  <span>S</span>
                </div>
                <div style={styles.messageBubbleBot}>
                  <div style={styles.loadingDots}>
                    <div style={styles.dot1}></div>
                    <div style={styles.dot2}></div>
                    <div style={styles.dot3}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={styles.inputArea}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <button type="button" style={styles.emojiButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <input type="text" style={styles.textInput} placeholder="Ketik pesan..." value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" disabled={isLoading || !input.trim()} style={input.trim() ? styles.sendButton : styles.sendButtonDisabled}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>

          {/* Suggestion pills */}
          <div style={styles.suggestionArea}>
            {["Jam berapa sekarang?", "Hari apa ini?", "Ceritakan tentang Syafa", "Selamat pagi!"].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(suggestion);
                  setTimeout(() => {
                    const event = new Event("submit", { cancelable: true, bubbles: true });
                    document.querySelector("form")?.dispatchEvent(event);
                  }, 10);
                }}
                style={styles.suggestionPill}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat toggle button */}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.chatButton}>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
