import { Link } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen">

      {/* NAVBAR */}
      <LandingNavbar />

      {/* FULL HERO SECTION */}
      <section
        className="w-full h-[90vh] bg-cover bg-center flex items-center justify-end px-6 md:px-20 relative animate-fadeIn"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* RIGHT SIDE TEXT */}
        <div className="relative z-10 text-white max-w-xl space-y-5 text-right animate-slideUp">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            Perfect Weddings
            <br />
            <span className="text-[#ffb3c6]">Happen Here!</span>
          </h1>

          <p className="text-sm md:text-lg drop-shadow">
            Find verified profiles, match with the right one and start your beautiful journey.
          </p>

          {/* BUTTONS RIGHT-ALIGNED */}
          <div className="flex justify-end gap-3">
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition"
              style={{ backgroundColor: "#e91e63" }}
            >
              Register Free
            </Link>

            <Link
              to="/guest"
              className="px-5 py-2 rounded-lg border border-white text-white font-semibold shadow-lg hover:bg-white hover:text-black transition"
            >
              Guest View
            </Link>
          </div>

        </div>
      </section>

      {/* SERVICES SECTION
      <section className="max-w-6xl mx-auto py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 animate-fadeIn">
          Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://images.pexels.com/photos/1782365/pexels-photo-1782365.jpeg",
            "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
            "https://images.pexels.com/photos/265917/pexels-photo-265917.jpeg",
            "https://images.pexels.com/photos/305272/pexels-photo-305272.jpeg",
          ].map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-3 cursor-pointer animate-zoomIn"
            >
              <img
                src={img}
                alt="service"
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
