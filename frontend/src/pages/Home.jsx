import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <Header />

      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Section 1: Speciality Menu */}
          <section className="py-10 sm:py-14 md:py-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-12 leading-tight">
              Find a <span className="text-primary">Specialist</span>
            </h2>
            <SpecialityMenu />
          </section>

          {/* Section 2: Top Doctors */}
          <section className="py-10 sm:py-14 md:py-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-12 leading-tight">
              Our <span className="text-primary">Top Rated</span> Doctors
            </h2>
            <TopDoctors />
          </section>

        </div>

        {/* Section 3: Banner/CTA */}
        <section className="py-10 sm:py-14 md:py-20 bg-white shadow-inner">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Banner />
          </div>
        </section>

      </main>

    </div>
  );
};

export default Home;