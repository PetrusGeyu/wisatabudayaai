import React, { useState, useEffect } from "react";

const Wisata = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dadb-34-91-9-190.ngrok-free.app/rekomendasi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      mode: "cors", // Optional, biasanya default untuk fetch cross-origin
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data!");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error("Error:", err);
        setError("Terjadi kesalahan saat mengambil data.");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rekomendasi Wisata</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
};

export default Wisata;
