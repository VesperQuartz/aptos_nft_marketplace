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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTransferNFT } from "@/app/hooks/aptos";
const formSchema = z.object({
  address: z.string(),
});

export const TransferNFTDialog = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const transfer = useTransferNFT();
  function onSubmit(values: z.infer<typeof formSchema>) {
    transfer.mutate({ id, address: values.address });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="h-[400px] overflow-y-scroll bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Mint New NFT</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="0x..."
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    NFT address of the recipient
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={transfer.isPending}
              className="w-full"
            >
              {transfer.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transfering...
                </>
              ) : (
                "Gift NFT"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
