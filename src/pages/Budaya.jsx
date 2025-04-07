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

const Budaya = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBudaya = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://rekomendasibudaya-production.up.railway.app/budaya",
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (!res.ok) throw new Error("Gagal fetch data!");

        const jsonData = await res.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudaya();
  }, []);

  const handleBookmark = async (item) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/budaya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          budaya: item.Budaya,
          kota: item.Kota,
          jenis: item.Jenis,
          rating: item.Rating,
          deskripsi: item.Deskripsi,
          user_id: localStorage.getItem("user_id"),
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan bookmark!");

      alert("Berhasil ditambahkan ke bookmark!");

      // Hapus dari tampilan setelah bookmark
      setData((prevData) =>
        prevData.filter(
          (d) => d["Nama Tempat Wisata"] !== item["Nama Tempat Wisata"]
        )
      );
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("Gagal menambahkan ke bookmark.");
    }
  };

  const filteredData = data.filter((item) =>
    item.Budaya?.toLowerCase().includes(search.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) end = Math.min(maxVisible, totalPages);
    else if (currentPage > totalPages - 3)
      start = Math.max(totalPages - maxVisible + 1, 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Budaya</h1>

      <input
        type="text"
        placeholder="Cari tempat wisata..."
        style={styles.searchInput}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {error ? (
        <p style={styles.error}>{error}</p>
      ) : loading ? (
        <p>Memuat data...</p>
      ) : currentItems.length > 0 ? (
        <>
          <div style={styles.grid}>
            {currentItems.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.title}>{item.Budaya}</div>
                <div style={styles.detail}>
                  <strong>Kota:</strong> {item.Kota}
                </div>
                <div style={styles.detail}>
                  <strong>Jenis:</strong> {item.Jenis}
                </div>
                <div style={styles.detail}>
                  <strong>Rating:</strong> {item.Rating} ⭐
                </div>
                <div style={styles.detail}>
                  <strong>Deskripsi:</strong> {item.Deskripsi}
                </div>
                <button
                  style={styles.button}
                  onClick={() => handleBookmark(item)}
                >
                  Bookmark
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={styles.pagination}>
            <button
              style={styles.pageButton}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {currentPage > 3 && (
              <>
                <button
                  style={styles.pageButton}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <span>...</span>
              </>
            )}

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

            {currentPage < totalPages - 2 && (
              <>
                <span>...</span>
                <button
                  style={styles.pageButton}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              style={styles.pageButton}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Tidak ada data ditemukan.</p>
      )}
    </div>
  );
};

export default Budaya;
