"use client";

import CardDefaultSkeleton from "@/components/card/variants/default/skeleton/card-default-skeleton";
import CardDetailed from "@/components/card/variants/detailed/card-detailed";
import CardListing from "@/components/container/card/card-listing";
import { collectionsServices } from "@/features/collections/services/index.services";
import { CollectionsQueryParamsDto } from "@/features/collections/types/index.types";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";

type Props = {
  slug: string;
};

export default function CollectionsProductListing({ slug }: Props) {
  const [collectionsParamsDto, setCollectionsParamsDto] =
    useState<CollectionsQueryParamsDto>({});
  const { data, error, isLoading, isSuccess, message } = useApi({
    dataFn: async () =>
      await collectionsServices.getCollectionProducts(
        slug,
        collectionsParamsDto,
      ),
    options: {
      selfExecute: true,
    },
    urlParams: collectionsParamsDto,
  });

  return (
    <section className="px-12 py-6">
      <div>
        <p>Choose color</p>
        <p
          onClick={() =>
            setCollectionsParamsDto((prevState) => ({
              ...prevState,
              color: "Red",
            }))
          }
        >
          Red
        </p>
        <p
          onClick={() =>
            setCollectionsParamsDto((prevState) => ({
              ...prevState,
              color: "Black",
            }))
          }
        >
          Black
        </p>
        <p
          onClick={() => {
            setCollectionsParamsDto((prevState) => ({
              ...prevState,
              sort: "basePrice-asc",
            }));
          }}
        >
          Sort basePrice in ascending
        </p>
      </div>
      {/* todo: can build a better error component */}
      {error && <p className="text-red-500">{message}</p>}
      {isLoading && (
        <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <CardDefaultSkeleton />
            </li>
          ))}
        </ul>
      )}
      {isSuccess && data && (
        <CardListing>
          {data.items.map((item) => (
            <li key={item.slug}>
              <CardDetailed
                basePrice={item.basePrice}
                image={item.images[0]}
                name={item.name}
              />
            </li>
          ))}
        </CardListing>
      )}
    </section>
  );
}
