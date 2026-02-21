import CardDetailed from "@/components/card/variants/detailed/card-detailed";
import EyeBrowReversed from "@/components/eye-brow/variants/eye-brow-reversed";
import { homeServices } from "@/features/home/service/home.service";
import { handleApiRequest } from "@/lib/api/api-wrapper";
import Link from "next/link";

export default async function TrendingShowcase() {
  const { data, success } = await handleApiRequest(homeServices.getHomeData());

  // todo:
  if (!success) return "Oops! Handle this error later";

  const hasFeatured = data?.featured && data.featured.length > 0;

  if (!hasFeatured) return null;

  return (
    <section className="px-12 py-24 space-y-12">
      <EyeBrowReversed
        info={{
          title: "Trending now",
          description: "Our most-loved pieces this season",
        }}
        link="/trending"
      />
      <ul className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.featured.map((item) => (
          <li key={item.productId.slug}>
            <Link
              className="space-y-4"
              href={`/products/${item.productId.slug}`}
            >
              <CardDetailed
                basePrice={item.productId.basePrice}
                image={item.productId.images[0]}
                name={item.productId.name}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
