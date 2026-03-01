"use client";

import AdvancedWaterRipple from "@/components/water-ripple";

type Props = object;

export default function Page({}: Props) {
  return (
    <div className="h-screen">
      {" "}
      <AdvancedWaterRipple
        className="h-screen"
        dropRadius={25}
        imageUrl="/hero/testing-b.jpg"
        perturbance={0.04}
      >
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bold text-black">Welcome</h1>
          <p className="text-2xl text-black">Interactive Water Effect</p>
        </div>
      </AdvancedWaterRipple>
    </div>
  );
}
