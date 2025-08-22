import { DeokdamFormWithShareModal } from "@/components/Form";

export const metadata = {
  title: "작성하기",
};

export default function AddPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-center text-3xl font-bold">덕담 작성하기</h1>
      <DeokdamFormWithShareModal />
    </div>
  );
}
