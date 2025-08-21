"use client";

import { useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from ".";
import KakaoShareButton from "../KakaoShare";

export default function DeokdamFormContainer() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [deokdamId, setDeokdamId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <>
      <DeokDamForm
        onActionEnd={({ id, token }) => {
          setDeokdamId(id);
          setAccessToken(token);
          setShowShareModal(true);
        }}
      />
      {showShareModal && (
        <ShareDeokDamModal onClose={() => setShowShareModal(false)}>
          <KakaoShareButton id={deokdamId} accessToken={accessToken} />
        </ShareDeokDamModal>
      )}
    </>
  );
}
