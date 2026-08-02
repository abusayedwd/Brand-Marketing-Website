"use client";

import { useGetAcceptedCampaignsForInfluencerQuery } from "@/redux/fetures/campaign/getMyAcceptedCampaign";
import { useUpcommingCampaignQuery } from "@/redux/fetures/campaign/upcommingCampaign";
import { useGetInfluencerStatusQuery } from "@/redux/fetures/wallet/getInfluencerStatus";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import { useGetMyCampaignQuery } from "@/redux/fetures/campaign/getMyCampaign";
import {
  FaMoneyBillWave,
  FaWallet,
  FaBullhorn,
  FaClipboardList,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const StatCard = ({ icon: Icon, label, value, tone }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-[0_10px_30px_rgba(6,78,59,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(6,78,59,0.1)]">
    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-50 transition group-hover:scale-110" />
    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          {value ?? "—"}
        </p>
      </div>
      <div className={`rounded-xl p-3 ${tone}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const CardComponent = () => {
  const { data: loggedUser } = useLogedUserQuery();
  const role = loggedUser?.data?.attributes?.role;

  const { data: status } = useGetInfluencerStatusQuery(undefined, {
    skip: role !== "influencer",
  });
  const { data: acceptedCampaignns } = useGetAcceptedCampaignsForInfluencerQuery(undefined, {
    skip: role !== "influencer",
  });
  const { data: myCampaign } = useUpcommingCampaignQuery(undefined, {
    skip: role !== "influencer",
  });
  const { data: brandCampaigns } = useGetMyCampaignQuery(undefined, {
    skip: role !== "brand",
  });

  const acceptedCampaignn = acceptedCampaignns?.data?.attributes?.results || [];
  const campaigns = myCampaign?.data?.attributes?.results || [];
  const brandList = brandCampaigns?.data?.attributes?.results || [];

  const activeCampaigns = acceptedCampaignn.filter((c) => c.status === "active");
  const completedCampaignsCount =
    status?.data?.attributes?.completedCampaignsCount ?? 0;

  const brandActive = brandList.filter((c) => c.status === "active").length;
  const brandUpcoming = brandList.filter((c) => c.status === "upComming").length;
  const brandCompleted = brandList.filter((c) => c.status === "completed").length;
  const brandPending = brandList.filter((c) => c.status === "pending").length;

  if (role === "brand") {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FaClipboardList}
          label="Total campaigns"
          value={brandList.length}
          tone="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          icon={FaHourglassHalf}
          label="Payment pending"
          value={brandPending}
          tone="bg-amber-50 text-amber-700"
        />
        <StatCard
          icon={FaBullhorn}
          label="Upcoming"
          value={brandUpcoming}
          tone="bg-sky-50 text-sky-700"
        />
        <StatCard
          icon={FaCheckCircle}
          label="Active / Completed"
          value={`${brandActive} / ${brandCompleted}`}
          tone="bg-teal-50 text-teal-700"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        icon={FaMoneyBillWave}
        label="Total earning"
        value={status?.data?.attributes?.totalEarnings}
        tone="bg-emerald-50 text-emerald-700"
      />
      <StatCard
        icon={FaWallet}
        label="Total withdraw"
        value={status?.data?.attributes?.totalWithdrawals}
        tone="bg-rose-50 text-rose-700"
      />
      <StatCard
        icon={FaWallet}
        label="Current balance"
        value={status?.data?.attributes?.currentBalance}
        tone="bg-teal-50 text-teal-700"
      />
      <StatCard
        icon={FaClipboardList}
        label="Upcoming campaigns"
        value={campaigns.length}
        tone="bg-sky-50 text-sky-700"
      />
      <StatCard
        icon={FaBullhorn}
        label="Active campaigns"
        value={activeCampaigns.length}
        tone="bg-amber-50 text-amber-700"
      />
      <StatCard
        icon={FaCheckCircle}
        label="Completed campaigns"
        value={completedCampaignsCount}
        tone="bg-green-50 text-green-700"
      />
    </div>
  );
};

export default CardComponent;
