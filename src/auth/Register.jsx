import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import bgImage from "../asset/bromo.jpg";
import axios from "axios";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f2f2f2",
    fontFamily: "sans-serif",
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "block",
  },
  form: {
    width: "100%",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "10px",
    color: "#111827",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "12px 40px 12px 12px",
    border: "1px solid #d7d7d7",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    color: "#111827",
    transition: "border-color 0.3s",
  },
  iconRight: {
    position: "absolute",
    right: "10px",
    color: "#d7d7d7",
    fontSize: "18px",
    pointerEvents: "none",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    color: "#d7d7d7",
    fontSize: "18px",
    cursor: "pointer",
  },
  button: {
    padding: "12px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#2563eb",
  },
  error: {
    color: "#dc2626",
    fontSize: "14px",
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const { email, name, password, confirmPassword } = form;

    if (!email || !name || !password || !confirmPassword) {
      setErrors({ form: "Semua kolom wajib diisi!" });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrors({ password: "Password minimal 6 karakter" });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Password tidak cocok" });
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", { email, name, password });
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Terjadi kesalahan saat registrasi.";
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.cardContainer}>
        <div style={styles.left}>
          <form onSubmit={handleRegister} style={styles.form}>
            <h2 style={styles.title}>Sign Up</h2>
            {errors.form && <p style={styles.error}>{errors.form}</p>}

            <div style={styles.inputGroup}>
              <input
                name="email"
                placeholder="Email"
                type="email"
                style={styles.input}
                onChange={handleChange}
                value={form.email}
                required
              />
              <FiMail style={styles.iconRight} />
            </div>

            <div style={styles.inputGroup}>
              <input
                name="name"
                placeholder="Name"
                type="text"
                style={styles.input}
                onChange={handleChange}
                value={form.name}
                required
              />
              <FiUser style={styles.iconRight} />
            </div>

            <div style={styles.inputGroup}>
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                style={styles.input}
                onChange={handleChange}
                value={form.password}
                required
              />
              <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div style={styles.inputGroup}>
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirm ? "text" : "password"}
                style={styles.input}
                onChange={handleChange}
                value={form.confirmPassword}
                required
              />
              <span style={styles.eyeIcon} onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {errors.password && <p style={styles.error}>{errors.password}</p>}
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Registering..." : "Sign Up"}
            </button>

            <p style={styles.linkText}>
              Sudah punya akun?{" "}
              <Link
                to="/login"
                style={{ color: "#3b82f6", textDecoration: "none" }}
                onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Login di sini
              </Link>
            </p>
          </form>
        </div>

        {!isMobile && <div style={styles.right}></div>}
      </div>
    </div>
  );
};

export default Register;
