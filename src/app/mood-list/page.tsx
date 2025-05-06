"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase-config";

interface MoodEntry {
  id: string;
  mood: string;
  timestamp?: any;
}

export default function MoodListPage() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const moodsQuery = query(collection(db, "moods"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(moodsQuery);
        const moodData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MoodEntry[];
        setMoods(moodData);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ruh Hali Kayıtları</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : moods.length === 0 ? (
        <p>Henüz bir kayıt yok.</p>
      ) : (
        <ul>
          {moods.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.mood}</strong> <br />
              <small>{new Date(entry.timestamp?.seconds * 1000).toLocaleString()}</small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
