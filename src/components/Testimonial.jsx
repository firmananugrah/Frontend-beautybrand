import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.png";
import user3 from "../assets/images/user3.png";

const testimonials = [
  {
    name: "Anisa Rahma",
    job: "Ibu Rumah Tangga, 32 thn",
    image: user1,
    text: `"Awalnya skeptis, tapi ternyata AI-nya bisa mendeteksi kemerahan di wajah saya yang sering saya abaikan. Rekomendasi produknya juga masuk akal dan tidak berlebihan."`
  },
  {
    name: "Budi Santoso",
    job: "Mahasiswa, 21 thn",
    image: user2,
    text: `"Sangat membantu untuk saya yang awam soal skincare. Sekarang saya tahu kenapa produk yang dulu saya pakai malah bikin breakout."`
  },
  {
    name: "Jessica Wijaya",
    job: "Marketing Manager, 28 thn",
    image: user3,
    text: `"Suka sekali dengan interface-nya yang bersih dan cepat. Konsultasi jadi lebih personal dan terasa seperti punya asisten kecantikan sendiri."`
  }
];

const Testimonial = () => {
  return (
    <section id="testimonial" className="bg-[#F7F6FB] py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-[#1A237E]">
            Apa Kata Mereka?
          </h2>

          <p className="text-gray-500 mt-4">
            Ribuan pengguna telah menemukan rutinitas skincare yang tepat.
          </p>

        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
          }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>

              <div className="bg-white rounded-3xl p-8 shadow-lg h-full">

                <div className="text-yellow-400 text-xl">
                  ★★★★★
                </div>

                <p className="mt-6 text-gray-600 leading-8">
                  {item.text}
                </p>

                <div className="flex items-center gap-4 mt-8">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

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

    </section>
  );
};

export default Testimonial;