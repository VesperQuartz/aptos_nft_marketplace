import z from "zod";

const envSchema = z.object({
  ownerAddress: z.string(),
});

export const env = envSchema.parse({
  ownerAddress: process.env.NEXT_PUBLIC_DEPLOY_ADDRESS!,
});
