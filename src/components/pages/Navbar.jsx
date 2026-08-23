"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";

const menuItems = [
  { title: "Home", path: "/" },
  { title: "Creators", path: "/influencer" },
  { title: "Pricing", path: "/pricing" },
  { title: "Support", path: "/support" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useLogedUserQuery();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <Toaster position="top-center" />
      <nav className="border-b border-emerald-900/10 bg-[#0b1f17] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="min-w-0 shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <img
              className="h-9 w-auto max-w-[140px] object-contain sm:h-10 md:h-12 md:max-w-none"
              src="/images/logo.png"
              alt="Brivio"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-300 ${
                  pathname === item.path ? "text-emerald-300" : "text-emerald-50/85"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Button
                  onClick={() => router.push("/dashboard/messages")}
                  className="!h-10 !rounded-xl !border-white/20 !bg-transparent !text-white hover:!border-emerald-300 hover:!text-emerald-200"
                >
                  Messages
                </Button>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="!h-10 !rounded-xl !border-0 !bg-emerald-500 !font-semibold !text-[#0b1f17] hover:!bg-emerald-400"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button className="!h-10 !rounded-xl !border-white/20 !bg-transparent !text-white hover:!border-emerald-300 hover:!text-emerald-200">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/singup">
                  <Button className="!h-10 !rounded-xl !border-0 !bg-emerald-500 !font-semibold !text-[#0b1f17] hover:!bg-emerald-400">
                    Get started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseOutlined style={{ fontSize: 20 }} />
            ) : (
              <MenuOutlined style={{ fontSize: 22 }} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-white/10 bg-[#0b1f17] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-white/5 ${
                    pathname === item.path ? "bg-white/5 text-emerald-300" : "text-emerald-50/90"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              {user && (
                <>
                  <Link
                    href="/dashboard/messages"
                    className="rounded-lg px-3 py-3 text-base text-emerald-50/90 hover:bg-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Messages
                  </Link>
                  <Link
                    href="/dashboard"
                    className="mt-2 rounded-lg border-t border-white/10 px-3 pt-4 text-base text-emerald-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {!user && (
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row">
                <Link href="/auth/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button block className="!h-11 !rounded-xl !border-white/20 !bg-transparent !text-white">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/singup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    block
                    className="!h-11 !rounded-xl !border-0 !bg-emerald-500 !font-semibold !text-[#0b1f17]"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
