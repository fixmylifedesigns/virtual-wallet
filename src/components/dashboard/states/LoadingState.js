// src/components/dashboard/states/LoadingState.js
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
    </div>
  );
}
