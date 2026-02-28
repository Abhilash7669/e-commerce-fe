export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="px-8 py-4 flex items-center gap-2">
        <div className="shimmer h-3 w-10 rounded" />
        <span className="text-muted-foreground">/</span>
        <div className="shimmer h-3 w-12 rounded" />
        <span className="text-muted-foreground">/</span>
        <div className="shimmer h-3 w-20 rounded" />
      </div>

      <div className="grid grid-cols-2 gap-12 px-8 py-6">
        {/* Left — Main image */}
        <div className="flex flex-col gap-4">
          <div className="shimmer w-full aspect-[4/5] rounded-xl" />

          {/* Thumbnails */}
          <div className="flex gap-3">
            <div className="shimmer h-20 w-20 rounded-lg" />
            <div className="shimmer h-20 w-20 rounded-lg" />
            <div className="shimmer h-20 w-20 rounded-lg" />
          </div>
        </div>

        {/* Right — Product info */}
        <div className="flex flex-col gap-6 pt-2">
          {/* Badge */}
          <div className="shimmer h-6 w-14 rounded-full" />

          {/* Title */}
          <div className="flex flex-col gap-2">
            <div className="shimmer h-9 w-3/4 rounded" />
          </div>

          {/* Price + Rating */}
          <div className="flex items-center justify-between">
            <div className="shimmer h-7 w-16 rounded" />
            <div className="shimmer h-5 w-20 rounded" />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-4/5 rounded" />
          </div>

          <div className="border-t border-border" />

          {/* Color */}
          <div className="flex flex-col gap-3">
            <div className="shimmer h-4 w-12 rounded" />
            <div className="flex gap-3">
              <div className="shimmer h-8 w-8 rounded-full" />
              <div className="shimmer h-8 w-8 rounded-full" />
              <div className="shimmer h-8 w-8 rounded-full" />
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col gap-3">
            <div className="shimmer h-4 w-16 rounded" />
            <div className="flex gap-2">
              <div className="shimmer h-10 w-12 rounded-md" />
              <div className="shimmer h-10 w-12 rounded-md" />
              <div className="shimmer h-10 w-12 rounded-md" />
              <div className="shimmer h-10 w-12 rounded-md" />
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Quantity + Add to bag */}
          <div className="flex items-center gap-4">
            <div className="shimmer h-12 w-28 rounded-lg" />
            <div className="shimmer h-12 flex-1 rounded-lg" />
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="px-8 py-12 flex flex-col gap-6">
        <div className="shimmer h-8 w-48 rounded" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="shimmer w-full aspect-3/4 rounded-xl" />
              <div className="shimmer h-4 w-3/4 rounded" />
              <div className="shimmer h-4 w-1/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
