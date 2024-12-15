import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WalletSelector } from "@/app/components/wallet-selector";
import { MintNFTDialog } from "./mint-nft-dialog";

export const Navbar = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          NFT Marketplace
        </Link>
        <nav className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white">
              Marketplace
            </Button>
          </Link>
          <Link href="/collection">
            <Button variant="ghost" className="text-white">
              Your Collection
            </Button>
          </Link>
          <WalletSelector />
          <MintNFTDialog>Mint NFT</MintNFTDialog>
        </nav>
      </div>
    </header>
  );
};
