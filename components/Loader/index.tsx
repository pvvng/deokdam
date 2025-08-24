export default function Loader() {
  return (
    <div className="mt-15 flex flex-row justify-center gap-2 mx-auto">
      <div className="sm:size-4 size-3 rounded-full bg-blue-600 animate-bounce"></div>
      <div className="sm:size-4 size-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
      <div className="sm:size-4 size-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}
