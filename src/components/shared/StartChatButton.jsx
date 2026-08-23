"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useCreatChatMutation } from "@/redux/fetures/messaging/createChat";
import useAuthUser from "@/hooks/useAuthUser";
import toast from "react-hot-toast";

export default function StartChatButton({
  userId,
  label = "Message",
  className,
  type = "default",
  size = "middle",
}) {
  const router = useRouter();
  const { hasToken, user } = useAuthUser();
  const [createChat, { isLoading }] = useCreatChatMutation();
  const myId = user?.id || user?._id;

  if (!userId || (myId && String(userId) === String(myId))) return null;

  const onClick = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!hasToken) {
      router.push("/auth/login");
      return;
    }
    try {
      const res = await createChat({ receiver: userId }).unwrap();
      const chatId = res?.data?.attributes?.id;
      router.push(chatId ? `/dashboard/messages?chatId=${chatId}` : "/dashboard/messages");
    } catch (err) {
      toast.error(err?.data?.message || "Could not start chat");
    }
  };

  return (
    <Button
      type={type}
      size={size}
      icon={<MessageOutlined />}
      loading={isLoading}
      onClick={onClick}
      className={className}
    >
      {label}
    </Button>
  );
}
