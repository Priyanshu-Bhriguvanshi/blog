import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">Priyanshu Singh</h1>
          <p className="text-sm text-gray-400">Made with ❤️</p>
        </div>

        {/* Middle Section */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="text-sm text-gray-400">Email: contact@example.com</p>
          <br></br>
          <p className="text-sm text-gray-400">Phone: +91 9876543210</p>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex space-x-4">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition duration-300"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-red-500 transition duration-300"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 transition duration-300"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
