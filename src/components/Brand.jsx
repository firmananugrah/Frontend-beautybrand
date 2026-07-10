import somethinc from "../assets/brands/somethinc.png";
import skintific from "../assets/brands/skintific.png";
import wardah from "../assets/brands/wardah.png";
import hadalabo from "../assets/brands/hadalabo.png";
import avoskin from "../assets/brands/avoskin.png";
import azarine from "../assets/brands/azarine.png";
import glad2glow from "../assets/brands/glad2glow.png";
import emina from "../assets/brands/emina.png";
import kahf from "../assets/brands/kahf.png";
import garnier from "../assets/brands/garniermen.png";
import nivea from "../assets/brands/niveamen.png";

const brands = [
  somethinc,
  skintific,
  wardah,
  hadalabo,
  avoskin,
  azarine,
  glad2glow,
  emina,
  kahf,
  garnier,
  nivea,
];

const Brand = () => {
  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="text-[#1A237E] font-semibold uppercase tracking-[0.25em] text-sm">
            Trusted Brands
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1A237E] mt-4">
            Skincare Brands Recommendation
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            BeautyBrain AI memberikan rekomendasi produk skincare dari
            berbagai brand terpercaya yang telah dikenal luas di Indonesia.
          </p>

        </div>

        {/* Logo */}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 place-items-center">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="flex justify-center items-center
              grayscale hover:grayscale-0
              opacity-70 hover:opacity-100
              hover:scale-105
              transition duration-300"
            >

              <img
                src={brand}
                alt="brand"
                className="h-14 object-contain"
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Brand;