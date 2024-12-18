import React, { Suspense } from "react";
import { NFTMarketplace } from "@/components/nft-marketplace";

export default function Home() {
  return (
    <Suspense fallback={<>loading...</>}>
      <main className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <NFTMarketplace />
        </div>
      </main>
    </Suspense>
  );
}
