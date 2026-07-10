import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Register berhasil!");
        navigate("/login");
      } else {
        setError(data.detail || "Register gagal");
      }
    } catch (err) {
      setError("Backend tidak dapat dihubungi");
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
            max-w-lg
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
            Buat Akun Anda
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base">
            Mulai perjalanan skincare personal Anda bersama BeautyBrain AI.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Username */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            {/* Email */}

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

            {/* Password */}

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

            {/* Confirm Password */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Konfirmasi Password
              </label>

              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* Error */}

            {error && (

              <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-3 text-sm">
                {error}
              </div>

            )}

            {/* Terms */}

            <div className="flex items-start gap-3">

              <input
                type="checkbox"
                className="mt-1 accent-[#1A237E]"
                required
              />

              <p className="text-sm text-gray-500 leading-6">
                Saya menyetujui Terms of Service dan Privacy Policy yang berlaku
                pada BeautyBrain AI.
              </p>

            </div>

            {/* Button */}

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
              {loading ? "Sedang Mendaftar..." : "Register"}
            </button>

          </form>

          <div className="text-center mt-8 text-sm sm:text-base">

            <span className="text-gray-600">
              Sudah memiliki akun?
            </span>

            <Link
              to="/login"
              className="ml-2 text-[#1A237E] font-semibold hover:underline"
            >
              Masuk
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Register;