interface DeokdamDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token: string }>;
}

export default async function DeokdamDetailPage({
  params,
  searchParams,
}: DeokdamDetailPageProps) {
  const id = (await params).id;
  const token = (await searchParams).token;

  return (
    <div>
      <div>id: {id}</div>
      <div>token: {token}</div>
    </div>
  );
}
