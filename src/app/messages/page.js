"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/Dashbord/dashboardLayout/AuthGuard";

function MessagesRedirect() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const chatId = params.get("chatId");
    router.replace(chatId ? `/dashboard/messages?chatId=${chatId}` : "/dashboard/messages");
  }, [params, router]);

  return (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      Opening messages…
    </div>
  );
}

export default function Page() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="p-8 text-slate-500">Opening messages…</div>}>
        <MessagesRedirect />
      </Suspense>
    </AuthGuard>
  );
}
