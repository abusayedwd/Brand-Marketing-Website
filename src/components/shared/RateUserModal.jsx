"use client";

import { useState } from "react";
import { Button, Modal, Rate, Input } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useCreateRatingMutation, useGetUserRatingsQuery } from "@/redux/fetures/ratings/ratings";
import useAuthUser from "@/hooks/useAuthUser";
import toast from "react-hot-toast";

const { TextArea } = Input;

export default function RateUserModal({
  campaignId,
  toUserId,
  toName = "this user",
  disabled = false,
}) {
  const { user } = useAuthUser();
  const myId = user?.id || user?._id;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(5);
  const [review, setReview] = useState("");
  const [createRating, { isLoading }] = useCreateRatingMutation();
  const { data } = useGetUserRatingsQuery(toUserId, { skip: !toUserId });

  const alreadyRated = (data?.data?.attributes?.ratings || []).some((r) => {
    const fromId = r.fromUserId?.id || r.fromUserId?._id || r.fromUserId;
    const campId = r.campaignId?.id || r.campaignId?._id || r.campaignId;
    return String(fromId) === String(myId) && String(campId) === String(campaignId);
  });

  if (!campaignId || !toUserId || (myId && String(toUserId) === String(myId))) return null;

  const onSubmit = async () => {
    try {
      await createRating({
        campaignId,
        toUserId,
        rating: value,
        review,
      }).unwrap();
      toast.success("Review submitted");
      setOpen(false);
      setReview("");
    } catch (err) {
      toast.error(err?.data?.message || "Could not submit review");
    }
  };

  return (
    <>
      <Button
        icon={<StarOutlined />}
        disabled={disabled || alreadyRated}
        onClick={() => setOpen(true)}
      >
        {alreadyRated ? "Rated" : "Rate"}
      </Button>
      <Modal
        title={`Rate ${toName}`}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onSubmit}
        okText="Submit review"
        confirmLoading={isLoading}
      >
        <p className="mb-3 text-sm text-slate-500">
          How was working with {toName} on this campaign?
        </p>
        <Rate value={value} onChange={setValue} />
        <TextArea
          className="mt-4"
          rows={4}
          maxLength={1000}
          placeholder="Share a short review (optional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </Modal>
    </>
  );
}
