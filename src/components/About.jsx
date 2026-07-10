import aboutImage from "../assets/images/about.png";

const About = () => {
  return (
    <section id="about" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}

          <div className="flex justify-center">
            <img
              src={aboutImage}
              alt="About BeautyBrain AI"
              className="
                w-full
                max-w-[500px]
                rounded-3xl
                shadow-xl
                object-cover
              "
            />
          </div>

          {/* RIGHT CONTENT */}

          <div>

            <span className="text-[#6D5DF6] font-semibold uppercase tracking-wider">
              Tentang Kami
            </span>

            <h2 className="mt-4 text-3xl lg:text-[42px] font-bold text-[#1A237E] leading-tight">
              BeautyBrain membantu Anda menemukan skincare yang tepat.
            </h2>

            <p className="mt-6 text-gray-600 leading-8 text-[17px]">
            BeautyBrain AI adalah chatbot rekomendasi skincare berbasis 
            web yang dirancang untuk membantu pengguna memilih produk skincare 
            sesuai dengan jenis kulit dan permasalahan kulit yang dimiliki. 
            Sistem melakukan analisis terhadap jawaban konsultasi menggunakan 
            teknik Natural Language Processing (NLP) dengan metode TF-IDF dan 
            Cosine Similarity, sehingga mampu memberikan rekomendasi produk skincare 
            yang relevan berdasarkan dataset yang telah disusun.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;