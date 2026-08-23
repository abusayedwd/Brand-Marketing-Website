"use client";

import { useEffect } from "react";
import { Badge, Button, Dropdown, Empty, Spin, message } from "antd";
import { BellOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/fetures/notification/notifications";
import socket from "@/utils/socket";
import useAuthUser from "@/hooks/useAuthUser";

export default function NotificationBell() {
  const { user, hasToken } = useAuthUser();
  const userId = user?.id || user?._id;

  const { data: countData, refetch: refetchCount } = useGetUnreadCountQuery(undefined, {
    skip: !hasToken,
    pollingInterval: 60000,
  });
  const { data, isLoading, refetch: refetchList } = useGetNotificationsQuery(undefined, {
    skip: !hasToken,
  });
  const [markRead] = useMarkNotificationReadMutation();
  const [markAll] = useMarkAllNotificationsReadMutation();

  const refresh = () => {
    refetchCount();
    refetchList();
  };

  useEffect(() => {
    if (!hasToken || !userId) return;

    if (!socket.connected) socket.connect();
    socket.emit("join-user", userId);

    const onNew = (payload) => {
      message.info({
        content: payload?.title || "New notification",
        duration: 3,
      });
      refresh();
    };

    socket.on("notification:new", onNew);
    return () => {
      socket.off("notification:new", onNew);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken, userId]);

  const count = countData?.data?.attributes?.count || 0;
  const items = data?.data?.attributes?.results || [];

  const onMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
      refresh();
    } catch (_) {}
  };

  const onMarkAll = async () => {
    try {
      await markAll().unwrap();
      refresh();
    } catch (_) {}
  };

  const menu = {
    items: [
      {
        key: "header",
        label: (
          <div className="flex min-w-[260px] items-center justify-between gap-3 px-1 py-1 sm:min-w-[300px]">
            <span className="font-semibold text-slate-800">Notifications</span>
            {count > 0 ? (
              <Button size="small" type="link" onClick={onMarkAll}>
                Mark all read
              </Button>
            ) : null}
          </div>
        ),
        disabled: true,
      },
      { type: "divider" },
      ...(isLoading
        ? [{ key: "loading", label: <Spin size="small" />, disabled: true }]
        : items.length === 0
          ? [
              {
                key: "empty",
                label: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No notifications yet"
                  />
                ),
                disabled: true,
              },
            ]
          : items.slice(0, 10).map((n) => ({
              key: n.id || n._id,
              label: (
                <div
                  className={`w-[260px] text-left sm:w-[300px] ${n.isRead ? "opacity-70" : ""}`}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => onMarkRead(n.id || n._id)}
                  >
                    <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{n.message}</p>
                  </button>
                  {n.link ? (
                    <Link
                      href={n.link}
                      className="mt-1 inline-block text-xs font-medium text-emerald-700 hover:underline"
                      onClick={() => onMarkRead(n.id || n._id)}
                    >
                      Open
                    </Link>
                  ) : null}
                </div>
              ),
            }))),
    ],
  };

  if (!hasToken) return null;

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
      <button
        type="button"
        className="mr-2 rounded-full p-2 hover:bg-black/5 sm:mr-3"
        aria-label="Notifications"
      >
        <Badge count={count} size="small" overflowCount={99}>
          <BellOutlined className="text-xl text-slate-700" />
        </Badge>
      </button>
    </Dropdown>
  );
}
