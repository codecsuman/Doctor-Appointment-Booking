import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-12 text-sm">
          
          <div className="flex flex-col gap-4">
            <img
              className="w-52 mb-4 filter drop-shadow-md brightness-110"
              src={assets.logo}
              alt="Prescripto"
            />

            <p className="max-w-md text-gray-400 leading-relaxed font-light">
              Prescripto is your trusted platform to book appointments with
              verified doctors and manage your healthcare journey with ease.
            </p>

            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Facebook"
              >
                <img
                  className="w-6 opacity-70 hover:opacity-100 transition-opacity"
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit Twitter"
              >
                <img
                  className="w-6 opacity-70 hover:opacity-100 transition-opacity"
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit LinkedIn"
              >
                <img
                  className="w-6 opacity-70 hover:opacity-100 transition-opacity"
                  src="https://cdn-icons-png.flaticon.com/512/733/733561.png"
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>

          <nav>
            <p className="text-lg font-bold mb-5 text-white uppercase tracking-wider border-b-2 border-primary pb-1">
              Company
            </p>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors">Find Doctors</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </nav>

          <nav>
            <p className="text-lg font-bold mb-5 text-white uppercase tracking-wider border-b-2 border-primary pb-1">
              Support
            </p>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </nav>

          <div>
            <p className="text-lg font-bold mb-5 text-white uppercase tracking-wider border-b-2 border-primary pb-1">
              Get in Touch
            </p>
            <address className="not-italic">
              <ul className="flex flex-col gap-3 text-gray-400">
                <li>
                  <a
                    href="tel:+918597376239"
                    className="hover:text-primary transition-colors"
                  >
                    +91 8597376239
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@prescripto.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@prescripto.com
                  </a>
                </li>
                <li className="mt-2">Kolkata, India</li>
              </ul>
            </address>
          </div>
        </div>

        <hr className="mt-12 border-gray-700" />

        <p className="py-5 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Prescripto.com — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
