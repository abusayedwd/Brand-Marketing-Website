"use client";

const stories = [
  {
    category: "Beauty · Instagram",
    outcome: "Cleaner creator shortlist, faster draft approvals",
    title: "Launch kit for a skincare drop",
    narrative:
      "A DTC brand used Brivio to brief micro-creators, accept only on-brand applicants, and approve UGC before paid boost — cutting back-and-forth over DMs.",
  },
  {
    category: "Food · TikTok",
    outcome: "Campaign status stayed visible end to end",
    title: "Local cafe weekend push",
    narrative:
      "The cafe team tracked interest, draft review, and completion in one place instead of spreadsheets — creators knew when payments hit their wallet.",
  },
  {
    category: "Fashion · Multi-platform",
    outcome: "Reject → revise → approve without restarting",
    title: "Seasonal lookbook with revisions",
    narrative:
      "When a first draft missed the brief, the brand left a rejection note; the creator resubmitted once and unlocked wallet credit after approval.",
  },
];

export default function CaseStudies() {
  return (
    <section className="border-y border-emerald-100 bg-gradient-to-b from-white to-emerald-50/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Case studies
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How teams use Brivio in practice
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Illustrative stories based on the real product flow — subscribe, campaign, draft, payout.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story.title} className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                {story.category}
              </p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{story.title}</h3>
              <p className="mt-2 text-sm font-medium text-emerald-800">{story.outcome}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {story.narrative}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
