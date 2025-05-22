"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center  py-16 px-4 md:px-8"
      style={{
        backgroundImage: "url('/images/bannerbg.png')", // Replace with your background image
      }}
    >
      <div className=" container text-black grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo and About Info */}
        <div className="md:col-span-2">
            <div className="my-4">

        <img src="/images/logo.png" alt="" className="h-16" /> 
            </div>

            <div> 
  <p class="text-sm leading-relaxed text-black">
    Welcome to **Brivio**, an innovative platform designed to help businesses elevate their brands through authentic content and impactful promotional campaigns. We connect businesses with top-tier content creators, making it easy to generate high-quality content tailored to your brand’s unique voice.
  </p>
  <p class="text-sm mt-4">
    Whether you’re looking to create engaging blog posts, social media content, or launch strategic marketing campaigns, **Brivio** is your trusted partner in creating powerful and effective content. Let us help you build the future of your brand.
  </p>
</div>



        </div>

        {/* Column 2: Explore Links */}
        <div className="md:ml-20 ">
          <h3 className="text-lg font-semibold text-[#0178EE] mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="text-sm  hover:text-white transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <Link
                href="/aboutus"
                className="text-sm  hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-sm  hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm  hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm  hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

  
 

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#0178EE] mb-4">
            Get In Touch
          </h3>
          <ul className="space-y-2">
            <li>
              <p className="text-sm ">paerdu@gmail.com</p>
            </li>
            <li>
              <p className="text-sm ">(009) 555 678 90</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
