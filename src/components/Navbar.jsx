import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  const user = JSON.parse(localStorage.getItem("user"));
  const profilePhoto = localStorage.getItem("profilePhoto");

  // ==========================
  // SCROLL TO SECTION
  // Jika sudah di "/" → langsung scroll ke id
  // Jika di halaman lain → navigate "/" dulu, lalu scroll
  // ==========================
  const scrollToSection = (id) => {
    setMenuOpen(false);

    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname === "/") {
      doScroll();
    } else {
      navigate("/");
      setTimeout(doScroll, 120);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 bg-[#F7F6FB]/95 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link to="/" className="flex items-center gap-3">

            <img
              src={logo}
              alt="BeautyBrain AI"
              className="w-10 h-10 object-contain"
            />

            <span className="text-xl md:text-2xl font-bold text-[#1A237E]">
              BeautyBrain
            </span>

          </Link>

          {/* ================= MENU DESKTOP ================= */}

          <nav className="hidden lg:flex items-center gap-10">

            <button
              onClick={() => scrollToSection("hero")}
              className="font-medium text-gray-600 hover:text-[#1A237E] transition"
            >
              Beranda
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="font-medium text-gray-600 hover:text-[#1A237E] transition"
            >
              Tentang Kami
            </button>

            <button
              onClick={() => scrollToSection("testimonial")}
              className="font-medium text-gray-600 hover:text-[#1A237E] transition"
            >
              Testimoni
            </button>

            <button
              onClick={() => scrollToSection("footer")}
              className="font-medium text-gray-600 hover:text-[#1A237E] transition"
            >
              Kontak
            </button>

          </nav>

          {/* ================= PROFILE DESKTOP ================= */}

          <div className="hidden lg:flex items-center">

            {user ? (

              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white transition"
              >

                {profilePhoto ? (

                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#1A237E]"
                  />

                ) : (

                  <div className="w-10 h-10 rounded-full bg-[#EEF0FF] flex items-center justify-center text-[#1A237E]">

                    {user.username ? (

                      <span className="font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>

                    ) : (

                      <FaUserCircle size={26} />

                    )}

                  </div>

                )}

                <div>

                  <p className="font-semibold text-[#1A237E]">
                    {user.username}
                  </p>

                  <p className="text-xs text-gray-500">
                    My Profile
                  </p>

                </div>

              </Link>

            ) : (

              <div className="flex items-center gap-2">

                <Link
                  to="/login"
                  className={`font-semibold transition ${
                    isLogin
                      ? "text-[#1A237E]"
                      : "text-gray-700 hover:text-[#1A237E]"
                  }`}
                >
                  Masuk
                </Link>

                <span className="text-gray-400">/</span>

                <Link
                  to="/register"
                  className={`font-semibold transition ${
                    isRegister
                      ? "text-[#1A237E]"
                      : "text-gray-700 hover:text-[#1A237E]"
                  }`}
                >
                  Daftar
                </Link>

              </div>

            )}

          </div>

          {/* ================= HAMBURGER ================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-[#1A237E]"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
                {/* ================= MOBILE MENU ================= */}

        {menuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-200 shadow-lg">

            <div className="flex flex-col p-6 space-y-5">

              <button
                onClick={() => scrollToSection("hero")}
                className="font-medium text-gray-700 hover:text-[#1A237E] text-left"
              >
                Beranda
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="font-medium text-gray-700 hover:text-[#1A237E] text-left"
              >
                Tentang Kami
              </button>

              <button
                onClick={() => scrollToSection("testimonial")}
                className="font-medium text-gray-700 hover:text-[#1A237E] text-left"
              >
                Testimoni
              </button>

              <button
                onClick={() => scrollToSection("footer")}
                className="font-medium text-gray-700 hover:text-[#1A237E] text-left"
              >
                Kontak
              </button>

              <hr />

              {user ? (

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >

                  {profilePhoto ? (

                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#1A237E]"
                    />

                  ) : (

                    <div className="w-11 h-11 rounded-full bg-[#EEF0FF] flex items-center justify-center text-[#1A237E] font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>

                  )}

                  <div>

                    <p className="font-semibold text-[#1A237E]">
                      {user.username}
                    </p>

                    <p className="text-sm text-gray-500">
                      My Profile
                    </p>

                  </div>

                </Link>

              ) : (

                <div className="flex flex-col gap-3">

                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="bg-[#1A237E] text-white py-3 rounded-xl text-center font-semibold"
                  >
                    Masuk
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="border border-[#1A237E] text-[#1A237E] py-3 rounded-xl text-center font-semibold"
                  >
                    Daftar
                  </Link>

                </div>

              )}

            </div>

          </div>
        )}

      </header>
    </>
  );
};

export default Navbar;

