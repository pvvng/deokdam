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
        className="w-full h-96 bg-white rounded-2xl resize-none p-3 shadow placeholder:text-sm focus:outline-none"
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
