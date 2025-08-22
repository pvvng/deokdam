import Loader from "@/components/Loader";

export default function DeokdamDetailLoading() {
  return <Loader />;
}

export function CommentsLoading() {
  return (
    <div className="space-y-5">
      <div className="w-24 h-5 bg-neutral-300 rounded-2xl animate-pulse" />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-full min-h-30 p-5 rounded-2xl border border-neutral-100 shadow space-y-3 animate-pulse"
        >
          <div className="w-24 h-3 bg-neutral-300 rounded-2xl animate-pulse" />
          <div className="w-12 h-3 bg-neutral-300 rounded-2xl animate-pulse" />
          <div className="w-48 h-3 bg-neutral-300 rounded-2xl animate-pulse" />
          <div className="w-52 h-3 bg-neutral-300 rounded-2xl animate-pulse" />
          <div className="w-50 h-3 bg-neutral-300 rounded-2xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}
