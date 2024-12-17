"use client";

import { useQueryStates } from "nuqs";
import { NFTCard } from "@/components/nft-card";
import { FilterBar } from "@/components/filter-bar";
import { useGetAllNFT } from "@/app/hooks/aptos";
import { NFTGridSkeleton } from "./ui/skeleton";
import { FilterSchema } from "@/app/types/filters";
import { match } from "ts-pattern";

export function NFTMarketplace() {
  const nfts = useGetAllNFT();
        const [filters] = useQueryStates(
    {
      rarity: FilterSchema.shape.rarity.transform((v) =>
        typeof v === "string" ? Number(v) : "" 
      ),
      search: FilterSchema.shape.search,
      sort: FilterSchema.shape.sort,
    },
    {
      history: "push",
      clearOnDefault: true,
    }
  );

  const filteredNFTs = nfts.data?.filter((nft) => {
    if (
      filters.search &&
      !nft.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.rarity && nft.rarity !== filters.rarity) {
      return false;
    }
    return true;
  });

  const sortedNFTs = [...(filteredNFTs || [])].sort((a, b) => {
    return match(filters.sort)
      .with("price_asc", () => a.price - b.price)
      .with("price_desc", () => b.price - a.price)
      .with("rarity", () => b.rarity - a.rarity)
      .otherwise(() => 0);
  });

  return (
    <div className="space-y-6">
      <FilterBar />

      {nfts.isLoading ? (
        <NFTGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNFTs?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} actionText="Buy" />
          ))}
        </div>
      )}
    </div>
  );
}
