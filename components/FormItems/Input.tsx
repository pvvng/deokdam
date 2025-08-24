import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}
export default function Input({
  name,
  errors = [],
  // name과 error를 제외한 모든 InputHTMLAttributes<HTMLInputElement> props 한번에 받기
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-3">
      <input
        className="rounded-2xl w-full h-10 flex justify-center items-center border-none transition 
        sm:placeholder:text-base placeholder:text-sm 
        focus:outline-none shadow px-3 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50"
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <p key={index} className="text-red-600 text-sm">
          {error}
        </p>
      ))}
    </div>
  );
}
