"use client";

import { useQueryState } from "nuqs";
import { NFTCard } from "@/components/nft-card";
import React from "react";
import { useGetAllNFT } from "@/app/hooks/aptos";
import { NFTGridSkeleton } from "./ui/skeleton";

export function NFTMarketplace() {
  const nfts = useGetAllNFT();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Available NFTs
        </h2>
      </div>

      {nfts.isLoading ? (
        <NFTGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.data?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} actionText="Buy" />
          ))}
        </div>
      )}
    </div>
  );
}
