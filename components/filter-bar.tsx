"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import { FilterSchema } from "@/app/types/filters";
import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function FilterBar() {
  const [filters, setFilters] = useQueryStates(
    {
      rarity: FilterSchema.shape.rarity.transform((v) =>
        typeof v === "string" ? Number(v) : "",
      ),
      search: FilterSchema.shape.search,
      sort: FilterSchema.shape.sort,
    },
    {
      history: "push",
      clearOnDefault: true,
      parse: true,
    },
  );

  const clearFilters = () => {
    setFilters(
      {
        rarity: "",
        search: "",
        sort: "",
      },
      {
        clearOnDefault: true,
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Available NFTs
        </h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search NFTs..."
            value={filters.search || ""}
            onChange={(e) =>
              setFilters(
                {
                  search: e.target.value || "",
                },
                {
                  clearOnDefault: true,
                },
              )
            }
            className="max-w-xs"
          />

          <Select
            value={filters.sort || ""}
            onValueChange={(value) =>
              setFilters(
                {
                  sort: value || "",
                },
                {
                  clearOnDefault: true,
                },
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
            </SelectContent>
          </Select>

          {Object.values(filters).some(Boolean) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-400 hover:text-white"
            >
              Clear Filters
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={filters.rarity?.toString()}
        onValueChange={(value) =>
          setFilters(
            {
              rarity: value ? Number(value) : "",
            },
            {
              clearOnDefault: true,
            },
          )
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1" className="data-[state=active]:text-gray-400">
            Common
          </TabsTrigger>
          <TabsTrigger
            value="2"
            className="data-[state=active]:text-emerald-400"
          >
            Uncommon
          </TabsTrigger>
          <TabsTrigger value="3" className="data-[state=active]:text-blue-400">
            Rare
          </TabsTrigger>
          <TabsTrigger
            value="4"
            className="data-[state=active]:text-purple-400"
          >
            Epic
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
