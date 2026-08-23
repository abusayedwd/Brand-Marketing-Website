"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import {
  useGetFavoriteStatusQuery,
  useToggleFavoriteMutation,
} from "@/redux/fetures/favorites/favorites";
import useAuthUser from "@/hooks/useAuthUser";
import toast from "react-hot-toast";

export default function FavoriteButton({
  influencerId,
  className,
  size = "middle",
}) {
  const router = useRouter();
  const { hasToken, role } = useAuthUser();
  const skip = !hasToken || role !== "brand" || !influencerId;
  const { data } = useGetFavoriteStatusQuery(influencerId, { skip });
  const [toggleFavorite, { isLoading }] = useToggleFavoriteMutation();
  const favorited = !!data?.data?.attributes?.favorited;

  if (hasToken && role !== "brand") return null;

  const onClick = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!hasToken) {
      router.push("/auth/login");
      return;
    }
    try {
      const res = await toggleFavorite(influencerId).unwrap();
      const nowFavorited = res?.data?.attributes?.favorited;
      toast.success(nowFavorited ? "Saved to favorites" : "Removed from favorites");
    } catch (err) {
      toast.error(err?.data?.message || "Could not update favorite");
    }
  };

  return (
    <Button
      size={size}
      loading={isLoading}
      onClick={onClick}
      icon={favorited ? <HeartFilled /> : <HeartOutlined />}
      className={className}
      style={favorited ? { color: "#e11d48", borderColor: "#fda4af" } : undefined}
    >
      {favorited ? "Saved" : "Save"}
    </Button>
  );
}
