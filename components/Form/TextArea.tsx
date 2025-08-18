"use client";

interface TextAreaProps {
  name: string;
  errors?: string[];
}

export default function TextArea({
  name,
  errors,
  ...rest
}: TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-3">
      <textarea
        className="w-full h-96 focus:outline-none border border-neutral-200 bg-neutral-200 rounded-2xl resize-none p-5 shadow"
        name={name}
        {...rest}
      />
      <div className="space-y-1">
        {errors?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}
