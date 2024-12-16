"use client";

import { useGetOwnerNFT } from "@/app/hooks/aptos";
import { NFTCard } from "@/components/nft-card";
import React from "react";

export function UserCollection() {
  const nfts = useGetOwnerNFT();
  console.log("owner nft", nfts.data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.data?.map((nft) => (
        <NFTCard key={nft.id} nft={nft} actionText="Sell" actionText2="Gift" />
      ))}
    </div>
  );
}
