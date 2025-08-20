import { notFound } from "next/navigation";
import { getUserDeokdam } from "./actions";
import { formatDateKorean, isDeokdamOpen } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { Card } from "@/components/Card";

interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeokdamDetailPage({
  params,
}: DeokdamDetailPageProps) {
  const id = (await params).id;

  const session = await getSession();
  const userId = session.id;

  const deokdam = await getUserDeokdam({ id });

  if (!deokdam) return notFound();

  return (
    <Card
      key={deokdam.id}
      id={deokdam.id}
      payload={deokdam.payload}
      openAt={formatDateKorean(new Date(deokdam.openAt))}
      isOwner={deokdam.writerId === userId}
      isOpen={isDeokdamOpen(new Date(deokdam.openAt))}
      isPublic={deokdam.isPublic}
      accessToken={deokdam.token}
    />
  );
}
