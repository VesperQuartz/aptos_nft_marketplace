"use client";

import { useQueryState } from "nuqs";
import { NFTCard } from "@/components/nft-card";
import { FilterSort } from "@/components/filter-sort";
import React from "react";
import { useGetAllNFT } from "@/app/hooks/aptos";
import { NFT } from "@/app/services/aptos";

export function NFTMarketplace() {
  const [rarity, setRarity] = useQueryState("rarity");
  const [minPrice, setMinPrice] = useQueryState("minPrice");
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice");
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [sortOrder, setSortOrder] = useQueryState("sortOrder");

  const handleBuy = (nft: NFT) => {
    alert(`You bought ${nft.name} for ${nft.price} ETH!`);
  };

  const nfts = useGetAllNFT();
  console.log(nfts.data);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Available NFTs</h2>
        <FilterSort
          rarity={rarity}
          setRarity={setRarity}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.data?.map((nft) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            actionText="Buy"
            onAction={() => handleBuy(nft)}
          />
        ))}
      </div>
    </div>
  );
}
