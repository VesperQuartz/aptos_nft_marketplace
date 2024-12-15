"use client";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import React from "react";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const wallet = [new PontemWallet(), new PetraWallet()];

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AptosWalletAdapterProvider
      plugins={wallet}
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => {
        console.log("error", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
