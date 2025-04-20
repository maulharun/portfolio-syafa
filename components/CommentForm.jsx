// /src/components/CommentForm.jsx

import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "comments"), {
        text: comment,
        createdAt: new Date(),
      });
      alert("Komentar berhasil disimpan!");
      setComment("");
    } catch (error) {
      console.error("Gagal simpan:", error);
      alert("Gagal simpan komentar!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis komentar di sini..."
      />
      <button type="submit">Kirim</button>
    </form>
  );
};

export default CommentForm;
