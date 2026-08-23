"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Empty, Spin } from "antd";
import { Menu, Send } from "lucide-react";
import getMediaUrl from "@/utils/getMediaUrl";
import socket from "@/utils/socket";
import { useGetChatlistQuery } from "@/redux/fetures/messaging/getChatlist";
import { useGetMessageQuery } from "@/redux/fetures/messaging/getMessage";
import { useSendMessageMutation } from "@/redux/fetures/messaging/sendMessage";
import useAuthUser from "@/hooks/useAuthUser";

const senderIdOf = (msg) => msg?.sender?.id || msg?.sender?._id || msg?.sender;
const messageIdOf = (msg) => msg?.id || msg?._id;

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const chatIdFromQuery = searchParams.get("chatId");
  const { user } = useAuthUser();
  const userId = user?.id || user?._id;

  const { data: chatList, isLoading: listLoading } = useGetChatlistQuery(undefined, {
    skip: !userId,
  });
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

  const [activeChatId, setActiveChatId] = useState(chatIdFromQuery || null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [unread, setUnread] = useState({});
  const messagesEndRef = useRef(null);
  const processedRef = useRef(new Set());

  const { data: messagesData, isLoading: messagesLoading } = useGetMessageQuery(
    activeChatId,
    { skip: !activeChatId }
  );

  const chats = chatList?.data?.attributes || [];
  const threads = useMemo(
    () =>
      chats.map((chat) => {
        const participant = (chat.participants || []).find(
          (p) => String(p.id || p._id) !== String(userId)
        );
        return {
          id: participant?.id || participant?._id,
          name: participant?.fullName || "Conversation",
          role: participant?.role,
          avatar: getMediaUrl(participant?.image),
          chatId: chat.id || chat._id,
          lastMessage: chat.lastMessage || "",
        };
      }),
    [chats, userId]
  );

  const activeUser = threads.find((t) => t.chatId === activeChatId) || null;

  useEffect(() => {
    if (chatIdFromQuery) setActiveChatId(chatIdFromQuery);
  }, [chatIdFromQuery]);

  useEffect(() => {
    if (!activeChatId && threads[0]?.chatId) {
      setActiveChatId(threads[0].chatId);
    }
  }, [activeChatId, threads]);

  useEffect(() => {
    if (!userId) return;
    if (!socket.connected) socket.connect();
    socket.emit("join-user", userId);
    socket.emit("user_connected", userId);
  }, [userId]);

  useEffect(() => {
    if (!activeChatId) return;
    socket.emit("join_chat", activeChatId);

    const eventName = `messages::${activeChatId}`;
    const onIncoming = (message) => {
      const id = messageIdOf(message);
      if (id && processedRef.current.has(id)) return;
      if (id) processedRef.current.add(id);
      setMessages((prev) => {
        if (id && prev.some((m) => messageIdOf(m) === id)) return prev;
        return [...prev, message];
      });
    };

    socket.on(eventName, onIncoming);
    return () => socket.off(eventName, onIncoming);
  }, [activeChatId]);

  useEffect(() => {
    if (!threads.length) return;
    const handlers = threads
      .filter((t) => t.chatId !== activeChatId)
      .map((t) => {
        const eventName = `messages::${t.chatId}`;
        const handler = () =>
          setUnread((prev) => ({ ...prev, [t.chatId]: (prev[t.chatId] || 0) + 1 }));
        socket.on(eventName, handler);
        return { eventName, handler };
      });
    return () => {
      handlers.forEach(({ eventName, handler }) => socket.off(eventName, handler));
    };
  }, [threads, activeChatId]);

  useEffect(() => {
    const list = messagesData?.data?.attributes;
    if (!activeChatId || !Array.isArray(list)) return;
    processedRef.current = new Set(list.map(messageIdOf).filter(Boolean));
    setMessages(list);
    setUnread((prev) => ({ ...prev, [activeChatId]: 0 }));
  }, [activeChatId, messagesData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !activeUser?.id || !activeChatId) return;

    const tempId = `temp-${Date.now()}`;
    processedRef.current.add(tempId);
    setMessages((prev) => [
      ...prev,
      {
        _id: tempId,
        id: tempId,
        text,
        sender: { id: userId },
        createdAt: new Date().toISOString(),
        pending: true,
      },
    ]);
    setNewMessage("");

    try {
      const res = await sendMessage({
        receiver: activeUser.id,
        chatId: activeChatId,
        text,
      }).unwrap();
      const saved = res?.data?.attributes;
      const realId = saved?.id || saved?._id || tempId;
      processedRef.current.delete(tempId);
      processedRef.current.add(realId);
      setMessages((prev) =>
        prev.map((msg) =>
          messageIdOf(msg) === tempId
            ? { ...saved, _id: realId, id: realId, pending: false }
            : msg
        )
      );
    } catch (_) {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIdOf(msg) === tempId ? { ...msg, pending: false, error: true } : msg
        )
      );
    }
  };

  const selectThread = (thread) => {
    processedRef.current.clear();
    setActiveChatId(thread.chatId);
    setMessages([]);
    setUnread((prev) => ({ ...prev, [thread.chatId]: 0 }));
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="-m-4 flex h-[calc(100vh-5.5rem)] overflow-hidden bg-white">
      <aside
        className={`${
          showSidebar ? "flex" : "hidden"
        } w-full flex-col border-r border-emerald-100 bg-slate-50 md:flex md:w-80`}
      >
        <div className="flex items-center justify-between border-b border-emerald-100 px-4 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Inbox
            </p>
            <h1 className="text-lg font-bold text-slate-900">Messages</h1>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-emerald-700 md:hidden"
            onClick={() => setShowSidebar(false)}
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {listLoading ? (
            <div className="flex justify-center py-10">
              <Spin />
            </div>
          ) : threads.length === 0 ? (
            <div className="px-3 py-10">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No conversations yet. Message a creator or brand from a profile."
              />
            </div>
          ) : (
            threads.map((thread) => (
              <button
                type="button"
                key={thread.chatId}
                onClick={() => selectThread(thread)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                  activeChatId === thread.chatId
                    ? "bg-emerald-50 ring-1 ring-emerald-200"
                    : "hover:bg-white"
                }`}
              >
                <img
                  src={thread.avatar}
                  alt={thread.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold text-slate-800">{thread.name}</p>
                    {unread[thread.chatId] > 0 && (
                      <span className="rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                        {unread[thread.chatId]}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs capitalize text-slate-500">
                    {thread.lastMessage || thread.role || "Start chatting"}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      <section
        className={`${
          showSidebar ? "hidden" : "flex"
        } min-w-0 flex-1 flex-col md:flex`}
      >
        <div className="flex items-center gap-3 border-b border-emerald-100 px-4 py-3">
          <button
            type="button"
            className="rounded-lg p-2 text-emerald-700 md:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <Menu size={20} />
          </button>
          {activeUser ? (
            <div className="flex items-center gap-3">
              <img
                src={activeUser.avatar}
                alt={activeUser.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-slate-900">{activeUser.name}</h2>
                <p className="text-xs capitalize text-slate-500">{activeUser.role}</p>
              </div>
            </div>
          ) : (
            <p className="font-medium text-slate-500">Select a conversation</p>
          )}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-[#f8faf9] p-4">
          {messagesLoading && messages.length === 0 ? (
            <div className="flex justify-center py-16">
              <Spin />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  activeUser
                    ? "No messages yet. Say hello."
                    : "Choose a conversation or start one from a profile."
                }
              />
            </div>
          ) : (
            messages.map((msg) => {
              const mine = String(senderIdOf(msg)) === String(userId);
              return (
                <div
                  key={messageIdOf(msg)}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.error
                        ? "bg-rose-500 text-white"
                        : msg.pending
                          ? "bg-slate-400 text-white"
                          : mine
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-slate-800 shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm">{msg.text}</p>
                    <p className={`mt-1 text-[11px] ${mine ? "text-emerald-100" : "text-slate-400"}`}>
                      {msg.error ? "Failed" : msg.pending ? "Sending…" : formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="flex items-center gap-2 border-t border-emerald-100 bg-white p-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400"
            placeholder={activeUser ? "Type your message" : "Select a conversation first"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!activeUser}
          />
          <button
            type="submit"
            disabled={!activeUser || !newMessage.trim() || sending}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={16} />
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
