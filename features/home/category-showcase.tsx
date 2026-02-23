import CardDefault from "@/components/card/variants/default/card-default";
import CardListing from "@/components/container/card/card-listing";
import { homeServices } from "@/features/home/service/home.service";
import { handleApiRequest } from "@/lib/api/api-wrapper";
import Link from "next/link";

export default async function CategoryShowcase() {
  const { data, success } = await handleApiRequest(homeServices.getHomeData());

  // todo:
  if (!success) return "Oops! Handle this error later";

  const hasCategories = data?.categories && data.categories.length > 0;

  // todo: check it out later
  if (!hasCategories) return null;

  return (
    <section className="py-24 px-12 space-y-12">
      <div className="space-y-4 place-self-center">
        <h2>Shop by Category</h2>
        <p className="text-sm text-center text-muted-foreground">
          Find exactly what you are looking for
        </p>
      </div>
      {hasCategories && (
        <CardListing className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.categories.map((item) => (
            <li key={item.slug}>
              <Link href={`/categories/${item.slug}`}>
                <CardDefault data={item} />
              </Link>
            </li>
          ))}
        </CardListing>
      )}
    </section>
  );
}
