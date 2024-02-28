"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { DEFAULT_ERROR_MESSAGE } from "@/app/_constants";

export default function SquadError({ error }: { error?: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <div className="container flex items-center h-screen px-6 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="text-sm font-medium text-primary rounded-full bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </p>
          <p className="mt-4 text-gray-500">{error?.message || DEFAULT_ERROR_MESSAGE}</p>
        </div>
      </div>
    </section>
  );
}
