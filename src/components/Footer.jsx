const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-[#F7F6FB] border-t"
    >
      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

            <h2 className="text-2xl font-bold text-[#1A237E]">
              BeautyBrain 
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Platform konsultasi skincare berbasis Artificial Intelligence
              untuk membantu menemukan produk terbaik sesuai kondisi kulit.
            </p>

          </div>

          {/* Navigasi */}
          <div>

            <h3 className="font-bold text-[#1A237E] mb-4">
              Navigasi
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>
                <a href="/">Beranda</a>
              </li>

              <li>
                <a href="#about">Tentang Kami</a>
              </li>

              <li>
                <a href="#testimonial">Testimoni</a>
              </li>

            </ul>

          </div>

          {/* Bantuan */}
          <div>

            <h3 className="font-bold text-[#1A237E] mb-4">
              Bantuan
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>FAQ</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

            </ul>

          </div>

          {/* Sosial */}
          <div>

            <h3 className="font-bold text-[#1A237E] mb-4">
              Ikuti Kami
            </h3>

            <div className="flex gap-4">

              <div className="w-10 h-10 rounded-full bg-[#1A237E]"></div>

              <div className="w-10 h-10 rounded-full bg-[#1A237E]"></div>

              <div className="w-10 h-10 rounded-full bg-[#1A237E]"></div>

            </div>

          </div>

        </div>

        <div className="border-t mt-12 pt-6 text-center text-gray-500">
          © 2026 BeautyBrain AI. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;