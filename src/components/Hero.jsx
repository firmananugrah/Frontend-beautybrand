import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero.png";

const Hero = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    const token = localStorage.getItem("isLogin");

    if (token) {
      navigate("/chatbot");
    } else {
      navigate("/login");
    }
  };

  return (
    <section id="hero" className="bg-[#F7F6FB]">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16 py-16 lg:min-h-[88vh]">

          {/* ================= LEFT ================= */}

          <div className="text-center lg:text-left">

            <span
              className="
                inline-flex
                items-center
                gap-2
                bg-[#D8D7FF]
                text-[#1A237E]
                px-4
                py-2
                rounded-full
                text-xs
                sm:text-sm
                font-medium
              "
            >
              ✨ AI Personal Skincare Assistant
            </span>

            <h1
              className="
                mt-6
                text-3xl
                sm:text-4xl
                lg:text-[48px]
                font-bold
                text-[#1A237E]
                leading-tight
              "
            >
              Solusi cerdas untuk menemukan skincare terbaik,
              hanya dengan percakapan sederhana.
            </h1>

            <p
              className="
                mt-6
                max-w-xl
                mx-auto
                lg:mx-0
                text-gray-600
                text-base
                leading-7
              "
            >
              Konsultasikan kondisi kulit Anda kapan saja.
              BeautyBrain AI menganalisis kebutuhan kulit secara akurat
              sehingga mampu memberikan rekomendasi skincare yang
              dipersonalisasi sesuai kondisi kulit Anda.
            </p>

            <button
              onClick={handleStartAnalysis}
              className="
                mt-8
                w-full
                sm:w-auto
                bg-[#1A237E]
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:bg-[#2436A5]
                hover:scale-105
                hover:shadow-2xl
              "
            >
              Mulai Analisis Sekarang →
            </button>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="flex justify-center lg:justify-end order-first lg:order-last">

            <img
              src={heroImage}
              alt="BeautyBrain Hero"
              className="
                w-full
                max-w-[280px]
                sm:max-w-[360px]
                md:max-w-[450px]
                lg:max-w-[520px]
                rounded-[28px]
                object-cover
                shadow-2xl
                transition-all
                duration-500
                hover:scale-105
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;