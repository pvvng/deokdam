export default function Loader() {
  return (
    <div className="flex flex-row justify-center gap-2 mx-auto">
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}
