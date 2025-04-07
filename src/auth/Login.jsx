import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import bgImage from "../asset/bromo.jpg";

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  left: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
  },
  right: {
    flex: 1,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.875rem",
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    fontSize: "14px",
  },
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("user_id", res.data.user.id);
      localStorage.setItem("name", res.data.user.name);

      alert("Login berhasil!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Login</h2>

          {error && <p style={styles.error}>{error}</p>}

          <input
            style={styles.input}
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={form.email}
            required
          />

          <input
            style={styles.input}
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.linkText}>
            Belum punya akun? <Link to="/register">Ayo buat</Link>
          </p>
        </form>
      </div>

      <div style={styles.right}></div>
    </div>
  );
};

export default Login;
