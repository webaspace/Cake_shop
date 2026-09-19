import React from 'react';
import Link from 'next/link';
import { Cake, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 bg-[#FDFBF7] flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FAF5EE] border-2 border-[#E7D5C7] text-[#3E2313] flex items-center justify-center mx-auto">
          <Cake className="w-10 h-10 text-amber-700" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Error 404
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-[#2C180D]">
            Sweet Tooth, Wrong Turn!
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            The cake or page you are looking for seems to have been savored already or moved to a different oven.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/cakes"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#3E2313] text-amber-100 hover:bg-[#2C180D] text-xs font-bold transition-all shadow-xs"
          >
            <Cake className="w-4 h-4" />
            <span>Browse All Cakes</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-[#E7D5C7] bg-white text-[#2C180D] hover:bg-[#FAF5EE] text-xs font-bold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
