"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WalletSelector } from "@/app/components/wallet-selector";
import { MintNFTDialog } from "./mint-nft-dialog";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useGetBalance } from "@/app/hooks/aptos";

export const Navbar = () => {
  const { connected, account } = useWallet();
  const balance = useGetBalance(account!);
  console.log("b", balance.data);
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-2xl font-bold text-white">
            NFT Marketplace
          </Link>
          {connected && account && balance.data && (
            <div className="font-bold text-sm">
              <p>
                {balance.data} <span className="text">APT</span>
              </p>
              <p className="text-green-500">
                <span className="text-white">~</span>
                {" $ "}
                {Number(balance.data.toFixed(2)) * 13.65}
              </p>
            </div>
          )}
        </div>
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
