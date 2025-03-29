import React, { useEffect, useState } from "react";
import axios from "axios";

const Wisata = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://dadb-34-91-9-190.ngrok-free.app/rekomendasi")
      .then((response) => {
        console.log("Response Data:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Server merespons dengan status selain 2xx
          console.error("Server error:", error.response.status);
          console.log("Response:", error.response.data);
        } else if (error.request) {
          // Request dibuat tapi tidak ada respons
          console.error("No response received:", error.request);
        } else {
          // Error lainnya
          console.error("Error:", error.message);
        }
      });
  }, []);

  return (
    <div>
      <h1>Wisata</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Wisata;
