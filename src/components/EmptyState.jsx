import { FaLeaf, FaSun, FaTint, FaRegSmile } from "react-icons/fa";

// ==============================================================
// EmptyState
// Semua card mengirim "konsultasi" → backend memulai 9 pertanyaan
// analisis kulit secara otomatis.
// ==============================================================

const EmptyState = ({ onSuggestionClick }) => {

  const handleCardClick = () => {
    onSuggestionClick?.("konsultasi");
  };

  const suggestions = [
    {
      icon: <FaLeaf className="text-green-500 text-xl" />,
      title: "Kulit Berjerawat",
      desc: "Analisis kondisi kulitmu dan dapatkan solusi tepat untuk jerawat.",
    },
    {
      icon: <FaTint className="text-blue-500 text-xl" />,
      title: "Kulit Kering",
      desc: "Temukan rutinitas dan produk terbaik untuk kulitmu yang kering.",
    },
    {
      icon: <FaSun className="text-yellow-500 text-xl" />,
      title: "Perlindungan Kulit",
      desc: "Dapatkan rekomendasi sunscreen sesuai jenis dan kondisi kulitmu.",
    },
    {
      icon: <FaRegSmile className="text-pink-500 text-xl" />,
      title: "Rutinitas Skincare",
      desc: "Buat skincare routine pagi dan malam yang cocok untuk kulitmu.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full pt-20">

      <div className="w-full max-w-2xl text-center px-6">

        <h1 className="text-4xl font-bold text-[#1A237E] mb-4">
          BeautyBrain Chatbot
        </h1>

        <p className="text-gray-500 leading-7">
          Ayo mulai analisis kulitmu! 🌿 Ceritakan kondisi kulit kamu
          sehari-hari dan BeautyBrain akan memberikan rekomendasi skincare
          yang tepat dan personal untukmu.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-5 mt-12 w-full max-w-5xl px-4">

        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={handleCardClick}
            className="
              bg-white border border-gray-200 rounded-2xl p-5
              hover:shadow-lg hover:border-[#1A237E]/30 hover:bg-[#F5F6FF]
              transition-all duration-200 cursor-pointer text-left
              active:scale-[0.98]
            "
          >
            <div className="mb-4">
              {item.icon}
            </div>

            <h3 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              {item.desc}
            </p>

            <p className="text-[#1A237E] text-xs font-semibold mt-3 flex items-center gap-1">
              Mulai Analisis <span>→</span>
            </p>

          </button>
        ))}

      </div>

    </div>
  );
};

export default EmptyState;