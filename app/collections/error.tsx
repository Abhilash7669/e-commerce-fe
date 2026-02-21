"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error, "ERROR");
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>
        Reset?
      </button>
      <Link href="/">Back to Home page</Link>
    </div>
  );
}
