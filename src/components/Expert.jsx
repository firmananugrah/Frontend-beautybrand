import doctorImage from "../assets/images/doctor.png";

const Expert = () => {
  return (
    <section className="bg-[#1A237E] py-16 sm:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div
          className="
            bg-white
            rounded-3xl
            lg:rounded-[40px]
            shadow-2xl
            px-6
            sm:px-10
            lg:px-16
            py-10
            sm:py-14
            lg:py-16
          "
        >

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ================= LEFT ================= */}

            <div className="relative w-full flex justify-center">

              <img
                src={doctorImage}
                alt="Doctor"
                className="
                  w-full
                  max-w-[300px]
                  sm:max-w-[380px]
                  lg:max-w-[420px]
                  rounded-3xl
                  object-cover
                  shadow-xl
                "
              />

              {/* CARD */}

              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  sm:bottom-6
                  sm:right-6
                  bg-[#1A237E]
                  text-white
                  rounded-2xl
                  px-5
                  py-4
                  shadow-xl
                  max-w-[240px]
                "
              >

                <h3 className="font-bold text-base sm:text-lg">
                  Dr. Sarah, Sp.KK
                </h3>

                <p className="text-xs sm:text-sm text-blue-100">
                  Dermatologist & Skin Expert
                </p>

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="text-center lg:text-left">

              <div className="text-5xl sm:text-6xl lg:text-7xl text-gray-300 font-bold">
                ❝
              </div>

              <h2
                className="
                  mt-2
                  text-[#1A237E]
                  font-bold
                  leading-tight
                  text-2xl
                  sm:text-3xl
                  lg:text-[32px]
                "
              >
                BeautyBrain adalah jembatan edukasi yang luar biasa.
                Akurasi analisanya membantu pasien memahami dasar
                kesehatan kulit mereka sebelum melakukan konsultasi
                klinis lebih lanjut.
              </h2>

              <div className="w-24 h-1 bg-[#1A237E] rounded-full mt-6 mx-auto lg:mx-0"></div>

              <p
                className="
                  mt-6
                  text-gray-600
                  leading-8
                  text-base
                  sm:text-lg
                "
              >
                Kami bekerja sama erat dengan para ahli dermatologi
                untuk memastikan setiap saran yang diberikan Chatbot tetap
                berada dalam koridor medis yang aman dan efektif,
                sehingga pengguna memperoleh informasi yang lebih
                terpercaya sebelum berkonsultasi dengan dokter.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Expert;