import ProductDetail from "@/features/products/_components/product-detail";
import { productsServices } from "@/features/products/services/index.services";
import { handleApiRequest } from "@/lib/api/api-wrapper";

type Props = {
  slug: string;
};

export default async function ProductPage({ slug }: Props) {
  const { data, success, message } = await handleApiRequest(
    productsServices.getProductDetail(slug),
  );

  if (!success) return `Error message here: ${message}`;

  if (!data) return `No data found`;

  return <ProductDetail data={data} />;
}
