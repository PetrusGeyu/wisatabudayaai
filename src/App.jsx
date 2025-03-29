import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Wisata from "./pages/Wisata";
import Budaya from "./pages/Budaya";
import Review from "./pages/Review";
import Footer from "./Components/Footer";
import NotFound from "./pages/NotFound";
import Navbar from "./Components/Navbar";
import Login from "./auth/Login";
import Register from "./auth/register";

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register"; // Cek jika halaman Login/Register

  return (
    <>
      {!hideLayout && <Navbar />} {/* Sembunyikan Navbar di halaman Login/Register */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wisata" element={<Wisata />} />
        <Route path="/budaya" element={<Budaya />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />} {/* Sembunyikan Footer di halaman Login/Register */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
