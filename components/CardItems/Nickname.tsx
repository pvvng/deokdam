export default function Nickname({ nickname }: { nickname: string }) {
  return <p className="font-semibold line-clamp-1">{nickname}</p>;
}
