import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 space-y-20 font-paperlogy max-w-screen-sm mx-auto">
      <Navbar />
      {children}
    </div>
  );
}
