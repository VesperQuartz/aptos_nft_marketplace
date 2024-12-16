"use client";

import { useGetOwnerNFT } from "@/app/hooks/aptos";
import { NFTCard } from "@/components/nft-card";
import { NFTGridSkeleton } from "@/components/ui/skeleton";
import React from "react";

export function UserCollection() {
  const nfts = useGetOwnerNFT();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Your Collection
      </h1>

      {nfts.isLoading ? (
        <NFTGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.data?.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              actionText="Sell"
              actionText2="Gift"
            />
          ))}
        </div>
      )}
    </div>
  );
}
