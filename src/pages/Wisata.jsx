import React, { useState, useEffect } from "react";

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  detail: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  error: {
    color: "red",
    fontSize: "16px",
  },
};

const Wisata = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://4faa-34-91-9-190.ngrok-free.app/rekomendasi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      mode: "cors",
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
    <div style={styles.container}>
      <h1 style={styles.heading}>Rekomendasi Wisata</h1>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : data.length > 0 ? (
        <div style={styles.grid}>
          {data.map((item, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.title}>{item["Nama Tempat Wisata"]}</div>
              <div style={styles.detail}><strong>Kota:</strong> {item.Kota}</div>
              <div style={styles.detail}><strong>Jenis:</strong> {item["Jenis Wisata"]}</div>
              <div style={styles.detail}><strong>Rating:</strong> {item.Rating} ⭐</div>
              <div style={styles.detail}><strong>Deskripsi:</strong> {item["Deskripsi Singkat"]}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
};

export default Wisata;
