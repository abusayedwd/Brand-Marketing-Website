"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/redux/api/apiSlice";
import socket from "@/utils/socket";
import useAuthUser from "@/hooks/useAuthUser";

// Tags refreshed when the server pushes an event (or on each fallback poll).
const CHAT_TAGS = ["Chat", "Notification"];
const ACTIVITY_TAGS = ["Campaign", "CompletedCampaign", "Wallet", "Profile", "Notification"];
const ALL_TAGS = [...new Set([...ACTIVITY_TAGS, ...CHAT_TAGS])];
// Polling skips "Profile": it also backs the public creator lists.
const POLL_TAGS = ALL_TAGS.filter((tag) => tag !== "Profile");

// When the socket can't connect (e.g. https site → http backend), poll instead.
const FALLBACK_POLL_MS = 8000;

/**
 * Keeps campaign / chat / notification data live without page reloads.
 * Listens to the user's socket room and invalidates RTK Query tags so every
 * mounted query refetches; falls back to polling while the socket is down.
 */
export default function RealtimeSync() {
  const dispatch = useDispatch();
  const { user, hasToken } = useAuthUser();
  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!hasToken || !userId) return;

    const refresh = (tags) => dispatch(apiSlice.util.invalidateTags(tags));

    const joinRooms = () => {
      socket.emit("join-user", userId);
      socket.emit("user_connected", userId);
    };

    // Rooms are lost on reconnect, so re-join and catch up on missed events.
    let connectedBefore = false;
    const onConnect = () => {
      joinRooms();
      if (connectedBefore) refresh(ALL_TAGS);
      connectedBefore = true;
    };

    const onNotification = (payload) =>
      refresh(payload?.type === "message" ? CHAT_TAGS : ACTIVITY_TAGS);
    const onMessage = () => refresh(CHAT_TAGS);

    socket.on("connect", onConnect);
    socket.on("notification:new", onNotification);
    socket.on("message:new", onMessage);
    if (socket.connected) onConnect();
    else socket.connect();

    const poll = setInterval(() => {
      if (socket.connected || document.visibilityState !== "visible") return;
      refresh(POLL_TAGS);
    }, FALLBACK_POLL_MS);

    return () => {
      clearInterval(poll);
      socket.off("connect", onConnect);
      socket.off("notification:new", onNotification);
      socket.off("message:new", onMessage);
    };
  }, [dispatch, hasToken, userId]);

  return null;
}
