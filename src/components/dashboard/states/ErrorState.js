// src/components/dashboard/states/ErrorState.js
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ErrorState({ error, retry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card className="bg-zinc-900 border-zinc-800 max-w-md w-full mx-4">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-red-500 mb-4">Error loading dashboard</div>
            <div className="text-zinc-400 mb-4">{error}</div>
            <Button onClick={retry}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
