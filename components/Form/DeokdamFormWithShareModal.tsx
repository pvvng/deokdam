"use client";

import { useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from "./Deokdam";
import { KakaoShareButton } from "../Kakao";

interface ShareItem {
  id: string;
  token: string;
}

export default function DeokdamFormWithShareModal() {
  const [shareItem, setShareItem] = useState<ShareItem | null>(null);

  return (
    <>
      <DeokDamForm
        onActionEnd={({ id, token }) => {
          setShareItem({ id, token });
        }}
      />
      {shareItem && (
        <ShareDeokDamModal onClose={() => setShareItem(null)}>
          <KakaoShareButton id={shareItem.id} accessToken={shareItem.token} />
        </ShareDeokDamModal>
      )}
    </>
  );
}
