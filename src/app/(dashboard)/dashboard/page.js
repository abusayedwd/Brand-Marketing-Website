"use client";

import CardComponent from "@/components/Dashbord/overview/Card";
import Barchart from "@/components/Dashbord/overview/Barchart";
import BarchartforBrand from "@/components/Dashbord/overview/BarchartforBrand";
import BrandAnalytics from "@/components/Dashbord/overview/BrandAnalytics";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";

export default function Dashboard() {
  const { data: loggedUser } = useLogedUserQuery();
  const userRole = loggedUser?.data?.attributes?.role;

  return (
    <div className="space-y-6">
      <div className="px-4 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Workspace
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {userRole === "brand"
            ? "Track campaign pipeline, spend, and progress."
            : "Track earnings, active work, and completed campaigns."}
        </p>
      </div>

      <CardComponent />

      {userRole === "brand" ? (
        <>
          <BrandAnalytics />
          <BarchartforBrand />
        </>
      ) : (
        <Barchart />
      )}
    </div>
  );
}
