"use client";

import { useCallback, useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from "./Deokdam";
import { KakaoShareButton } from "../Kakao";

interface ShareItem {
  id: string;
  token: string;
}

export default function DeokdamFormWithShareModal() {
  const [shareItem, setShareItem] = useState<ShareItem | null>(null);

  const handleActionEnd = useCallback(
    ({ id, token }: { id: string; token: string }) => {
      setShareItem({ id, token });
    },
    []
  );

  return (
    <>
      <DeokDamForm onActionEnd={handleActionEnd} />
      {shareItem && (
        <ShareDeokDamModal onClose={() => setShareItem(null)}>
          <KakaoShareButton id={shareItem.id} accessToken={shareItem.token} />
        </ShareDeokDamModal>
      )}
    </>
  );
}
