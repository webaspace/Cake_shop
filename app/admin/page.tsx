'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Package,
  MessageSquare,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';
import { getAllOrders, getProducts, getAllReviews } from '@/lib/data-service';
import { Order } from '@/types/order';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import { generateOrderWhatsAppUrl } from '@/lib/whatsapp';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [o, p, r] = await Promise.all([
        getAllOrders(),
        getProducts(),
        getAllReviews(),
      ]);
      setOrders(o);
      setProducts(p);
      setReviews(r);
      setLoading(false);
    }
    loadStats();
  }, []);

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed' || o.status === 'preparing');
  const totalEstimatedRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, curr) => acc + (curr.total_estimated_price || 0), 0);
  const pendingReviews = reviews.filter((r) => !r.approved);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C180D]">
            Bakery Overview
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your direct orders, products, and customer enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-[#3E2313] hover:bg-[#2C180D] text-amber-100 text-xs font-bold transition-all shadow-xs"
          >
            + Add New Cake
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-xl bg-white border border-[#E7D5C7] text-stone-700 hover:bg-[#FAF5EE] text-xs font-bold transition-all"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7D5C7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Total Enquiries
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#2C180D] mt-1 block">
              {orders.length}
            </span>
            <span className="text-[11px] text-amber-700 font-medium">
              {pendingOrders.length} awaiting response
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              Pending Orders
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-amber-900 mt-1 block">
              {pendingOrders.length}
            </span>
            <span className="text-[11px] text-stone-500">
              Needs WhatsApp confirmation
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7D5C7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Cake Catalogue
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#2C180D] mt-1 block">
              {products.length}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">
              Active in storefront
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7D5C7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Customer Reviews
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#2C180D] mt-1 block">
              {reviews.length}
            </span>
            <span className="text-[11px] text-amber-700 font-medium">
              {pendingReviews.length} pending moderation
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E7D5C7] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#FAF5EE] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#2C180D]">
              Recent Customer Cake Enquiries
            </h3>
            <p className="text-xs text-stone-500">
              Direct orders received through the website.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C180D]">
            <thead className="bg-[#FAF5EE] text-stone-600 font-semibold border-b border-[#E7D5C7]">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Cake &amp; Size</th>
                <th className="py-3 px-4">Date / Slot</th>
                <th className="py-3 px-4">Fulfilment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF5EE]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-900">
                    #{order.order_number}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold">{order.customer_name}</div>
                    <div className="text-[11px] text-stone-500">{order.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium">{order.product_name}</div>
                    <div className="text-[11px] text-stone-500">
                      {order.size} (Qty: {order.quantity}) • ₹{order.total_estimated_price}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>{order.preferred_date}</div>
                    <div className="text-[11px] text-stone-500">{order.preferred_time}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">
                      {order.fulfilment_type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : order.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <a
                      href={`https://wa.me/91${order.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hi ${order.customer_name}, this is Magic Cake Shop regarding your order #${order.order_number} for "${order.product_name}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 font-semibold text-[11px]"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat</span>
                    </a>
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
