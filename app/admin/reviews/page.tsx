'use client';

import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, XCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { getAllReviews, updateReviewApproval } from '@/lib/data-service';
import { Review } from '@/types/review';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllReviews();
      setReviews(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    const nextApproved = !currentApproved;
    await updateReviewApproval(id, nextApproved);
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: nextApproved } : r))
    );
  };

  const approvedCount = reviews.filter((r) => r.approved).length;
  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C180D]">
            Customer Review Moderation
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Approve or hold reviews submitted by customers before they display on the public storefront.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            {approvedCount} Approved
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            {pendingCount} Pending Moderation
          </span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-[#E7D5C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C180D]">
            <thead className="bg-[#FAF5EE] text-stone-600 font-semibold border-b border-[#E7D5C7]">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Review Content</th>
                <th className="py-3 px-4">Cake &amp; Occasion</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF5EE]">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="py-3.5 px-4 font-bold">
                    {rev.customer_name}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <p className="line-clamp-2 text-stone-600 italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-800">{rev.cake_ordered || 'Celebration Cake'}</div>
                    <div className="text-[11px] text-stone-500">{rev.occasion || 'General'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        rev.approved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rev.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleToggleApproval(rev.id, rev.approved)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        rev.approved
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      }`}
                    >
                      {rev.approved ? (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject / Hide</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
