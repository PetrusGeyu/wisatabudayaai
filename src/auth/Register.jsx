import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import bgImage from "../asset/bromo.jpg";

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
    flexDirection: "row",
  },
  left: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    zIndex: 2,
  },
  right: {
    flex: 1,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity 0.3s ease",
  },
  form: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
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
  linkText: {
    textAlign: "center",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "0.875rem",
    textAlign: "center",
  },
  responsiveWrapper: {
    flexDirection: "column",
  },
  responsiveRight: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    opacity: 0.3,
  },
};

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.checkPassword) {
      setError("Password tidak cocok!");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("auth/register", form);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.wrapper,
        ...(isMobile && styles.responsiveWrapper),
      }}
    >
      {isMobile && <div style={styles.responsiveRight}></div>}

      <div style={styles.left}>
        <form onSubmit={handleRegister} style={styles.form}>
          <h2 style={styles.title}>Sign Up</h2>
          {error && <p style={styles.error}>{error}</p>}
          <input
            name="name"
            placeholder="Name"
            type="text"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="checkPassword"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Loading..." : "Sign up"}
          </button>
          <p style={styles.linkText}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>

      {!isMobile && <div style={styles.right}></div>}
    </div>
  );
};

export default Register;
