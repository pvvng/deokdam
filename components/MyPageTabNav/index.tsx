import Link from "next/link";

const navItems = [
  { tabName: "written", label: "내가 쓴 덕담" },
  { tabName: "received", label: "받은 덕담" },
];

export default function TabNav({ activeTab }: { activeTab: string }) {
  return (
    <div className="w-full flex gap-3">
      {navItems.map((item) => (
        <Link
          key={item.tabName}
          href={`/my-page?tab=${item.tabName}`}
          className={`${
            activeTab === item.tabName &&
            "border-b-2 border-blue-600 font-semibold"
          } py-2 inline-block`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
