import { env } from "@/app/config";
import { fetchAllNFT, getOwnerNFT } from "@/app/services/aptos";
import { aptos } from "@/lib/aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import to from "await-to-ts";

export const useGetAllNFT = () => {
  return useQuery({
    queryKey: ["nfts"],
    queryFn: () => fetchAllNFT({ marketAddress: env.ownerAddress }),
  });
};

export const useMint = () => {
  const { signAndSubmitTransaction, account } = useWallet();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["mint"],
    mutationFn: async ({
      name,
      description,
      uri,
      rarity,
      ownerAddress,
    }: {
      name: string;
      ownerAddress: string;
      description: string;
      uri: string;
      rarity: number;
    }) => {
      const payload = {
        name: Array.from(new TextEncoder().encode(name)),
        description: Array.from(new TextEncoder().encode(description)),
        uri: Array.from(new TextEncoder().encode(uri)),
        rarity: rarity,
      };
      const mintFnPayload = {
        function:
          `${ownerAddress}::NFTMarketplace::mint_nft` as `${string}::${string}::${string}`,
        functionArguments: [
          payload.name,
          payload.description,
          payload.uri,
          rarity,
        ],
      };

      const [error, response] = await to(
        signAndSubmitTransaction({
          sender: account?.address,
          data: mintFnPayload,
        }),
      );
      if (error) {
        throw error;
      }
      const [hashError, hash] = await to(
        aptos.waitForTransaction({
          transactionHash: response.hash,
        }),
      );
      if (hashError) {
        throw hashError;
      }
      console.log(hash);
      return hash;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["nfts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ownerNFT"],
      });
    },
  });
};

export const useMintAny = () => {
  const { signAndSubmitTransaction, account } = useWallet();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["mint"],
    mutationFn: async ({
      name,
      description,
      uri,
      rarity,
      ownerAddress,
    }: {
      name: string;
      ownerAddress: string;
      description: string;
      uri: string;
      rarity: number;
    }) => {
      const payload = {
        name: Array.from(new TextEncoder().encode(name)),
        description: Array.from(new TextEncoder().encode(description)),
        uri: Array.from(new TextEncoder().encode(uri)),
        rarity: rarity,
      };
      const mintFnPayload = {
        function:
          `${ownerAddress}::NFTMarketplace::mint_nft_any` as `${string}::${string}::${string}`,
        functionArguments: [
          ownerAddress,
          payload.name,
          payload.description,
          payload.uri,
          rarity,
        ],
      };

      const [error, response] = await to(
        signAndSubmitTransaction({
          sender: account?.address,
          data: mintFnPayload,
        }),
      );
      if (error) {
        throw error;
      }
      const [hashError, hash] = await to(
        aptos.waitForTransaction({
          transactionHash: response.hash,
        }),
      );
      if (hashError) {
        throw hashError;
      }
      console.log(hash);
      return hash;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["nfts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ownerNFT"],
      });
    },
  });
};

export const useGetOwnerNFT = () => {
  const { account } = useWallet();
  return useQuery({
    queryKey: ["ownerNFT"],
    queryFn: () =>
      getOwnerNFT({
        marketAddress: env.ownerAddress,
        accountAddress: account?.address,
      }),
  });
};

export const useSellNFT = () => {
  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();
  return useMutation({
    mutationKey: ["sellNFT"],
    mutationFn: async ({ id, price }: { id: string; price: string }) => {
      const [error, response] = await to(
        signAndSubmitTransaction({
          sender: account?.address,
          data: {
            function:
              `${env.ownerAddress}::NFTMarketplace::list_for_sale` as `${string}::${string}::${string}`,
            functionArguments: [env.ownerAddress, id, price],
          },
        }),
      );
      if (error) throw error;
      const hash = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });
      return hash;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["nfts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ownerNFT"],
      });
    },
  });
};

export const useBuyNFT = () => {
  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();
  return useMutation({
    mutationKey: ["buyNFT"],
    mutationFn: async ({ id, price }: { id: string; price: string }) => {
      const [error, response] = await to(
        signAndSubmitTransaction({
          sender: account?.address,
          data: {
            function:
              `${env.ownerAddress}::NFTMarketplace::purchase_nft` as `${string}::${string}::${string}`,
            functionArguments: [
              env.ownerAddress,
              id,
              Number(price) * 100_000_000,
            ],
          },
        }),
      );
      if (error) {
        throw error;
      }
      const hash = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });
      return hash;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownerNFT"],
      });
      queryClient.invalidateQueries({
        queryKey: ["nfts"],
      });
    },
  });
};
