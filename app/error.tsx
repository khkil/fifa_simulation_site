"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { DEFAULT_ERROR_MESSAGE } from "@/app/_constants";

export default function Error({ error }: { error?: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error || "unknown error");
  }, [error]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">{DEFAULT_ERROR_MESSAGE}</p>
          <p className="mb-4 text-lg font-light text-gray-500">빠르게 오류를 수정중에 있습니다.</p>
          <Link
            href="/"
            className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            홈페이지로 이동
          </Link>
        </div>
      </div>
    </section>
    /*   <div>
         <h2>Something went wrong!</h2>
         <button
           onClick={
             // Attempt to recover by trying to re-render the segment
             () => reset()
           }
         >
           Try again
         </button>
       </div>*/
  );
}
