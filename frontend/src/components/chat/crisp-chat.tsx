"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("276a2b22-65f0-47a6-ae1e-640bb98e6dbd");
  });

  return null;
}

export default CrispChat;