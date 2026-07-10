import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  const handleTryAI = () => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin) {
      navigate("/chatbot");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-[#F7F6FB] py-16 sm:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            lg:rounded-[40px]
            px-6
            sm:px-10
            lg:px-16
            py-14
            sm:py-16
            lg:py-20
            text-center
            shadow-2xl
          "
          style={{
            background:
              "linear-gradient(135deg, #0D1B6E 0%, #1A237E 25%, #1565C0 50%, #1976D2 70%, #7B1FA2 100%)",
          }}
        >

          {/* Orb kiri atas — ungu */}
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, #7B1FA2, transparent)" }}
          />

          {/* Orb kanan bawah — cyan */}
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, #00B4D8, transparent)" }}
          />

          {/* Orb tengah — biru terang */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #64B5F6, transparent)" }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10">

            <h2
              className="
                text-white
                font-bold
                leading-tight
                text-3xl
                sm:text-4xl
                lg:text-5xl
                max-w-4xl
                mx-auto
              "
            >
              Mau tahu skincare yang paling cocok buat kamu?
              <br className="hidden sm:block" />
              Cari tahu di sini, yuk!
            </h2>

            <p
              className="
                mt-6
                text-blue-100
                text-base
                sm:text-lg
                leading-7
                max-w-2xl
                mx-auto
                opacity-90
              "
            >
              Dapatkan rekomendasi skincare yang akurat menggunakan
              BeautyBrain Chatbot. Analisis kondisi kulitmu dan temukan
              produk terbaik yang sesuai dengan kebutuhanmu.
            </p>

            <button
              onClick={handleTryAI}
              className="
                mt-10
                w-full
                sm:w-auto
                bg-white
                text-[#1A237E]
                px-8
                sm:px-10
                py-4
                rounded-xl
                font-semibold
                text-base
                sm:text-lg
                shadow-lg
                transition-all
                duration-300
                hover:bg-[#EEF2FF]
                hover:scale-105
                hover:shadow-2xl
              "
            >
              Coba Chatbot Sekarang →
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;