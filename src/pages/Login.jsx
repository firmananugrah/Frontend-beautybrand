import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {

  // Simpan object user lengkap (digunakan oleh UI komponen)
  localStorage.setItem("user", JSON.stringify(data.user));

  // Simpan key individual (dibutuhkan backend untuk /chat & /profile)
  localStorage.setItem("user_id",  String(data.user.id));
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("email",    data.user.email);

  localStorage.setItem("isLogin", "true");

  navigate("/chatbot");

} else {

  setError(data.detail || "Login gagal");

}
    } catch (error) {
      setError("Backend tidak dapat dihubungi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#F7F6FB] flex items-center justify-center px-5 sm:px-6 lg:px-8 py-14">

        <div
          className="
            w-full
            max-w-md
            bg-white/95
            backdrop-blur-md
            rounded-3xl
            shadow-2xl
            p-6
            sm:p-8
            lg:p-10
          "
        >

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#1A237E]">
            Selamat Datang
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base">
            Login untuk menggunakan BeautyBrain AI
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#1A237E]
                  transition
                "
                required
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-[#1A237E]
                  transition
                "
                required
              />

            </div>

            {/* ERROR */}

            {error && (

              <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-3 text-sm">
                {error}
              </div>

            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#1A237E]
                hover:bg-[#2436A5]
                text-white
                py-3.5
                rounded-xl
                font-semibold
                transition-all
                duration-300
                shadow-lg
                hover:shadow-xl
                hover:scale-[1.02]
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Sedang Login..." : "Login"}
            </button>

          </form>

          {/* REGISTER */}

          <div className="text-center mt-8 text-sm sm:text-base">

            <span className="text-gray-600">
              Belum punya akun?
            </span>

            <Link
              to="/register"
              className="ml-2 text-[#1A237E] font-semibold hover:underline"
            >
              Daftar
            </Link>

          </div>

        </div>

      </section>
      <Footer />
    </>
  );
};

export default Login;