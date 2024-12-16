import React from "react";
import { NFT } from "@/app/services/aptos";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { abbreviateAddress } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SellNFTDialog } from "./sell-nft-dialog";
import { useBuyNFT } from "@/app/hooks/aptos";
import { Loader2 } from "lucide-react";
import { TransferNFTDialog } from "./transfer-nft-dialog";
import { Badge } from "./ui/badge";

interface NFTCardProps {
  nft: NFT;
  actionText?: string;
  actionText2?: string;
}

export function NFTCard({ nft, actionText, actionText2 }: NFTCardProps) {
  const pathname = usePathname();
  const buy = useBuyNFT();

  const getRarityData = (rarity: number) => {
    return match(rarity)
      .with(1, () => ({ color: "text-gray-400", label: "Common" }))
      .with(2, () => ({ color: "text-emerald-400", label: "Uncommon" }))
      .with(3, () => ({ color: "text-blue-400", label: "Rare" }))
      .with(4, () => ({ color: "text-purple-400", label: "Epic" }))
      .otherwise(() => ({ color: "text-white", label: "" }));
  };

  return (
    <div className="glass-card hover-glow transition-all duration-300 overflow-hidden">
      <div className="relative group">
        <Image
          width={500}
          height={500}
          src={nft.uri}
          alt={nft.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{nft.name}</h2>
          <Badge variant="outline" className={getRarityData(nft.rarity).color}>
            {getRarityData(nft.rarity).label}
          </Badge>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">{nft.description}</p>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Created by</p>
            <p className="font-mono text-xs bg-gray-800 px-2 py-1 rounded-md">
              {abbreviateAddress(nft.owner)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-xl font-bold text-purple-400">{nft.price} APT</p>
          </div>
        </div>

        {/* Action buttons here - keeping existing logic */}
        {match(pathname)
          .with("/", () => (
            <Button
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
              onClick={() =>
                buy.mutate({
                  id: nft.id.toString(),
                  price: nft.price.toString(),
                })
              }
              disabled={buy.isPending}
            >
              {buy.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buying...
                </>
              ) : (
                actionText
              )}
            </Button>
          ))
          .otherwise(() => (
            <div className="flex gap-2 mt-4">
              <SellNFTDialog id={nft.id}>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  {actionText}
                </Button>
              </SellNFTDialog>
              <TransferNFTDialog id={nft.id}>
                <Button
                  variant="outline"
                  className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-600/10"
                >
                  {actionText2}
                </Button>
              </TransferNFTDialog>
            </div>
          ))}
      </div>
    </div>
  );
}
