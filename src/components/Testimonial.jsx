import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaUserCircle, FaTimes, FaPen } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.png";
import user3 from "../assets/images/user3.png";

// ==============================================================
// Data awal testimonial
// ==============================================================
const initialTestimonials = [
  {
    id: 1,
    name: "Anisa Rahma",
    job: "Ibu Rumah Tangga, 32 thn",
    image: user1,
    rating: 5,
    text: "Awalnya skeptis, tapi ternyata AI-nya bisa mendeteksi kemerahan di wajah saya yang sering saya abaikan. Rekomendasi produknya juga masuk akal dan tidak berlebihan.",
  },
  {
    id: 2,
    name: "Budi Santoso",
    job: "Mahasiswa, 21 thn",
    image: user2,
    rating: 5,
    text: "Sangat membantu untuk saya yang awam soal skincare. Sekarang saya tahu kenapa produk yang dulu saya pakai malah bikin breakout.",
  },
  {
    id: 3,
    name: "Jessica Wijaya",
    job: "Marketing Manager, 28 thn",
    image: user3,
    rating: 5,
    text: "Suka sekali dengan interface-nya yang bersih dan cepat. Konsultasi jadi lebih personal dan terasa seperti punya asisten kecantikan sendiri.",
  },
];

// ==============================================================
// StarRating — bintang interaktif untuk input
// ==============================================================
const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-100 hover:scale-110"
        >
          <FaStar
            size={28}
            className={
              star <= (hovered || value)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
};

// ==============================================================
// StarDisplay — bintang statis untuk tampilan card
// ==============================================================
const StarDisplay = ({ value }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        size={15}
        className={star <= value ? "text-yellow-400" : "text-gray-200"}
      />
    ))}
  </div>
);

// ==============================================================
// Testimonial Component
// ==============================================================
const Testimonial = () => {
  // Baca ulasan user dari localStorage saat pertama kali mount
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const stored = localStorage.getItem("bb_reviews");
      const userReviews = stored ? JSON.parse(stored) : [];
      // Gabungkan: ulasan user (terbaru di atas) + data awal
      return [...userReviews, ...initialTestimonials];
    } catch {
      return initialTestimonials;
    }
  });
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    job: "",
    rating: 5,
    text: "",
  });
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.text.trim()) {
      setFormError("Nama dan ulasan wajib diisi.");
      return;
    }
    if (form.rating === 0) {
      setFormError("Pilih rating bintang terlebih dahulu.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      job: form.job.trim() || "Pengguna BeautyBrain",
      image: null,
      rating: form.rating,
      text: form.text.trim(),
    };

    // Simpan ulasan user ke localStorage (hanya ulasan baru, bukan data awal)
    try {
      const stored = localStorage.getItem("bb_reviews");
      const existing = stored ? JSON.parse(stored) : [];
      const updated = [newReview, ...existing];
      localStorage.setItem("bb_reviews", JSON.stringify(updated));
    } catch (err) {
      console.error("Gagal menyimpan ulasan:", err);
    }

    setTestimonials((prev) => [newReview, ...prev]);
    setForm({ name: "", job: "", rating: 5, text: "" });
    setSubmitted(true);

    // Tutup modal setelah 1.5 detik
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <section id="testimonial" className="bg-[#F7F6FB] py-24">

      <div className="max-w-7xl mx-auto px-8">

        {/* ================= HEADER ================= */}

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-[#1A237E]">
            Apa Kata Mereka?
          </h2>

          <p className="text-gray-500 mt-4">
            Ribuan pengguna telah menemukan rutinitas skincare yang tepat.
          </p>

          {/* Tombol tambah review */}
          <button
            onClick={() => setShowModal(true)}
            className="
              mt-8 inline-flex items-center gap-2
              bg-[#1A237E] hover:bg-[#11195E]
              text-white px-6 py-3 rounded-xl
              font-semibold transition-all duration-200
              hover:scale-105 shadow-md hover:shadow-lg
            "
          >
            <FaPen size={13} />
            Tulis Ulasan Kamu
          </button>

        </div>

        {/* ================= SWIPER ================= */}

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={testimonials.length >= 3}
          breakpoints={{
            0:    { slidesPerView: 1 },
            768:  { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>

              <div className="bg-white rounded-3xl p-8 shadow-lg h-full flex flex-col">

                {/* Bintang */}
                <StarDisplay value={item.rating} />

                {/* Teks ulasan */}
                <p className="mt-5 text-gray-600 leading-8 flex-1">
                  "{item.text}"
                </p>

                {/* Profil */}
                <div className="flex items-center gap-4 mt-8">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#EEF0FF] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1A237E] font-bold text-xl">
                        {item.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div>
                    <h4 className="font-bold text-[#1A237E]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.job}
                    </p>
                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* ================= MODAL FORM ================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShowModal(false); setSubmitted(false); setFormError(""); }}
          />

          {/* Card modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10 animate-[fadeInUp_0.25s_ease]">

            {/* Tombol tutup */}
            <button
              onClick={() => { setShowModal(false); setSubmitted(false); setFormError(""); }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition"
            >
              <FaTimes size={20} />
            </button>

            {/* Sukses */}
            {submitted ? (
              <div className="flex flex-col items-center py-6 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-500 text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A237E]">Terima kasih!</h3>
                <p className="text-gray-500 text-center">Ulasan kamu sudah ditambahkan.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#1A237E] mb-1">
                  Tulis Ulasan
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Bagikan pengalamanmu menggunakan BeautyBrain AI.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Nama */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1A237E] transition text-sm"
                    />
                  </div>

                  {/* Profesi (opsional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profesi <span className="text-gray-400 font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: Mahasiswa, 22 thn"
                      value={form.job}
                      onChange={(e) => setForm({ ...form, job: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1A237E] transition text-sm"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <StarRating
                      value={form.rating}
                      onChange={(val) => setForm({ ...form, rating: val })}
                    />
                  </div>

                  {/* Ulasan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ulasan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ceritakan pengalamanmu menggunakan BeautyBrain AI..."
                      value={form.text}
                      onChange={(e) => setForm({ ...form, text: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1A237E] transition text-sm resize-none"
                    />
                  </div>

                  {/* Error */}
                  {formError && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                      {formError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      w-full bg-[#1A237E] hover:bg-[#11195E]
                      text-white py-3.5 rounded-xl font-semibold
                      transition-all duration-200 hover:scale-[1.02]
                      shadow-lg hover:shadow-xl
                    "
                  >
                    Kirim Ulasan
                  </button>

                </form>
              </>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

export default Testimonial;