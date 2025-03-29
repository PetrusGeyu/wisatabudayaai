import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validasi manual
    if (!form.name || !form.email || !form.password || !form.checkPassword) {
      setErrors({ form: "Semua kolom harus diisi!" });
      return;
    }

    if (form.password.length < 6) {
      setErrors({ password: "Password minimal 6 karakter" });
      return;
    }

    if (form.password !== form.checkPassword) {
      setErrors({ checkPassword: "Password tidak cocok" });
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);

      alert("Registrasi berhasil!");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Terjadi kesalahan";
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>Daftar Akun</h2>

        <input
          name="name"
          placeholder="Nama Lengkap"
          type="text"
          onChange={handleChange}
          style={styles.input}
          required
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          style={styles.input}
          required
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          style={styles.input}
          required
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <input
          name="checkPassword"
          placeholder="Konfirmasi Password"
          type="password"
          onChange={handleChange}
          style={styles.input}
          required
        />
        {errors.checkPassword && (
          <p style={styles.error}>{errors.checkPassword}</p>
        )}

        {errors.form && <p style={styles.error}>{errors.form}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Loading..." : "Register"}
        </button>

        <p style={styles.linkText}>
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.875rem",
    marginBottom: "10px",
  },
  linkText: {
    textAlign: "center",
    marginTop: "15px",
  },
};

export default Register;

