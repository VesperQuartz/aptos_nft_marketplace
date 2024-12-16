"use client";

import { useQueryState } from "nuqs";
import { NFTCard } from "@/components/nft-card";
import React from "react";
import { useGetAllNFT } from "@/app/hooks/aptos";

export function NFTMarketplace() {
  const nfts = useGetAllNFT();
  console.log(nfts.data);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Available NFTs</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.data?.map((nft) => (
          <NFTCard key={nft.id} nft={nft} actionText="Buy" />
        ))}
      </div>
    </div>
  );
}
