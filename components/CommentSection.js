// components/CommentSection.js
"use client";

import { useState, useEffect } from "react";
import { db } from "../app/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export default function CommentSection({ pageId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
    rating: 0
  });
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    count: 0
  });
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Mengambil komentar dan rating stats dari Firebase saat komponen dimuat
  useEffect(() => {
    fetchComments();
    fetchRatingStats();
  }, [pageId]);

  // Fungsi untuk mengambil komentar dari Firebase
  const fetchComments = async () => {
    try {
      setLoading(true);
      // Referensi koleksi dengan pageId untuk memisahkan komentar per halaman
      const commentsRef = collection(db, `comments_${pageId}`);
      // Query untuk mengurutkan komentar berdasarkan waktu terbaru
      const q = query(commentsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const commentsData = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });
      
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil statistik rating
  const fetchRatingStats = async () => {
    try {
      const ratingRef = doc(db, "ratings", `page_${pageId}`);
      const docSnap = await getDoc(ratingRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRatingStats({
          average: data.averageRating || 0,
          count: data.ratingCount || 0
        });
      } else {
        // Jika belum ada dokumen rating, buat yang baru
        await setDoc(ratingRef, {
          averageRating: 0,
          ratingCount: 0,
          totalRating: 0
        });
        setRatingStats({
          average: 0,
          count: 0
        });
      }
    } catch (error) {
      console.error("Error fetching rating stats:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    setFormData(prevState => ({
      ...prevState,
      rating: rating
    }));
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Silakan pilih rating bintang terlebih dahulu"
      });
      
      setTimeout(() => {
        setSubmitStatus({
          submitted: false,
          success: false,
          message: ""
        });
      }, 3000);
      
      return;
    }
    
    try {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Mengirim komentar..."
      });
      
      // Tambahkan komentar ke Firestore
      await addDoc(collection(db, `comments_${pageId}`), {
        nama: formData.nama,
        email: formData.email,
        pesan: formData.pesan,
        rating: formData.rating,
        createdAt: serverTimestamp() // Menggunakan serverTimestamp untuk konsistensi
      });
      
      // Update rating statistics
      const ratingRef = doc(db, "ratings", `page_${pageId}`);
      const docSnap = await getDoc(ratingRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newTotalRating = (data.totalRating || 0) + formData.rating;
        const newRatingCount = (data.ratingCount || 0) + 1;
        const newAverage = parseFloat((newTotalRating / newRatingCount).toFixed(1));
        
        await updateDoc(ratingRef, {
          totalRating: newTotalRating,
          ratingCount: newRatingCount,
          averageRating: newAverage
        });
        
        setRatingStats({
          average: newAverage,
          count: newRatingCount
        });
      } else {
        // Jika belum ada dokumen rating, buat yang baru
        await setDoc(ratingRef, {
          averageRating: formData.rating,
          ratingCount: 1,
          totalRating: formData.rating
        });
        
        setRatingStats({
          average: formData.rating,
          count: 1
        });
      }
      
      // Reset form dan tampilkan sukses
      setFormData({
        nama: "",
        email: "",
        pesan: "",
        rating: 0
      });
      setUserRating(0);
      
      setSubmitStatus({
        submitted: true,
        success: true,
        message: "Komentar dan rating berhasil dikirim!"
      });
      
      // Refresh komentar setelah mengirim
      fetchComments();
      
      // Reset status sukses setelah 3 detik
      setTimeout(() => {
        setSubmitStatus({
          submitted: false,
          success: false,
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      console.error("Error adding comment and rating:", error);
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Gagal mengirim komentar. Silakan coba lagi."
      });
    }
  };

  // Component untuk star rating
  const StarRating = ({ value, hoverValue, onChange, onHover, onLeave }) => {
    return (
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem",
          marginBottom: "1.5rem" 
        }}
        onMouseLeave={onLeave}
      >
        <div style={{ display: "flex" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => onChange(star)}
              onMouseEnter={() => onHover(star)}
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: (hoverValue || value) >= star ? "#FFD700" : "#555555",
                transition: "color 0.2s ease"
              }}
            >
              ★
            </span>
          ))}
        </div>
        {(hoverValue > 0 || value > 0) && (
          <span style={{ color: "#d1d5db", marginLeft: "0.5rem" }}>
            {hoverValue || value}/5
          </span>
        )}
      </div>
    );
  };

  return (
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
          marginBottom: "1rem",
          color: "#90caf9",
        }}
      >
        Komentar & Rating
      </h2>

      {/* Rating Summary */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.03)",
        }}
      >
        <div 
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#FFD700",
            marginRight: "1rem",
          }}
        >
          {ratingStats.average}
        </div>
        <div>
          <div style={{ display: "flex", marginBottom: "0.5rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "1.5rem",
                  color: ratingStats.average >= star 
                    ? "#FFD700" 
                    : ratingStats.average >= star - 0.5 
                      ? "#FFD700" 
                      : "#555555"
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div style={{ color: "#d1d5db", fontSize: "0.9rem" }}>
            Rating {ratingStats.average.toFixed(1)} (from {ratingStats.count} voters)
          </div>
        </div>
      </div>

      {/* Form Komentar dengan Rating */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#d1d5db",
            }}
          >
            Beri Rating <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <StarRating
            value={userRating}
            hoverValue={hoverRating}
            onChange={handleRatingChange}
            onHover={handleRatingHover}
            onLeave={handleRatingLeave}
          />
        </div>

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
              htmlFor="nama"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#d1d5db",
              }}
            >
              Nama <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              id="nama"
              name="nama"
              type="text"
              value={formData.nama}
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
              Email <span style={{ color: "#ef4444" }}>*</span>
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
            htmlFor="pesan"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#d1d5db",
            }}
          >
            Pesan <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <textarea
            id="pesan"
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            required
            rows={4}
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
          disabled={submitStatus.submitted && !submitStatus.success}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            opacity: (submitStatus.submitted && !submitStatus.success) ? "0.7" : "1",
          }}
          onMouseOver={(e) => {
            if (!submitStatus.submitted || submitStatus.success) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(66, 165, 245, 0.4)";
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          {submitStatus.submitted ? submitStatus.message : "Kirim Komentar & Rating"}
        </button>
      </form>

      {/* Status Message */}
      {submitStatus.submitted && (
        <div 
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "8px",
            background: submitStatus.success 
              ? "rgba(72, 187, 120, 0.1)" 
              : "rgba(239, 68, 68, 0.1)",
            color: submitStatus.success ? "#48bb78" : "#ef4444",
            textAlign: "center",
          }}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Comments List */}
      <div style={{ marginTop: "3rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            marginBottom: "1.5rem",
            color: "#90caf9",
          }}
        >
          Komentar Terbaru
        </h3>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <p style={{ color: "#d1d5db" }}>Memuat komentar...</p>
          </div>
        ) : comments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <p style={{ color: "#d1d5db" }}>Belum ada komentar. Jadilah yang pertama!</p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      margin: "0",
                      color: "#e0e7ff",
                    }}
                  >
                    {comment.nama}
                  </h4>
                  <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                    {comment.createdAt ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString() : "Baru saja"}
                  </span>
                </div>
                
                {/* Individual comment rating */}
                {comment.rating && (
                  <div style={{ 
                    display: "flex", 
                    marginBottom: "0.75rem",
                    color: "#FFD700"
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} style={{ fontSize: "1rem" }}>
                        {star <= comment.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                )}
                
                <p
                  style={{
                    margin: "0",
                    color: "#d1d5db",
                    lineHeight: "1.6",
                  }}
                >
                  {comment.pesan}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}