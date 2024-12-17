"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WalletSelector } from "@/app/components/wallet-selector";
import { MintNFTDialog } from "./mint-nft-dialog";
import { WalletBalance } from "./wallet-balance";

export const Navbar = () => {
  return (
    <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            >
              NFT Marketplace
            </Link>
            <WalletBalance />
          </div>

          <nav className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Marketplace
              </Button>
            </Link>
            <Link href="/collection">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Your Collection
              </Button>
            </Link>
            <WalletSelector />
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <MintNFTDialog>Mint NFT</MintNFTDialog>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
