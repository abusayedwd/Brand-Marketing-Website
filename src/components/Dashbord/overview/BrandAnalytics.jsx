"use client";

import { useGetBrandAnalyticsQuery } from "@/redux/fetures/campaign/brandAnalytics";
import { Table, Tag } from "antd";

const Metric = ({ label, value }) => (
  <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-slate-900">{value ?? "—"}</p>
  </div>
);

export default function BrandAnalytics() {
  const { data, isLoading } = useGetBrandAnalyticsQuery();
  const stats = data?.data?.attributes;

  const columns = [
    { title: "Campaign", dataIndex: "campaignName", key: "campaignName" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => <Tag>{s}</Tag>,
    },
    { title: "Spend", dataIndex: "totalAmount", key: "totalAmount", render: (v) => `$${v || 0}` },
    { title: "Accepted", dataIndex: "acceptedCount", key: "acceptedCount" },
    { title: "Drafts OK", dataIndex: "draftsApproved", key: "draftsApproved" },
    { title: "Pending", dataIndex: "draftsPending", key: "draftsPending" },
    {
      title: "Completion",
      dataIndex: "completionRate",
      key: "completionRate",
      render: (v) => `${v || 0}%`,
    },
  ];

  return (
    <div className="space-y-4 px-4 pb-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Campaign analytics</h2>
        <p className="text-sm text-slate-500">Spend, pipeline, and draft completion across your campaigns.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Total spend" value={isLoading ? "…" : `$${stats?.totalSpend || 0}`} />
        <Metric label="Active" value={isLoading ? "…" : stats?.active || 0} />
        <Metric label="Drafts pending" value={isLoading ? "…" : stats?.draftsPending || 0} />
        <Metric label="Drafts approved" value={isLoading ? "…" : stats?.draftsApproved || 0} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={stats?.campaigns || []}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
