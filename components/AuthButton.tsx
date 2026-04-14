"use client";

import { useFormStatus } from "react-dom";

export default function AuthButton({ 
  text, 
  formAction, 
  isPrimary 
}: { 
  text: string; 
  formAction: (payload: FormData) => void; 
  isPrimary?: boolean;
}) {
  const { pending } = useFormStatus();
  
  return (
    <button 
      formAction={formAction}
      disabled={pending}
      className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
        isPrimary 
          ? "bg-white text-black hover:bg-neutral-200" 
          : "bg-transparent text-neutral-300 border border-neutral-800 hover:bg-neutral-900 hover:text-white"
      }`}
    >
      {pending ? "İşleniyor..." : text}
    </button>
  );
}