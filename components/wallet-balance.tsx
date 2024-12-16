"use client";

import { useGetBalance } from "@/app/hooks/aptos";
import { Skeleton } from "./ui/skeleton";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export const WalletBalance = () => {
  const { connected, account } = useWallet();
  const balance = useGetBalance(account!);

  if (!connected || !account) return null;

  return (
    <div className="space-y-1">
      {balance.isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      ) : (
        <>
          <p className="text-sm font-mono">
            {balance.data} <span className="text-purple-400">APT</span>
          </p>
          <p className="text-xs text-gray-400">
            ≈ ${(Number(balance.data?.toFixed(2) || 0) * 13.65).toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
};
