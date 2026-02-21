import CardSplit from "@/components/card/variants/split/card-split";
import EyeBrowDefault from "@/components/eye-brow/variants/eye-brow-default";
import { homeServices } from "@/features/home/service/home.service";
import { handleApiRequest } from "@/lib/api/api-wrapper";
import Link from "next/link";

export default async function CollectionShowcase() {
  const { data, success } = await handleApiRequest(homeServices.getHomeData());

  // todo:
  if (!success) return "Oops! Handle this error later";

  const hasCollections = data?.collections && data.collections.length > 0;

  if (!hasCollections) return null;

  return (
    <section className="px-12 py-24 space-y-12">
      <EyeBrowDefault
        info={{
          title: "Our Collections",
          description: "Curated For you",
        }}
        link="/collections"
      />
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.collections.map((item) => (
          <li key={item.slug}>
            <Link href={`/collections/${item.slug}`}>
              <CardSplit
                className="h-114 gap-0"
                data={item}
                linkText="Shop now"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
