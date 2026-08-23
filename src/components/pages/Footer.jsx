"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-emerald-900/10 bg-[#0b1f17] px-4 py-12 text-emerald-50 sm:py-14 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <img
            src="/images/logo.png"
            alt="Brivio"
            className="h-12 w-auto object-contain brightness-110 sm:h-14"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-emerald-100/80">
            Brivio connects brands with creators for authentic campaigns,
            clearer workflows, and better results.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/influencer" className="hover:text-white">
                Creators
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">
            Legal & help
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <a href="mailto:support@brivio.app" className="break-all hover:text-white">
                support@brivio.app
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-emerald-100/60">
        © {new Date().getFullYear()} Brivio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
