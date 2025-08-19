import db from "@/lib/db";
import { getObjectId } from "@/lib/getObjectId";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const metadata = {
  title: "내 덕담",
};

async function getDeokdam(ids: string[]) {
  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await db.message.findUnique({
        where: { id: getObjectId(id) },
      });
      return res;
    })
  );
  return results;
}

function formatDateKorean(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0~11이므로 +1
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

function isDeokdamOpen(openAt: Date): boolean {
  const now = new Date();
  return now >= openAt;
}

export default async function UserPage() {
  return <div className="flex flex-col gap-3"></div>;
}

interface CardProps {
  id: string;
  payload: string;
  createdAt: string;
  openAt: string;
  isDeokdamOpen: boolean;
  isPublic: boolean;
  accessToken: string | null;
}

function Card({
  id,
  payload,
  isDeokdamOpen,
  createdAt,
  openAt,
  isPublic,
  accessToken,
}: CardProps) {
  if (isDeokdamOpen) {
    return (
      <div
        className="p-5 min-h-20 border border-gray-200 shadow rounded-2xl space-y-2 transition 
        flex flex-col justify-center items-center"
      >
        <div className="size-6 flex justify-center items-center bg-blue-600 rounded-full">
          <FontAwesomeIcon icon={faLock} className="text-white text-sm" />
        </div>
        <p>
          <span className="font-semibold">{openAt}</span> 이후 열람 가능
        </p>
      </div>
    );
  }

  return (
    <Link href={`/d/${id}`}>
      <div className="p-5 border border-gray-200 shadow rounded-2xl space-y-2 hover:bg-gray-200 transition">
        {isDeokdamOpen}
        <div className="flex gap-1 items-center">
          <div className="relative rounded bg-blue-500 size-6 flex justify-center items-center p-1"></div>
          <p className="font-semibold">덕담토끼</p>
        </div>
        <p>{payload}</p>
      </div>
    </Link>
  );
}
