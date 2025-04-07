import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
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
    textAlign: "left",
  },
  linkText: {
    textAlign: "center",
    fontSize: "14px",
  },
};

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
    setLoading(true);
    setErrors({});

    if (!form.name || !form.email || !form.password || !form.checkPassword) {
      setErrors({ form: "Semua kolom harus diisi!" });
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setErrors({ password: "Password minimal 6 karakter" });
      setLoading(false);
      return;
    }

    if (form.password !== form.checkPassword) {
      setErrors({ checkPassword: "Password tidak cocok" });
      setLoading(false);
      return;
    }

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Terjadi kesalahan";
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <form onSubmit={handleRegister} style={styles.form}>
          <h2 style={styles.title}>Sign Up</h2>

          <input
            name="name"
            placeholder="Name"
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
            placeholder="Confirm Password"
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
            {loading ? "Loading..." : "Sign up"}
          </button>

          <p style={styles.linkText}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>

      <div style={styles.right}></div>
    </div>
  );
};

export default Register;
