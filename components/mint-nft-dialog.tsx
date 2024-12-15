"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMint } from "@/app/hooks/aptos";
import { useUploadFile } from "@/app/hooks";
import { env } from "@/app/config";
import { match } from "ts-pattern";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  uri: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    ),
  rarity: z.string(),
});

export const MintNFTDialog = ({ children }: { children: React.ReactNode }) => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      uri: new File([""], "image.jpg", { type: "image/jpeg" }),
      rarity: "Common",
    },
  });
  const mint = useMint();
  const upload = useUploadFile();

  function onSubmit(values: z.infer<typeof formSchema>) {
    upload.mutate(
      {
        filename: values.uri[0].name,
        file: values.uri[0],
      },
      {
        onSuccess: (data) => {
          mint.mutate({
            ...values,
            uri: data.url,
            ownerAddress: env.ownerAddress,
            rarity: match(values.rarity)
              .with("common", () => 1)
              .with("uncommon", () => 2)
              .with("rare", () => 3)
              .with("epic", () => 4)
              .otherwise(() => 999),
          });
        },
      },
    );
  }

  console.log("upload", upload.data);
  console.log("mint", mint.data);
  console.log("mint", mint.error);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[400px] overflow-y-scroll bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Mint New NFT</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter NFT name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your NFT.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter NFT description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe your NFT in a few words.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uri"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          onChange(e.target.files);
                        }}
                        {...rest}
                      />
                      {previewImage && (
                        <Image
                          width={100}
                          height={100}
                          src={previewImage}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload an image for your NFT (max 5MB).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rarity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="uncommon">Uncommon</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the rarity of your NFT.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mint.isPending || upload.isPending}
              className="w-full"
            >
              {mint.isPending || upload.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting...
                </>
              ) : (
                "Mint NFT"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
