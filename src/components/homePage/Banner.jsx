
"use client";
import { Input, Button, Card } from "antd";
import { SearchOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
import Image from "next/image";

const Banner = () => {
  return (
    <div
      className="w-full py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/bannerbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className=""></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <p className="text-white font-medium tracking-wide uppercase text-sm">
              GO TO YOUR INFLUENCER PLATFORM
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#003165]">
  <span className="block mb-2">Connecting Your</span>
  <span className="block mb-2">Brand With The</span>
  <span className="block">Right Voices</span>
</h1>


            <div className="relative h-2">
              <div className="absolute w-48 h-1 bg-gradient-to-r from-orange-300 to-orange-200 rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Search by name & profession"
                prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
                className="py-2 rounded-md text-gray-700"
                style={{
                  height: "44px",
                  background: "linear-gradient(to right, #F4F7FC, #91939629)", // Gradient for the input field
                  border: "none", // Removing default border to show gradient clearly
                }}
              />
              <Button
                type="primary"
                className="py-2 rounded-md text-white"
                style={{
                  height: "44px",
                  background: "linear-gradient(to right, #3b82f6, #22c55e)", // Gradient applied here
                }}
              >
                Search
              </Button>
            </div>

            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-800 font-medium">
                  Popular search by
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TikTok",
                    "Facebook",
                    "Instagram",
                    "You tube",
                    "SNapchat",
                  ].map((platform) => (
                    <Button
                      key={platform}
                      shape="round"
                      className=" bg-transparent border border-gray-300"
                      style={{
                        borderRadius: "30px",
                        padding: "8px 20px",
                        background:
                          "linear-gradient(to right, #F4F7FC, #91939629)",
                      }}
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image cards */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Satisfaction card */}
            <Card
              className="absolute left-[20%] rounded-l-lg shadow-md"
              style={{ width: 190, padding: 0 }}
              bodyStyle={{ padding: 12 }}
            >
              <div className="flex items-center rounded-l-lg gap-2">
                <div className="bg-blue-50 p-1 rounded-full">
                  <HeartFilled style={{ color: "#3b82f6" }} />
                </div>
                <div className="text-sm font-semibold text-blue-900">
                  99.99% <br />
                  Satisfied user's
                </div>
              </div>
              <div className="mt-2">
                <Image
                  src="/images/banner1.png"
                  width={180}
                  height={150}
                  alt="Satisfied user"
                  className="rounded-lg object-cover "
                />
              </div>
            </Card>

            {/* Makeup artist card */}
            <Card
              className="absolute left-[50%] rounded-xl shadow-md z-20"
              style={{ width: 200, padding: 0 }}
              bodyStyle={{ padding: 12 }}
            >
              <Image
                src="/images/banner2.png"
                width={190}
                height={190}
                alt="Makeup artist"
                className="rounded-lg h-52 object-cover animate-bounce"
              />
            </Card>

            {/* Pink outfit card */}
            <Card
              className="absolute bottom-0  left-[21%]"
              style={{ width: 180, padding: 0 }}
              bodyStyle={{ padding: 12 }}
            >
              <Image
                src="/images/banner3.png"
                width={180}
                height={190}
                alt="Influencer with phone"
                className=" rounded-b-lg object-cover h-48 animate-bounce"
              />
            </Card>

            {/* Popular influence card */}

            <Card
              className="absolute -bottom-5 right-[24%] rounded-xl "
              style={{ width: 200, padding: 0 }}
              bodyStyle={{ padding: 12 }}
            >
              <div className="bg-yellow-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/images/banner4.png"
                    width={140}
                    height={140}
                    alt="Profile"
                    className=" h-40"
                  />
                </div>
              </div>
              <div className="flex relative  items-center gap-2 mb-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <UserOutlined style={{ color: "#3b82f6" }} />
                </div>
                <div className="text-sm font-semibold text-blue-900">
                  1000+ <br />
                  Popular influence
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
