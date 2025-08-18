"use client";

import { useState } from "react";
import ShareDeokDamModal from "../Modal/ShareDeokdam";
import DeokDamForm from ".";

export default function DeokdamFormContainer() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [deokdamId, setDeokdamId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
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
        <ShareDeokDamModal
          id={deokdamId}
          accessToken={accessToken}
          isPublic={isPublic}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
