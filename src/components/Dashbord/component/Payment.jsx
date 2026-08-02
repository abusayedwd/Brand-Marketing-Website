"use client";

import React, { useMemo, useState } from "react";
import { Table, Modal, Tag, Spin, Empty } from "antd";
import {
  CreditCardOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useCampaignPaymentQuery } from "@/redux/fetures/payment/campaignPayment";
import url from "@/redux/api/baseUrl";

const statusMeta = {
  paid: { color: "success", icon: <CheckCircleOutlined />, label: "Paid" },
  succeeded: { color: "success", icon: <CheckCircleOutlined />, label: "Paid" },
  success: { color: "success", icon: <CheckCircleOutlined />, label: "Paid" },
  pending: { color: "warning", icon: <ClockCircleOutlined />, label: "Pending" },
  failed: { color: "error", icon: <CloseCircleOutlined />, label: "Failed" },
  cancelled: { color: "default", icon: <CloseCircleOutlined />, label: "Cancelled" },
};

const PaymentRequestList = () => {
  const { data: transactionData, isLoading } = useCampaignPaymentQuery();
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    const results = transactionData?.data?.attributes?.results || [];
    return results.map((t) => ({
      key: t.id || t._id,
      id: t.id || t._id,
      amount: Number(t.amount) || 0,
      status: (t.paymentStatus || t.status || "pending").toLowerCase(),
      date: t.transactionDate || t.createdAt,
      campaign: t.campaignId,
      brand: t.brandId,
    }));
  }, [transactionData]);

  const totalPaid = rows
    .filter((r) => ["paid", "succeeded", "success"].includes(r.status))
    .reduce((s, r) => s + r.amount, 0);

  const columns = [
    {
      title: "#",
      width: 56,
      render: (_, __, i) => (
        <span className="text-slate-400">{i + 1}</span>
      ),
    },
    {
      title: "Campaign",
      key: "campaign",
      render: (_, row) => (
        <div>
          <p className="font-semibold text-slate-900">
            {row.campaign?.campaignName || "—"}
          </p>
          <p className="max-w-xs truncate text-xs text-slate-500">
            {row.id}
          </p>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="font-semibold text-emerald-800">
          ${Number(amount).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (d) =>
        d ? new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const meta = statusMeta[status] || statusMeta.pending;
        return (
          <Tag color={meta.color} icon={meta.icon}>
            {meta.label}
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (_, row) => (
        <button
          type="button"
          onClick={() => setSelected(row)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:underline"
        >
          <EyeOutlined /> Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-[#0b1f17] px-6 py-8 text-white sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(16,185,129,0.25),transparent_45%)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Payments
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Campaign payment history
            </h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-50/75">
              Stripe checkout records for your campaigns — open a row for full details.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
            <p className="text-xs uppercase tracking-wide text-emerald-300">Total paid</p>
            <p className="text-2xl font-bold text-white">
              ${totalPaid.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Spin />
          </div>
        ) : rows.length === 0 ? (
          <div className="py-16">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No payment records yet"
            />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={rows}
            rowKey="key"
            pagination={{ pageSize: 8, showSizeChanger: false }}
            className="payment-table"
          />
        )}
      </div>

      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        width={560}
        title={
          <span className="inline-flex items-center gap-2">
            <CreditCardOutlined className="text-emerald-700" />
            Payment details
          </span>
        }
      >
        {selected && (
          <div className="space-y-5 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-emerald-50/80 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Amount</p>
                <p className="text-2xl font-bold text-emerald-900">
                  ${selected.amount.toLocaleString()}
                </p>
              </div>
              <Tag
                color={(statusMeta[selected.status] || statusMeta.pending).color}
                icon={(statusMeta[selected.status] || statusMeta.pending).icon}
                className="!text-sm"
              >
                {(statusMeta[selected.status] || statusMeta.pending).label}
              </Tag>
            </div>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-slate-400">Transaction ID</dt>
                <dd className="mt-0.5 break-all font-medium text-slate-800">{selected.id}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-slate-400">Date</dt>
                <dd className="mt-0.5 font-medium text-slate-800">
                  {selected.date
                    ? new Date(selected.date).toLocaleString()
                    : "—"}
                </dd>
              </div>
            </dl>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-sm font-semibold text-slate-900">Campaign</h3>
              <div className="mt-3 flex gap-3">
                {selected.campaign?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      selected.campaign.image.startsWith("http")
                        ? selected.campaign.image
                        : `${url}${selected.campaign.image}`
                    }
                    alt=""
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {selected.campaign?.campaignName || "—"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {selected.campaign?.description || "No description"}
                  </p>
                  {(selected.campaign?.startDate || selected.campaign?.endDate) && (
                    <p className="mt-2 text-xs text-slate-400">
                      {selected.campaign?.startDate
                        ? new Date(selected.campaign.startDate).toLocaleDateString()
                        : "—"}{" "}
                      –{" "}
                      {selected.campaign?.endDate
                        ? new Date(selected.campaign.endDate).toLocaleDateString()
                        : "—"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {selected.brand && (
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-sm font-semibold text-slate-900">Brand</h3>
                <p className="mt-2 font-medium text-slate-800">
                  {selected.brand.fullName || "—"}
                </p>
                <p className="text-sm text-slate-500">{selected.brand.email}</p>
                {selected.brand.phoneNumber && (
                  <p className="text-sm text-slate-500">{selected.brand.phoneNumber}</p>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .payment-table .ant-table {
          background: transparent;
        }
        .payment-table .ant-table-thead > tr > th {
          background: #ecfdf5 !important;
          color: #065f46;
          font-weight: 600;
          border-bottom: 1px solid #d1fae5 !important;
        }
        .payment-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9 !important;
        }
      `}</style>
    </div>
  );
};

export default PaymentRequestList;
