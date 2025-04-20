// components/Rating.jsx
"use client";

import { useState, useEffect } from "react";
import { db } from "../app/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

export default function Rating({ pageId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  // Fetch ratings when component mounts
  useEffect(() => {
    fetchRatings();
  }, [pageId]);

  // Function to fetch and calculate average rating
  const fetchRatings = async () => {
    try {
      // Reference to ratings collection for this page
      const ratingsRef = collection(db, `ratings_${pageId}`);
      const q = query(ratingsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      let totalRating = 0;
      let count = 0;
      
      querySnapshot.forEach((doc) => {
        const ratingData = doc.data();
        totalRating += ratingData.value;
        count++;
      });
      
      if (count > 0) {
        setAverageRating(totalRating / count);
        setTotalVoters(count);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Silakan pilih rating terlebih dahulu"
      });
      return;
    }
    
    try {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Mengirim rating..."
      });
      
      // Add rating to Firestore
      await addDoc(collection(db, `ratings_${pageId}`), {
        value: rating,
        feedback: feedback,
        createdAt: serverTimestamp()
      });
      
      // Reset form and show success
      setFeedback("");
      
      setSubmitStatus({
        submitted: true,
        success: true,
        message: "Rating berhasil dikirim!"
      });
      
      // Refresh ratings after submission
      fetchRatings();
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus({
          submitted: false,
          success: false,
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      console.error("Error adding rating:", error);
      setSubmitStatus({
        submitted: true,
        success: false,
        message: "Gagal mengirim rating. Silakan coba lagi."
      });
    }
  };

  // Render stars for selection
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <span
        key={starValue}
        onMouseEnter={() => setHover(starValue)}
        onMouseLeave={() => setHover(0)}
        onClick={() => handleRatingClick(starValue)}
        style={{
          cursor: "pointer",
          fontSize: "2.5rem",
          color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
          marginRight: "0.5rem",
          transition: "color 0.2s ease"
        }}
      >
        ★
      </span>
    ));
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
          marginBottom: "1.5rem",
          color: "#90caf9",
        }}
      >
        Bagaimana Pengalaman Anda?
      </h2>

      {/* Display current average rating if available */}
      {totalVoters > 0 && (
        <div
          style={{
            marginBottom: "1.5rem",
            textAlign: "center",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            color: "#e0e7ff",
          }}
        >
          <p style={{ margin: 0, fontSize: "1.2rem" }}>
            Rating {averageRating.toFixed(1)} (from {totalVoters} voters)
          </p>
          <div style={{ marginTop: "0.5rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "1.5rem",
                  color: star <= Math.round(averageRating) ? "#ffc107" : "#e4e5e9",
                  marginRight: "0.3rem",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Rating selection stars */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        {renderStars()}
      </div>

      {/* Rating Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="feedback"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#d1d5db",
            }}
          >
            Feedback Anda (Opsional)
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
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
          {submitStatus.submitted ? submitStatus.message : "Kirim Rating"}
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
    </div>
  );
}