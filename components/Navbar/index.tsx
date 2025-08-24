"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { link: "/", label: "홈" },
  { link: "/my-page", label: "내 덕담" },
  { link: "/d/add", label: "덕담 +" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-5 bg-neutral-200/60 dark:bg-neutral-600/60 backdrop-blur p-2 px-2 sm:px-8 z-50 mb-10 font-paperlogy
      w-full sm:max-w-120 rounded-2xl mx-auto shadow border-neutral-200 grid grid-cols-3 justify-between items-center"
    >
      {links.map(({ link, label }) => {
        const isActive = link === pathname;
        return (
          <Link
            key={link}
            href={link}
            className={`w-fit relative px-3 py-1 rounded-2xl overflow-hidden mx-auto text-base ${
              isActive
                ? "text-white font-semibold"
                : "text-black dark:text-white"
            }`}
          >
            {/* 배경 애니메이션 레이어 */}
            {isActive && (
              <span className="absolute inset-0 w-full h-full -z-1 bg-blue-600 animate-fill-right" />
            )}
            <span
              className={`relative z-10 ${
                isActive
                  ? "text-white font-semibold"
                  : "text-black dark:text-white"
              }`}
            >
              <span>{label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
