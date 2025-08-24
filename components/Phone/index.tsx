export default function Phone({ children }: { children?: React.ReactNode }) {
  return (
    <div className="font-paperlogy relative mx-auto w-full max-w-[280px] h-[520px] bg-black rounded-[35px] border border-neutral-800 p-[7px] shadow-xl group">
      {/* buttons */}
      <div className="absolute rounded-r-2xl w-[3px] h-[45px] top-[30%] -right-1 bg-gradient-to-r from-[#111] via-[#333] to-[#595959]"></div>
      <div className="absolute rounded-r-2xl w-[3px] h-[30px] top-[26%] -left-1 bg-gradient-to-r from-[#111] via-[#333] to-[#595959] scale-x-[-1]"></div>
      <div className="absolute rounded-r-2xl w-[3px] h-[30px] top-[36%] -left-1 bg-gradient-to-r from-[#111] via-[#333] to-[#595959] scale-x-[-1]"></div>
      {/* content */}
      <div className="w-full h-full rounded-[25px] overflow-scroll">
        {children}
      </div>
      {/* camera */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[35%] h-[18px] bg-black rounded-b-[10px]">
        <div className="absolute top-[6px] right-[84%] translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white/5">
          <div className="w-[3px] h-[3px] bg-blue-500/20 rounded-full absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="absolute top-[2px] right-1/2 translate-x-1/2 w-[40%] h-[2px] rounded bg-neutral-800"></div>
      </div>
    </div>
  );
}
