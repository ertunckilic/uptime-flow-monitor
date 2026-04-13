"use client";

import { useState } from "react";

export default function Favicon({ url }: { url: string }) {
  const [hasError, setHasError] = useState(false);

  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch {
    // URL formatı bozuksa veya eksikse çökmemesi için güvenlik önlemi
    hostname = "";
  }

  // Hata varsa veya hostname çıkarılamadıysa varsayılan SVG ikonunu döndür
  if (hasError || !hostname) {
    return (
      <svg className="w-5 h-5 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    );
  }

  return (
    <img 
      src={`https://www.google.com/s2/favicons?sz=64&domain=${hostname}`} 
      alt="favicon"
      className="w-5 h-5 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"
      onError={() => setHasError(true)}
    />
  );
}