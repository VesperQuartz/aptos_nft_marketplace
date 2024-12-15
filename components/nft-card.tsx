import { NFT } from "@/app/services/aptos";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { abbreviateAddress } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SellNFTDialog } from "./sell-nft-dialog";
import { useBuyNFT } from "@/app/hooks/aptos";
import { Loader2 } from "lucide-react";

interface NFTCardProps {
  nft: NFT;
  actionText: string;
}

export function NFTCard({ nft, actionText }: NFTCardProps) {
  console.log("nft-card", nft);
  const pathname = usePathname();
  const buy = useBuyNFT();
  const getRarityColor = (rarity: number) => {
    return match(rarity)
      .with(1, () => "text-gray-400")
      .with(2, () => "text-green-400")
      .with(3, () => "text-blue-400")
      .with(4, () => "text-purple-400")
      .otherwise(() => "text-white");
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <Image
        width={500}
        height={500}
        src={nft.uri}
        alt={nft.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
        <p className="text-gray-400 mb-2 text-sm">{nft.description}</p>
        <p className="text-gray-400 mb-2">
          Created by {abbreviateAddress(nft.owner)}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">{nft.price} APT</span>
          <span className={`font-semibold ${getRarityColor(nft.rarity)}`}>
            {match(nft.rarity)
              .with(1, () => "Common")
              .with(2, () => "Uncommon")
              .with(3, () => "Rare")
              .with(4, () => "Epic")
              .otherwise(() => "")}
          </span>
        </div>
        {match(pathname)
          .with("/", () => (
            <Button
              key={crypto.randomUUID()}
              className="w-full"
              disabled={buy.isPending}
              onClick={() =>
                buy.mutate({
                  id: nft.id.toString(),
                  price: nft.price.toString(),
                })
              }
            >
              {buy.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                actionText
              )}
            </Button>
          ))
          .with("/collection", () => (
            <Button key={crypto.randomUUID()} className="w-full" asChild>
              <SellNFTDialog id={nft.id}>{actionText}</SellNFTDialog>
            </Button>
          ))
          .otherwise(() => null)}
      </div>
    </div>
  );
}
