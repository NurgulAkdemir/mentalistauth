"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase-config";

import { useRouter } from "next/navigation";

export default function MoodEntryPage() {
  const [mood, setMood] = useState("");
  const router = useRouter();

  const handleSaveMood = async () => {
    if (mood.trim() === "") return;

    try {
      await addDoc(collection(db, "moods"), {
        mood: mood,
        timestamp: new Date(),
      });
      alert("Ruh hali kaydedildi!");
      setMood(""); // Formu temizle
      router.push("/"); // Kaydettikten sonra ana sayfaya dön
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ruh Hali Kaydı</h1>
      <input
        type="text"
        placeholder="Bugün nasıl hissediyorsun?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleSaveMood} style={{ padding: "10px 20px" }}>
        Kaydet
      </button>
    </div>
  );
}
