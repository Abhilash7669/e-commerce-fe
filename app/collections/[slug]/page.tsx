import { api } from "@/lib/api";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: PageParams) {
  const { slug } = await params;
  // const res = await fetch(`http://localhost:8080/collections/${slug}`, {
  //   next: {
  //     revalidate: 3,
  //   },
  // });

  // const data = await res.json();

  // if (!res.ok) {
  //   throw new Error(data.message);
  // }

  const data = await api.get<{
    slug: string;
    name: string;
    description: string;
    isActive: boolean;
  }>({
    endpoint: `/collections/${slug}`,
    options: {
      next: {
        revalidate: 5,
      },
    },
  });

  return (
    <main>
      {data && (
        <>
          <p>
            Slug: <span>{data.slug}</span>
          </p>
          <p>
            Name: <span>{data.name}</span>
          </p>
          <p>
            Description: <span>{data.description}</span>
          </p>
          <p>
            Satus: <span>{data.isActive ? "Active" : "Inactive"}</span>
          </p>
        </>
      )}
    </main>
  );
}
