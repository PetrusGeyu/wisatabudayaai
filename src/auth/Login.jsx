import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import bgImage from "../asset/bromo.jpg";
import API from "../services/api";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
    fontFamily: "sans-serif",
  },
  cardContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    height: "81%",
    backgroundColor: "#fff",
    borderRadius: "24px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
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
  },
  form: {
    width: "100%",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    borderRadius: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "10px",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "12px 40px 12px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    outlineColor: "#1a73e8",
  },
  iconRight: {
    position: "absolute",
    right: "10px",
    color: "#d7d7d7",
    fontSize: "18px",
    cursor: "default",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    color: "#d7d7d7",
    fontSize: "18px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#1669c1",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverLink, setHoverLink] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("http://localhost:3000/auth/login", form);
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
      <div style={styles.cardContainer}>
        <div style={styles.left}>
          <form onSubmit={handleLogin} style={styles.form}>
            <h2 style={styles.title}>Login</h2>
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                value={form.email}
                required
              />
              <FiMail style={styles.iconRight} />
            </div>

            <div style={styles.inputGroup}> 
              <input
                style={styles.input}
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={form.password}
                required
              />
              <span style={styles.eyeIcon} onClick={togglePassword}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button
              style={{
                ...styles.button,
                ...(hoverButton ? styles.buttonHover : {}),
              }}
              type="submit"
              disabled={loading}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p style={styles.linkText}>
              Belum punya akun?{" "}
              <Link
                to="/register"
                style={{
                  color: "#1a73e8",
                  textDecoration: hoverLink ? "underline" : "none",
                }}
                onMouseEnter={() => setHoverLink(true)}
                onMouseLeave={() => setHoverLink(false)}
              >
                Ayo buat
              </Link>
            </p>
          </form>
        </div>

        {!isMobile && <div style={styles.right}></div>}
      </div>
    </div>
  );
};

export default Login;
