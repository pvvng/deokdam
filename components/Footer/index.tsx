import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full p-5 bg-neutral-100 mt-10 font-paperlogy">
      <div className="w-full max-w-screen-sm mx-auto text-center">
        <p className="font-bold text-2xl">덕담</p>
        <p className="text-sm">
          created by{" "}
          <Link
            href="https://github.com/pvvng"
            target="_blank"
            className="underline text-blue-600"
          >
            pvvng
          </Link>
        </p>
        <p className="text-sm text-neutral-600 mt-3">
          ⓒ 2025. pvvng All rights reserved.
        </p>
      </div>
    </footer>
  );
}
