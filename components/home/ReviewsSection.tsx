'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, X, Sparkles, Heart } from 'lucide-react';
import { Review, ReviewInput } from '@/types/review';
import { submitReview } from '@/lib/data-service';

interface ReviewsSectionProps {
  initialReviews: Review[];
}

export default function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [cakeOrdered, setCakeOrdered] = useState('');
  const [occasion, setOccasion] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    setSubmitting(true);
    try {
      const input: ReviewInput = {
        customer_name: name.trim(),
        rating,
        cake_ordered: cakeOrdered.trim() || undefined,
        occasion: occasion.trim() || undefined,
        review: reviewText.trim(),
      };
      await submitReview(input);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-[#E7D5C7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Sweet Words From Bhayandar</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
              Customer Experiences
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Real celebrations made memorable with Magic Cake Shop.
            </p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7D5C7] bg-[#FAF5EE] text-xs font-bold text-[#3E2313] hover:bg-[#3E2313] hover:text-white transition-all self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-600" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Demo data badge reminder per requirements */}
        <div className="mb-6 p-2.5 bg-[#FAF5EE] border border-[#E7D5C7] rounded-xl text-xs text-stone-600 flex items-center justify-between">
          <span>* Displayed customer stories include demo MVP testimonials and approved submissions.</span>
          <span className="text-[11px] font-semibold text-amber-800">Supabase Moderated</span>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#E7D5C7]/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex text-amber-400 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed italic mb-4">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#FAF5EE]">
                <div className="font-serif text-sm font-bold text-[#2C180D]">
                  {rev.customer_name}
                </div>
                {rev.cake_ordered && (
                  <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                    Cake: {rev.cake_ordered}
                  </div>
                )}
                {rev.occasion && (
                  <div className="text-[10px] text-stone-400">
                    Occasion: {rev.occasion}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E7D5C7] shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2C180D]">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Your review has been submitted for moderation and will appear on our website after review by the bakery manager.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-[#3E2313] text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2C180D]">
                    Share Your Cake Experience
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your feedback helps our local bakery in Bhayandar grow!
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Your Name &amp; Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pooja M. (Navghar Road)"
                    className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">
                      Cake Ordered
                    </label>
                    <input
                      type="text"
                      value={cakeOrdered}
                      onChange={(e) => setCakeOrdered(e.target.value)}
                      placeholder="e.g. Rasmalai Cake"
                      className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-600 block mb-1">
                      Occasion
                    </label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="e.g. 1st Birthday"
                      className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-600 block mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    placeholder="Tell us about the taste, sponge freshness, and delivery..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#3E2313] hover:bg-[#2C180D] text-amber-100 text-xs font-bold transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
