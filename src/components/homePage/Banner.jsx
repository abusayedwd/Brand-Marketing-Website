"use client";

import { Input, Button } from "antd";
import { SearchOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PLATFORMS = [
  "TikTok",
  "Facebook",
  "Instagram",
  "YouTube",
  "Snapchat",
  "Twitter",
];

const Banner = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  const handleSearch = () => {
    onSearch?.({ searchValue, platform: "" });
  };

  const handlePopularClick = (platform) => {
    onSearch?.({ searchValue, platform });
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-10 sm:py-14 md:py-20"
      style={{ backgroundImage: "url('/images/bannerbg.png')" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Copy + search */}
          <div className="min-w-0 space-y-4 sm:space-y-6">
            <p className="text-xs font-medium uppercase tracking-wide text-white sm:text-sm">
              Go to your content creator platform
            </p>

            <h1 className="text-3xl font-bold leading-tight text-[#060C8C] sm:text-4xl md:text-5xl">
              <span className="block">Connecting Your</span>
              <span className="block">Brand With The</span>
              <span className="block">Right Voices</span>
            </h1>

            <div className="h-1 w-36 rounded-full bg-gradient-to-r from-orange-300 to-orange-200 md:w-48" />

            <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row">
              <Input
                size="large"
                placeholder="Search by name & profession"
                prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
                className="!h-11 !min-w-0 !flex-1 !rounded-lg !border-0 sm:!h-12"
                style={{
                  background: "linear-gradient(to right, #F4F7FC, #91939629)",
                }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={handleSearch}
              />
              <Button
                type="primary"
                size="large"
                className="!h-11 !shrink-0 !rounded-lg !border-0 !px-6 !font-semibold sm:!h-12"
                style={{
                  background: "linear-gradient(to right, #3b82f6, #22c55e)",
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>

            <div className="pt-1 sm:pt-2">
              <p className="mb-2 text-sm font-medium text-gray-800 md:text-base">
                Popular search by
              </p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePopularClick(platform)}
                    className="shrink-0 rounded-full border border-gray-300 bg-gradient-to-r from-[#F4F7FC] to-[#91939629] px-3 py-1.5 text-xs text-gray-800 transition hover:border-blue-400 sm:text-sm"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual collage */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Mobile / small tablet grid */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">
              <div className="rounded-xl bg-white p-2 shadow-md">
                <div className="mb-1 flex items-center gap-1">
                  <div className="rounded-full bg-blue-50 p-1">
                    <HeartFilled style={{ color: "#3b82f6", fontSize: 12 }} />
                  </div>
                  <p className="text-[11px] font-semibold leading-tight text-blue-900">
                    99.99%
                    <br />
                    Satisfied users
                  </p>
                </div>
                <Image
                  src="/images/banner1.png"
                  width={160}
                  height={120}
                  alt="Satisfied user"
                  className="h-24 w-full rounded-lg object-cover"
                />
              </div>

              <div className="rounded-xl bg-white p-2 shadow-md">
                <Image
                  src="/images/banner2.png"
                  width={160}
                  height={160}
                  alt="Creator"
                  className="h-32 w-full rounded-lg object-cover"
                />
              </div>

              <div className="rounded-xl bg-white p-2 shadow-md">
                <Image
                  src="/images/banner3.png"
                  width={160}
                  height={160}
                  alt="Content creator with phone"
                  className="h-32 w-full rounded-lg object-cover"
                />
              </div>

              <div className="rounded-xl bg-white p-2 shadow-md">
                <div className="rounded-lg bg-yellow-100 p-2">
                  <Image
                    src="/images/banner4.png"
                    width={140}
                    height={100}
                    alt="Creator profile"
                    className="h-20 w-full object-cover"
                  />
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <div className="rounded-full bg-blue-100 p-1">
                    <UserOutlined style={{ color: "#3b82f6", fontSize: 12 }} />
                  </div>
                  <p className="text-[11px] font-semibold leading-tight text-blue-900">
                    1000+ Creators
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop / tablet collage */}
            <div
              className="relative hidden h-[380px] sm:block md:h-[460px] lg:h-[500px]"
              data-aos="fade-left"
            >
              <div
                className="absolute left-[4%] top-0 z-10 w-[42%] max-w-[190px] rounded-xl bg-white p-3 shadow-md md:left-[12%]"
                data-aos="fade-down-right"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-full bg-blue-50 p-1">
                    <HeartFilled style={{ color: "#3b82f6" }} />
                  </div>
                  <p className="text-sm font-semibold leading-tight text-blue-900">
                    99.99%
                    <br />
                    Satisfied users
                  </p>
                </div>
                <Image
                  src="/images/banner1.png"
                  width={180}
                  height={180}
                  alt="Satisfied user"
                  className="h-36 w-full rounded-lg object-cover md:h-44"
                />
              </div>

              <div
                className="absolute right-[6%] top-6 z-20 w-[44%] max-w-[200px] rounded-xl bg-white p-3 shadow-md md:right-[10%] md:top-4"
                data-aos="fade-down-left"
              >
                <Image
                  src="/images/banner2.png"
                  width={190}
                  height={190}
                  alt="Creator"
                  className="h-44 w-full rounded-lg object-cover md:h-52"
                />
              </div>

              <div className="absolute bottom-2 left-[6%] z-10 w-[40%] max-w-[180px] rounded-xl bg-white p-3 shadow-md md:left-[14%] md:bottom-4">
                <Image
                  src="/images/banner3.png"
                  width={180}
                  height={180}
                  alt="Content creator with phone"
                  className="h-40 w-full rounded-lg object-cover md:h-44"
                />
              </div>

              <div className="absolute bottom-0 right-[4%] z-20 w-[44%] max-w-[200px] rounded-xl bg-white p-3 shadow-md md:bottom-2 md:right-[12%]">
                <div className="mb-2 rounded-lg bg-yellow-100 p-2">
                  <Image
                    src="/images/banner4.png"
                    width={160}
                    height={140}
                    alt="Creator profile"
                    className="h-32 w-full object-cover md:h-36"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-1">
                    <UserOutlined style={{ color: "#3b82f6" }} />
                  </div>
                  <p className="text-sm font-semibold leading-tight text-blue-900">
                    1000+
                    <br />
                    Content Creators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
