const ChatBubble = ({
  messages,
  user,
  handleChoice,
}) => {

  // =====================================
  // USER INITIAL
  // =====================================

  const initial =
    user?.username?.charAt(0).toUpperCase() || "U";

  // =====================================
  // FORMAT HARGA
  // =====================================

  const formatPrice = (price) => {
    if (!price) return "-";

    return Number(price).toLocaleString("id-ID");
  };

  // =====================================
  // HASIL ANALISIS
  // =====================================

  const renderAnalysis = (analysis) => {

    if (!analysis) return null;

    return (

      <div className="mt-6 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 md:p-7 shadow">

        {/* Header */}

        <div className="flex items-center gap-4 mb-6">

          <div
            className="
              w-14
              h-14
              rounded-full
              bg-[#1A237E]
              flex
              items-center
              justify-center
              text-2xl
              text-white
              shrink-0
            "
          >
            🧠
          </div>

          <div>

            <h2 className="text-xl md:text-2xl font-bold text-[#1A237E]">
              Hasil Analisis Kulit
            </h2>

            <p className="text-sm text-gray-500">
              BeautyBrain Chatbot
            </p>

          </div>

        </div>

        {/* Informasi */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">
              Jenis Kulit
            </p>

            <h3 className="text-xl font-bold text-[#1A237E] mt-2">
              {analysis.jenis_kulit || "-"}
            </h3>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm">
              Masalah Kulit
            </p>

            <h3 className="text-xl font-bold text-[#1A237E] mt-2">
              {analysis.masalah_kulit || "-"}
            </h3>

          </div>

        </div>

        {/* Kesimpulan */}

        <div className="bg-white rounded-2xl p-5 mt-5 shadow-sm">

          <h3 className="font-bold text-[#1A237E] mb-3">
            Kesimpulan BeautyBrain Chatbot
          </h3>

          <p className="text-gray-700 leading-8 whitespace-pre-wrap">
            {analysis.kesimpulan}
          </p>

        </div>

        {/* Disclaimer */}

        <div className="mt-5 rounded-2xl border border-yellow-300 bg-yellow-50 p-5">

          <h4 className="font-semibold text-yellow-800 mb-3">
            ⚠️ Disclaimer
          </h4>

          <p className="text-sm leading-7 text-yellow-700">

            Hasil analisis ini diperoleh berdasarkan jawaban yang Anda
            berikan kepada BeautyBrain Chatbot. Hasil ini bukan diagnosis
            medis dan hanya digunakan sebagai rekomendasi awal dalam
            memilih produk skincare.

          </p>

          <p className="text-sm leading-7 text-yellow-700 mt-4">

            Jika mengalami masalah kulit yang serius atau berkepanjangan,
            disarankan untuk berkonsultasi langsung dengan dokter
            spesialis kulit (Sp.KK).

          </p>

        </div>

      </div>

    );

  };

  // =====================================
  // REKOMENDASI PRODUK
  // =====================================
  const renderRecommendation = (products) => {

    if (!products || products.length === 0) return null;

    return (

      <div className="mt-6 space-y-6">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-[#1A237E] to-[#3949AB] p-6 md:p-8 text-white shadow-lg">

          <h2 className="text-2xl md:text-3xl font-bold">
            ✨ Rekomendasi Skincare
          </h2>

          <p className="mt-3 text-blue-100 leading-7">

            Berikut merupakan produk skincare yang direkomendasikan
            berdasarkan hasil analisis BeautyBrain Chatbot.

          </p>

        </div>

        {products.map((item, index) => (

          <div
            key={index}
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              shadow-md
              hover:shadow-xl
              transition-all
              duration-300
              overflow-hidden
            "
          >

            {/* HEADER */}

            <div className="bg-[#F7F8FD] p-6 border-b border-gray-100">

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#1A237E]
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                    shrink-0
                  "
                >
                  #{index + 1}
                </div>

                <div>

                  <h2 className="text-xl md:text-2xl font-bold text-[#1A237E]">

                    {item["Nama Produk"]}

                  </h2>

                  <p className="text-gray-500 mt-1">

                    {item.Brand}

                  </p>

                </div>

              </div>

            </div>

            {/* INFORMASI */}

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500">
                    Jenis Produk
                  </p>

                  <p className="font-semibold mt-2">
                    {item["Jenis Produk"]}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500">
                    Jenis Kulit
                  </p>

                  <p className="font-semibold mt-2">
                    {item["Jenis Kulit"]}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500">
                    Mengatasi
                  </p>

                  <p className="font-semibold mt-2">
                    {item["Masalah Kulit"]}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-500">
                    Manfaat
                  </p>

                  <p className="font-semibold mt-2">
                    {item["Fungsi"]}
                  </p>

                </div>

              </div>

              {/* Harga */}

              <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Harga
                  </p>

                  <h3 className="text-2xl font-bold text-[#1A237E]">

                    Rp {formatPrice(item.Harga)}

                  </h3>

                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    bg-green-100
                    text-green-700
                    px-5
                    py-2
                    rounded-full
                    font-semibold
                    w-fit
                  "
                >
                  ✔ Direkomendasikan
                </span>

              </div>

              {/* Penjelasan AI */}

              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">

                <h3 className="font-bold text-[#1A237E] mb-3">

                  🤖 Penjelasan BeautyBrain Chatbot

                </h3>

                <p className="leading-8 text-gray-700">

                  Produk <b>{item["Nama Produk"]}</b> dari
                  <b> {item.Brand}</b> merupakan
                  <b> {item["Jenis Produk"]}</b> yang cocok digunakan
                  untuk jenis kulit
                  <b> {item["Jenis Kulit"]}</b>.

                </p>

                <p className="leading-8 text-gray-700 mt-4">

                  Produk ini diformulasikan untuk membantu mengatasi
                  <b> {item["Masalah Kulit"]}</b>
                  dengan manfaat utama
                  <b> {item["Fungsi"]}</b>,
                  sehingga menjadi salah satu rekomendasi terbaik
                  berdasarkan hasil analisis BeautyBrain Chatbot.

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    );

  };

  // =====================================
  // RETURN
  // =====================================

  return (

    <div className="flex flex-col gap-6">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={`flex ${
            msg.sender === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          {/* ================= USER ================= */}

          {msg.sender === "user" && (

            <div className="flex items-end gap-3 max-w-[95%] md:max-w-[80%]">

              <div
                className="
                  bg-[#1A237E]
                  text-white
                  rounded-3xl
                  rounded-br-md
                  px-5
                  py-4
                  shadow-md
                "
              >

                <p className="leading-7 whitespace-pre-wrap text-sm md:text-base">

                  {msg.text}

                </p>

              </div>

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#1A237E]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  shrink-0
                "
              >

                {initial}

              </div>

            </div>

          )}

          {/* ================= BOT ================= */}

          {msg.sender === "bot" && (

            <div className="flex items-start gap-3 w-full">

              {/* Avatar */}

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#1A237E]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  shrink-0
                "
              >

                BB

              </div>

              <div className="flex-1">

                {/* Loading */}

                {msg.loading ? (

                  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">

                    <div className="flex items-center gap-3">

                      <div className="w-3 h-3 rounded-full bg-[#1A237E] animate-bounce"></div>

                      <div className="w-3 h-3 rounded-full bg-[#3949AB] animate-bounce [animation-delay:0.15s]"></div>

                      <div className="w-3 h-3 rounded-full bg-[#5C6BC0] animate-bounce [animation-delay:0.3s]"></div>

                      <span className="text-gray-500 ml-2">

                        BeautyBrain sedang mengetik...

                      </span>

                    </div>

                  </div>

                ) : (

                  <>

                    {/* Pesan */}

                    {msg.text && (

                      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">

                        <p className="leading-8 whitespace-pre-wrap text-gray-700 text-sm md:text-base">

                          {msg.text}

                        </p>

                      </div>

                    )}

                    {/* Choice */}

                    {msg.choices && msg.choices.length > 0 && (

                      <div className="flex flex-wrap gap-3 mt-4">

                        {msg.choices.map((choice, i) => (

                          <button
                            key={i}
                            onClick={() => handleChoice(choice)}
                            className="
                              px-5
                              py-3
                              rounded-full
                              bg-[#EEF2FF]
                              text-[#1A237E]
                              font-medium
                              border
                              border-[#D5DBFF]
                              hover:bg-[#1A237E]
                              hover:text-white
                              transition
                            "
                          >

                            {choice}

                          </button>

                        ))}

                      </div>

                    )}

                    {/* Analisis */}

                    {msg.analysis &&
                      renderAnalysis(msg.analysis)}

                    {/* Rekomendasi */}

                    {msg.recommendations &&
                      renderRecommendation(
                        msg.recommendations
                      )}

                  </>

                )}

              </div>

            </div>

          )}

        </div>

      ))}

    </div>

  );

};

export default ChatBubble;