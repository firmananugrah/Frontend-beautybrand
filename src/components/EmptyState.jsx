import { FaLeaf, FaSun, FaTint, FaRegSmile } from "react-icons/fa";

const EmptyState = ({ onSuggestionClick }) => {
  const suggestions = [
    {
      icon: <FaLeaf className="text-green-500 text-xl" />,
      title: "Kulit Berjerawat",
      desc: "Rekomendasikan skincare untuk mengatasi jerawat.",
      prompt: "Rekomendasikan skincare untuk mengatasi jerawat.",
    },
    {
      icon: <FaTint className="text-blue-500 text-xl" />,
      title: "Kulit Kering",
      desc: "Produk yang cocok untuk kulit kering dan dehidrasi.",
      prompt: "Produk apa yang cocok untuk kulit kering dan dehidrasi?",
    },
    {
      icon: <FaSun className="text-yellow-500 text-xl" />,
      title: "Sunscreen",
      desc: "Sunscreen terbaik sesuai jenis kulit saya.",
      prompt: "Sunscreen terbaik sesuai jenis kulit saya apa?",
    },
    {
      icon: <FaRegSmile className="text-pink-500 text-xl" />,
      title: "Rutinitas Skincare",
      desc: "Buatkan skincare routine pagi dan malam.",
      prompt: "Buatkan skincare routine pagi dan malam untuk saya.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full pt-20">

      <div className="w-full max-w-2xl text-center px-6">

        <h1 className="text-4xl font-bold text-[#1A237E] mb-4">
          BeautyBrain Chatbot
        </h1>

        <p className="text-gray-500 leading-7">
          Halo 👋 Selamat datang di BeautyBrain Chatbot.
          Saya siap membantu memberikan rekomendasi skincare
          berdasarkan jenis kulit dan permasalahan kulit yang kamu alami.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-5 mt-12 w-full max-w-5xl px-4">

        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick?.(item.prompt)}
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
          </button>
        ))}

      </div>

    </div>
  );
};

export default EmptyState;