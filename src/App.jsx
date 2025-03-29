import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wisata from "./pages/Wisata";
import Budaya from "./pages/Budaya";
import Review from "./pages/Review";
import Footer from "./Components/Footer";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Login from './auth/Login';
import Register from './auth/register.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wisata" element={<Wisata />} />
        <Route path="/budaya" element={<Budaya />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
