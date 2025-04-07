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
  searchInput: {
    padding: "10px",
    width: "300px",
    marginBottom: "20px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
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
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  pagination: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  pageButton: {
    padding: "6px 12px",
    borderRadius: "5px",
    border: "1px solid #007bff",
    backgroundColor: "#fff",
    color: "#007bff",
    cursor: "pointer",
  },
  activePage: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

const ITEMS_PER_PAGE = 6;
const kotaList = [
  "Bandung",
  "Makassar",
  "Yogyakarta",
  "Bali",
  "Aceh",
  "Surabaya",
  "Banjarmasin",
  "Jakarta",
];

const Wisata = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedKota, setSelectedKota] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://web-production-6737.up.railway.app/rekomendasi", {
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

  const handleBookmark = (item) => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/wisata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama: item["Nama Tempat Wisata"],
        kota: item.Kota,
        jenis: item["Jenis Wisata"],
        rating: item.Rating,
        deskripsi: item["Deskripsi Singkat"],
        user_id: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menyimpan bookmark!");
        return res.json();
      })
      .then((resData) => {
        alert("Berhasil ditambahkan ke bookmark!");
        console.log("Response:", resData);
        setData((prevData) =>
          prevData.filter(
            (d) => d["Nama Tempat Wisata"] !== item["Nama Tempat Wisata"]
          )
        );
      })
      .catch((err) => {
        console.error("Error saat menyimpan bookmark:", err);
        alert("Gagal menambahkan ke bookmark.");
      });
  };

  const filteredData = data.filter((item) =>
    selectedKota ? item.Kota.toLowerCase() === selectedKota.toLowerCase() : true
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
      end = Math.min(maxVisible, totalPages);
    } else if (currentPage > totalPages - 3) {
      start = Math.max(totalPages - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Rekomendasi Wisata</h1>

      <select
        style={styles.searchInput}
        value={selectedKota}
        onChange={(e) => {
          setSelectedKota(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">-- Pilih Kota --</option>
        {kotaList.map((kota, i) => (
          <option key={i} value={kota}>
            {kota}
          </option>
        ))}
      </select>

      {error ? (
        <p style={styles.error}>{error}</p>
      ) : currentItems.length > 0 ? (
        <>
          <div style={styles.grid}>
            {currentItems.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.title}>{item["Nama Tempat Wisata"]}</div>
                <div style={styles.detail}>
                  <strong>Kota:</strong> {item.Kota}
                </div>
                <div style={styles.detail}>
                  <strong>Jenis:</strong> {item["Jenis Wisata"]}
                </div>
                <div style={styles.detail}>
                  <strong>Rating:</strong> {item.Rating} ⭐
                </div>
                <div style={styles.detail}>
                  <strong>Deskripsi:</strong> {item["Deskripsi Singkat"]}
                </div>
                <button style={styles.button} onClick={() => handleBookmark(item)}>
                  Bookmark
                </button>
              </div>
            ))}
          </div>

          <div style={styles.pagination}>
            {currentPage > 1 && (
              <button style={styles.pageButton} onClick={() => setCurrentPage(currentPage - 1)}>
                Prev
              </button>
            )}
            {currentPage > 3 && (
              <button style={styles.pageButton} onClick={() => setCurrentPage(1)}>
                1
              </button>
            )}
            {currentPage > 4 && <span>...</span>}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                style={{
                  ...styles.pageButton,
                  ...(page === currentPage ? styles.activePage : {}),
                }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages - 3 && <span>...</span>}
            {currentPage < totalPages - 2 && (
              <button style={styles.pageButton} onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </button>
            )}
            {currentPage < totalPages && (
              <button style={styles.pageButton} onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Tidak ada data ditemukan.</p>
      )}
    </div>
  );
};

export default Wisata;
