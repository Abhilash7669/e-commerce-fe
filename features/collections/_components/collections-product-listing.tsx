"use client";

import ButtonSecondary from "@/components/buttons/button-secondary";
import CardDefaultSkeleton from "@/components/card/variants/default/skeleton/card-default-skeleton";
import CardDetailed from "@/components/card/variants/detailed/card-detailed";
import ColorPicker from "@/components/pickers/color-picker";
// todo: use General Container instead of CardListing
// import CardListing from "@/components/container/card/card-listing";
import GeneralContainer from "@/components/container/general-container";
import ButtonPicker from "@/components/pickers/button-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { COLOR_PICKER, SORT_BY } from "@/features/collections/data/index.data";
import useCollectionsQueryParamsDto from "@/features/collections/hooks/useCollectionsQueryParamsDto";
import { collectionsServices } from "@/features/collections/services/index.services";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { LuSlidersHorizontal } from "react-icons/lu";

type Props = {
  slug: string;
};

export default function CollectionsProductListing({ slug }: Props) {
  const {
    collectionsParamsDto,
    resetFilter,
    toggleSingleFilter,
    toggleArrayFilter,
    ColorConditionCheck,
    SizeConditionCheck,
    SortConditionCheck,
  } = useCollectionsQueryParamsDto();

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
    <section className="flex items-start justify-between gap-12 px-12 py-6">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <LuSlidersHorizontal className="text-xl" />
            <p className="font-playfair-display text-xl font-medium">Filters</p>
          </div>
          <ButtonSecondary onClick={resetFilter}>Reset Filter</ButtonSecondary>
        </div>
        <div>
          <Accordion type="multiple" defaultValue={["sort"]}>
            <AccordionItem value="sort">
              <AccordionTrigger className="cursor-pointer">
                Sort By
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {SORT_BY.map((item) => (
                    <ButtonPicker
                      key={item.value}
                      label={item.label}
                      onClick={() =>
                        toggleSingleFilter({
                          key: "sort",
                          value: item.value,
                          checked: SortConditionCheck(item.value),
                        })
                      }
                      isActive={SortConditionCheck(item.value)}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size">
              <AccordionTrigger className="cursor-pointer">
                Size
              </AccordionTrigger>
              <AccordionContent>
                <FieldSet>
                  <FieldGroup className="gap-3">
                    <Field orientation="horizontal">
                      <Checkbox
                        value={"XXS"}
                        checked={SizeConditionCheck("XXS")}
                        onCheckedChange={(checked: boolean) =>
                          toggleArrayFilter({
                            key: "size",
                            checked,
                            value: "XXS",
                          })
                        }
                        id="xxs"
                      />
                      <FieldLabel htmlFor="xxs" className="font-normal">
                        XXS
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={SizeConditionCheck("XS")}
                        onCheckedChange={(checked: boolean) =>
                          toggleArrayFilter({
                            key: "size",
                            checked,
                            value: "XS",
                          })
                        }
                        id="xs"
                      />
                      <FieldLabel htmlFor="xs" className="font-normal">
                        XS
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={SizeConditionCheck("S")}
                        onCheckedChange={(checked: boolean) =>
                          toggleArrayFilter({
                            key: "size",
                            checked,
                            value: "S",
                          })
                        }
                        id="s"
                      />
                      <FieldLabel htmlFor="s" className="font-normal">
                        S
                      </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox
                        checked={SizeConditionCheck("M")}
                        onCheckedChange={(checked: boolean) =>
                          toggleArrayFilter({
                            key: "size",
                            checked,
                            value: "M",
                          })
                        }
                        id="m"
                      />
                      <FieldLabel htmlFor="m" className="font-normal">
                        M
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="color">
              <AccordionTrigger className="cursor-pointer">
                Color
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <GeneralContainer className="xl:grid-cols-3">
                  {COLOR_PICKER.map((item) => (
                    <ColorPicker
                      key={item.color}
                      color={item.color}
                      colorName={item.colorName}
                      isActive={
                        collectionsParamsDto.color?.includes(item.colorName) ||
                        false
                      }
                      onClick={() =>
                        toggleArrayFilter({
                          key: "color",
                          value: item.colorName,
                          checked: ColorConditionCheck(item.colorName),
                        })
                      }
                    />
                  ))}
                </GeneralContainer>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex-4 ">
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
          <GeneralContainer className="flex-1">
            {data.items.map((item) => (
              <li key={item.slug}>
                <CardDetailed
                  basePrice={item.basePrice}
                  image={item.images[0]}
                  name={item.name}
                />
              </li>
            ))}
          </GeneralContainer>
        )}
        {isSuccess && data?.items.length === 0 && (
          <h1 className="text-center mx-auto h-[40vh] flex items-center justify-center">No Items Found</h1>
        )}
      </div>
    </section>
  );
}
