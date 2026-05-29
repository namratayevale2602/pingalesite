import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ed]">
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 bg-[#f97316] rounded-full mx-auto mb-6 flex items-center justify-center">
          <FileQuestion className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl font-semibold transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
