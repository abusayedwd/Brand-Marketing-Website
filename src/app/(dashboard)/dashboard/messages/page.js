import MessagesPage from "@/components/messages/Meassage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-500">Loading messages…</div>}>
      <MessagesPage />
    </Suspense>
  );
}
