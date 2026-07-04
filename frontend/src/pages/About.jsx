import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center text-3xl sm:text-4xl pt-10 mb-12 text-gray-500 font-light">
        <p>
          ABOUT <span className="text-primary font-extrabold tracking-wider">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
        <div className="w-full md:w-2/5 lg:w-1/3 relative shadow-2xl rounded-xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 ease-in-out">
          <img
            className="w-full h-auto object-cover"
            src={assets.about_image}
            alt="Prescripto team and healthcare platform introduction"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 md:w-3/5 lg:w-2/3 text-base text-gray-700 leading-relaxed">
          <p className="text-lg font-medium text-gray-800 border-l-4 border-primary pl-4">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. We simplify doctor
            appointment scheduling and health management.
          </p>

          <p>
            We continuously improve our platform, integrating advanced features
            for better user experience. Whether it's your first visit or ongoing
            care, <strong>Prescripto supports you at every step.</strong>
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-extrabold text-primary mb-2">Our Vision</h3>
            <p className="italic text-gray-600">
              Our vision is to create a seamless healthcare experience by
              connecting patients with trusted healthcare providers quickly and
              easily.
            </p>
          </div>
        </div>
      </div>

      <hr className="my-16 border-t border-gray-200" />

      <div className="text-center text-3xl sm:text-4xl my-10 text-gray-500 font-light">
        <p>
          WHY <span className="text-gray-700 font-extrabold tracking-wider">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-6">
        {[
          {
            title: "EFFICIENCY",
            desc: "Streamlined appointment scheduling that fits your lifestyle.",
          },
          {
            title: "CONVENIENCE",
            desc: "Access to a network of trusted healthcare professionals.",
          },
          {
            title: "PERSONALIZATION",
            desc: "Tailored recommendations and health reminders.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-white border border-gray-200 rounded-xl px-8 py-10 sm:py-12 flex flex-col gap-4 text-base text-gray-600 shadow-lg group hover:bg-primary hover:text-white hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 ease-in-out"
          >
            <b className="text-xl font-bold mb-2 uppercase text-primary group-hover:text-white">
              {item.title}
            </b>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
