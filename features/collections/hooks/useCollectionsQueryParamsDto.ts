"use client";

import { CollectionsQueryParamsDto } from "@/features/collections/types/index.types";
import { useState } from "react";

const INITIAL_STATE = {};

export default function useCollectionsQueryParamsDto() {
  const [collectionsParamsDto, setCollectionsParamsDto] =
    useState<CollectionsQueryParamsDto>(INITIAL_STATE);

  /**
   * Toggles between set and unset filter for type array
   * @param options
   */
  function toggleArrayFilter(options: {
    key: keyof Pick<CollectionsQueryParamsDto, "size" | "color">;
    value: string;
    checked: boolean;
  }) {
    const { checked, key, value } = options;
    setCollectionsParamsDto((prevState) => {
      if (checked) {
        return {
          ...prevState,
          [key]:
            prevState[key] && prevState[key]?.length > 0
              ? [...prevState[key], value]
              : [value],
        };
      } else {
        return {
          ...prevState,
          [key]: prevState[key]?.filter((s) => s !== value),
        };
      }
    });
  }

  /**
   * Sets a single filter
   * @param options
   */
  function toggleSingleFilter(options: {
    key: keyof Omit<CollectionsQueryParamsDto, "size" | "color">;
    value: string;
  }) {
    const { key, value } = options;
    setCollectionsParamsDto((prevState) => {
      // check if it is already present
      if (!prevState[key]) {
        return {
          ...prevState,
          [key]: value,
        };
      } else {
        const { [key]: _, ...rest } = prevState;
        return rest;
      }
    });
  }

  /**
   * Removes a filter
   * @param key
   */
  function removeFilter(key: keyof CollectionsQueryParamsDto) {
    setCollectionsParamsDto((prevState) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prevState;

      return rest;
    });
  }

  /**
   * Resets the filter to INITIAL_STATE
   */
  function resetFilter() {
    setCollectionsParamsDto(INITIAL_STATE);
  }

  /**
   * Checks if color is checked or not
   */
  function ColorConditionCheck(colorName: string) {
    return collectionsParamsDto.color
      ? collectionsParamsDto.color.includes(colorName)
        ? false
        : true
      : true;
  }

  /**
   * Checks if size is checked or not
   */
  function SizeConditionCheck(size: string) {
    return collectionsParamsDto.size?.includes(size) || false;
  }

  function SortConditionCheck(sortValue: string) {
    return collectionsParamsDto.sort?.includes(sortValue) || false;
  }

  return {
    toggleArrayFilter,
    collectionsParamsDto,
    removeFilter,
    resetFilter,
    toggleSingleFilter,
    ColorConditionCheck,
    SizeConditionCheck,
    SortConditionCheck,
  };
}
