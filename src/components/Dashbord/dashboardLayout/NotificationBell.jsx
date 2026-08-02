"use client";

import { Badge, Button, Dropdown, Empty, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/fetures/notification/notifications";

export default function NotificationBell() {
  const { data: countData } = useGetUnreadCountQuery();
  const { data, isLoading } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAll] = useMarkAllNotificationsReadMutation();

  const count = countData?.data?.attributes?.count || 0;
  const items = data?.data?.attributes?.results || [];

  const menu = {
    items: [
      {
        key: "header",
        label: (
          <div className="flex items-center justify-between gap-4 px-1 py-1">
            <span className="font-semibold text-slate-800">Notifications</span>
            <Button size="small" type="link" onClick={() => markAll()}>
              Mark all read
            </Button>
          </div>
        ),
        disabled: true,
      },
      { type: "divider" },
      ...(isLoading
        ? [{ key: "loading", label: <Spin size="small" />, disabled: true }]
        : items.length === 0
          ? [{ key: "empty", label: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notifications" />, disabled: true }]
          : items.slice(0, 8).map((n) => ({
              key: n.id,
              label: (
                <button
                  type="button"
                  className={`w-64 text-left ${n.isRead ? "opacity-70" : ""}`}
                  onClick={() => markRead(n.id)}
                >
                  <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{n.message}</p>
                  {n.link ? (
                    <Link href={n.link} className="text-xs text-emerald-700">
                      Open
                    </Link>
                  ) : null}
                </button>
              ),
            }))),
    ],
  };

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <button type="button" className="mr-3 rounded-full p-2 hover:bg-white/50">
        <Badge count={count} size="small">
          <BellOutlined className="text-xl text-slate-700" />
        </Badge>
      </button>
    </Dropdown>
  );
}
