"use client";

import { useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from "./Deokdam";
import { KakaoShareButton } from "../Kakao";

export default function DeokdamFormWithShareModal() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [deokdamId, setDeokdamId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

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
