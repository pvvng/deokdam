"use client";

import { useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from ".";
import KakaoShareButton from "../KakaoShare";

export default function DeokdamFormContainer() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [deokdamId, setDeokdamId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

  return (
    <>
      <DeokDamForm
        onActionEnd={({ id, isPublic, token }) => {
          setDeokdamId(id);
          setIsPublic(isPublic);
          setAccessToken(token);
          setShowShareModal(true);
        }}
      />
      {showShareModal && (
        <ShareDeokDamModal onClose={() => setShowShareModal(false)}>
          <KakaoShareButton
            id={deokdamId}
            accessToken={accessToken}
            isPublic={isPublic}
          />
        </ShareDeokDamModal>
      )}
    </>
  );
}
