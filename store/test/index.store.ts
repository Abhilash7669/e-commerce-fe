import { createBearSlice } from "@/store/test/bear/bear.store";
import { createFishSlice } from "@/store/test/fish/fish.store";
import { create } from "zustand";

export const useBoundStore = create((...a) => ({
  ...createFishSlice(...a),
  ...createBearSlice(...a),
}));
