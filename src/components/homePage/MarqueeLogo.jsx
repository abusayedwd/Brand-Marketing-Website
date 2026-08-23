"use client";

import Marquee from "react-fast-marquee";

const logos = [
  { id: 1, path: "/images/mlogo1.png", alt: "Brand 1" },
  { id: 2, path: "/images/mlogo2.png", alt: "Brand 2" },
  { id: 3, path: "/images/mlogo3.png", alt: "Brand 3" },
  { id: 4, path: "/images/mlogo4.png", alt: "Brand 4" },
  { id: 5, path: "/images/mlogo5.png", alt: "Brand 5" },
  { id: 6, path: "/images/mlogo6.png", alt: "Brand 6" },
  { id: 7, path: "/images/mlogo7.png", alt: "Brand 7" },
  { id: 8, path: "/images/mlogo8.png", alt: "Brand 8" },
];

export default function BrivoMarquee() {
  return (
    <section className="border-b border-emerald-100 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Trusted by teams
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Brands run campaigns on{" "}
              <span className="text-emerald-700">Brivio</span>
            </h2>
          </div>
          <div className="w-full min-w-0 flex-1 overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-white py-5">
            <Marquee direction="left" speed={40} pauseOnHover gradient={false}>
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="mx-5 inline-flex h-12 w-28 items-center justify-center opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    src={logo.path}
                    alt={logo.alt}
                    className="max-h-10 max-w-full object-contain"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
