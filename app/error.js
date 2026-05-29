"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ed]">
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 bg-[#f97316] rounded-full mx-auto mb-6 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-8">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl font-semibold transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-[#f97316] text-[#f97316] rounded-xl font-semibold hover:bg-[#fff7ed] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
