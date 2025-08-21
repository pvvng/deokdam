import Card from "@/components/Card";
import TabNav from "@/components/MyPageTabNav";
import { getReceivedDeokdam, getUserDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { Deokdam } from "@/types/deokdam";
import Link from "next/link";

export const metadata = {
  title: "마이페이지",
};

interface UserPageProps {
  searchParams: Promise<{ tab?: string }>;
}
export default async function UserPage({ searchParams }: UserPageProps) {
  const session = await getSession();
  const userId = session.id;

  const tab = (await searchParams).tab ?? "written"; // 기본값 written

  let data: Deokdam[];
  if (tab === "written") {
    data = await getUserDeokdam({ userId });
  } else if (tab === "received") {
    data = await getReceivedDeokdam({ userId });
  } else {
    data = [];
  }

  return (
    <div>
      <TabNav activeTab={tab} />

      <section className="space-y-3 mt-5">
        {data.length === 0 && <NoDataComponent tab={tab} />}
        {data.map((deokdam) => (
          <Link
            key={deokdam.id}
            href={`/d/${deokdam.id}`}
            className="transition hover:bg-neutral-100 rounded-2xl block"
          >
            <Card
              id={deokdam.id}
              payload={deokdam.payload}
              openAt={formatDateKorean(new Date(deokdam.openAt))}
              isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
              accessToken={deokdam.token ?? null}
              isOwner={deokdam.userId === userId}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}

function NoDataComponent({ tab }: { tab: string }) {
  return (
    <div className="space-y-3 py-5">
      <p className="text-2xl font-semibold">
        {tab === "written"
          ? "작성한 덕담이 없습니다."
          : "받은 덕담이 없습니다."}
      </p>
      <Link
        href={tab === "written" ? "/d/add" : "/"}
        className="inline-block mx-auto px-3 py-1 bg-blue-600 hover:bg-blue-500 
          transition font-semibold text-white rounded"
      >
        {tab === "written" ? "덕담 작성하기" : "덕담 둘러보기"}
      </Link>
    </div>
  );
}
