"use client";

import { useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from ".";
import { KakaoProvider, KakaoShareButton } from "../Kakao";

type ShareData = {
  id: string;
  token: string;
};

export default function DeokdamFormWithShareModal() {
  const [shareData, setShareData] = useState<ShareData | null>(null);

  return (
    <>
      <DeokDamForm
        onActionEnd={({ id, token }) => {
          setShareData({ id, token });
        }}
      />
      {shareData && (
        <ShareDeokDamModal onClose={() => setShareData(null)}>
          <KakaoProvider>
            <KakaoShareButton id={shareData.id} accessToken={shareData.token} />
          </KakaoProvider>
        </ShareDeokDamModal>
      )}
    </>
  );
}
