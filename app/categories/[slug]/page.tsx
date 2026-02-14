import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: Props) {
  const { slug } = await params;
  return <div>{slug}</div>;
}
