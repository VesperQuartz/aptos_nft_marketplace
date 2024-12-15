import { aptos } from "@/lib/aptos";
import { hexToUint8Array } from "@/lib/utils";
import { to } from "await-to-ts";

export type NFT = {
  id: number;
  owner: string;
  name: string;
  description: string;
  uri: string;
  price: number;
  for_sale: boolean;
  rarity: number;
};

export const fetchAllNFT = async ({
  marketAddress,
}: {
  marketAddress: string;
}) => {
  const [resourceError, resources] = await to(
    aptos.getAccountResource({
      accountAddress: marketAddress,
      resourceType: `${marketAddress}::NFTMarketplace::Marketplace`,
    }),
  );
  if (resourceError) {
    console.error("there was error", resourceError);
    return [];
  }
  const data = (resources as { nfts: NFT[] }).nfts;
  return data.map((nft) => {
    return {
      ...nft,
      name: new TextDecoder().decode(hexToUint8Array(nft.name.slice(2))),
      description: new TextDecoder().decode(
        hexToUint8Array(nft.description.slice(2)),
      ),
      uri: new TextDecoder().decode(hexToUint8Array(nft.uri.slice(2))),
      price: Number(nft.price) / 100_000_000,
    };
  });
};

export const getOwnerNFT = async ({
  marketAddress,
  accountAddress,
}: {
  marketAddress: string;
  accountAddress: string | undefined;
}) => {
  const [idError, id] = await to(
    aptos.view({
      payload: {
        function: `${marketAddress}::NFTMarketplace::get_all_nfts_for_owner`,
        functionArguments: [marketAddress, accountAddress, "100", "0"],
      },
    }),
  );
  if (idError) {
    throw idError;
  }
  const idx = Array.isArray(id[0]) ? id[0] : id;

  const nfts = await Promise.all(
    idx.map(async (x) => {
      const p = x as number;
      const details = await aptos.view({
        payload: {
          function: `${marketAddress}::NFTMarketplace::get_nft_details`,
          functionArguments: [marketAddress, p],
        },
      });
      const [nftId, owner, name, description, uri, price, forSale, rarity] =
        details as [
          number,
          string,
          string,
          string,
          string,
          number,
          boolean,
          number,
        ];
      return {
        id: nftId,
        name: new TextDecoder().decode(hexToUint8Array(name.slice(2))),
        description: new TextDecoder().decode(
          hexToUint8Array(description.slice(2)),
        ),
        uri: new TextDecoder().decode(hexToUint8Array(uri.slice(2))),
        rarity,
        price: price / 100_000_000,
        for_sale: forSale,
        owner,
      };
    }),
  );
  return nfts;
};
