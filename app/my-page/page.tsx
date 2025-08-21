import Link from "next/link";
import { getUserDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { Card } from "@/components/Card";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "내 덕담",
};

export default async function UserPage() {
  const session = await getSession();
  const userId = session.id;
  const deokdams = await getUserDeokdam({ userId });

  if (deokdams.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <div className="flex flex-col gap-3">
      {deokdams.map((deokdam) => (
        <Link
          key={deokdam.id}
          href={`/d/${deokdam.id}`}
          className="transition hover:bg-neutral-100 rounded-2xl"
        >
          <Card
            id={deokdam.id}
            payload={deokdam.payload}
            openAt={formatDateKorean(new Date(deokdam.openAt))}
            isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
            isPublic={deokdam.isPublic}
            accessToken={deokdam.token ?? null}
            isOwner={deokdam.userId === userId}
          />
        </Link>
      ))}
    </div>
  );
}

function NoDataComponent() {
  return (
    <div className="mt-20 space-y-5 text-center">
      <p className="text-2xl text-center font-semibold">
        아직 작성한 덕담이 없습니다.
      </p>
      <Link
        href="/d/add"
        className="inline-block mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 transition font-semibold text-white rounded-2xl"
      >
        덕담 작성하기
      </Link>
    </div>
  );
}
