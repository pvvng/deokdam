"use client";

interface TextAreaProps {
  name: string;
  errors?: string[];
}

export default function TextArea({
  name,
  errors = [],
  ...rest
}: TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-3">
      <textarea
        className="w-full h-96 bg-neutral-200 rounded-2xl resize-none p-3 shadow focus:outline-none
        sm:placeholder:text-base placeholder:text-sm dark:bg-neutral-800 dark:text-neutral-50"
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
