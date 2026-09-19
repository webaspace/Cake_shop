'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  MessageCircle,
  Phone,
  CheckCircle,
  Clock,
  Truck,
  Store,
  ChevronDown,
  Eye,
  X,
  ShieldCheck,
} from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '@/lib/data-service';
import { Order, OrderStatus } from '@/types/order';

const ORDER_STATUSES: { label: string; value: OrderStatus; color: string }[] = [
  { label: 'Pending', value: 'pending', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { label: 'Contacted', value: 'contacted', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { label: 'Confirmed', value: 'confirmed', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { label: 'Preparing', value: 'preparing', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { label: 'Ready', value: 'ready', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { label: 'Completed', value: 'completed', color: 'bg-stone-100 text-stone-800 border-stone-300' },
  { label: 'Cancelled', value: 'cancelled', color: 'bg-rose-100 text-rose-800 border-rose-300' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getAllOrders();
      setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.order_number.toLowerCase().includes(q) ||
      order.customer_name.toLowerCase().includes(q) ||
      order.phone.includes(q) ||
      order.product_name.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C180D]">
            Order Enquiries &amp; Fulfilment
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage customer cake requests and update baking &amp; delivery statuses.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7D5C7] shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, customer name, phone, or cake..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              statusFilter === 'all'
                ? 'bg-[#3E2313] text-white'
                : 'bg-[#FAF5EE] text-stone-700 hover:bg-[#F3EAE0]'
            }`}
          >
            All ({orders.length})
          </button>
          {ORDER_STATUSES.map((st) => (
            <button
              key={st.value}
              onClick={() => setStatusFilter(st.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                statusFilter === st.value
                  ? 'bg-[#3E2313] text-white'
                  : 'bg-[#FAF5EE] text-stone-700 hover:bg-[#F3EAE0]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-[#E7D5C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C180D]">
            <thead className="bg-[#FAF5EE] text-stone-600 font-semibold border-b border-[#E7D5C7]">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Cake &amp; Size</th>
                <th className="py-3 px-4">Preferred Slot</th>
                <th className="py-3 px-4">Fulfilment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF5EE]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusObj =
                    ORDER_STATUSES.find((s) => s.value === order.status) || ORDER_STATUSES[0];
                  return (
                    <tr key={order.id} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-900">
                        #{order.order_number}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold">{order.customer_name}</div>
                        <div className="text-[11px] text-stone-500">{order.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold">{order.product_name}</div>
                        <div className="text-[11px] text-stone-500">
                          {order.size} (Qty: {order.quantity}) • ₹{order.total_estimated_price}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium">{order.preferred_date}</div>
                        <div className="text-[11px] text-stone-500">{order.preferred_time}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {order.fulfilment_type === 'delivery' ? (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-800 font-medium">
                              <Truck className="w-3.5 h-3.5" /> Delivery
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-stone-700 font-medium">
                              <Store className="w-3.5 h-3.5" /> Pickup
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className={`text-[11px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-lg border cursor-pointer focus:outline-none ${statusObj.color}`}
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st.value} value={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors inline-flex items-center gap-1 font-semibold text-[11px]"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>

                        <a
                          href={`https://wa.me/91${order.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hi ${order.customer_name}, this is Magic Cake Shop regarding your cake order #${order.order_number} for "${order.product_name}".`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 p-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 font-semibold text-[11px]"
                          title="Direct WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E7D5C7] shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#FAF5EE] pb-3">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                Order Details
              </span>
              <h3 className="font-serif text-xl font-bold text-[#2C180D]">
                Order #{selectedOrder.order_number}
              </h3>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-3 bg-[#FAF5EE] p-3 rounded-xl border border-[#E7D5C7]">
                <div>
                  <span className="font-semibold text-stone-500 block">Customer:</span>
                  <span className="font-bold text-sm text-[#2C180D]">{selectedOrder.customer_name}</span>
                  <div>Phone: {selectedOrder.phone}</div>
                  <div>WhatsApp: {selectedOrder.whatsapp}</div>
                </div>
                <div>
                  <span className="font-semibold text-stone-500 block">Cake Item:</span>
                  <span className="font-bold text-sm text-[#2C180D]">{selectedOrder.product_name}</span>
                  <div>Size: {selectedOrder.size} | Qty: {selectedOrder.quantity}</div>
                  <div className="font-bold text-amber-800">Total: ₹{selectedOrder.total_estimated_price}</div>
                </div>
              </div>

              {selectedOrder.cake_message && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-0.5">Icing Message on Cake:</span>
                  <span className="text-stone-800 italic">&ldquo;{selectedOrder.cake_message}&rdquo;</span>
                </div>
              )}

              {selectedOrder.special_instructions && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-700 block mb-0.5">Special Instructions:</span>
                  <span>{selectedOrder.special_instructions}</span>
                </div>
              )}

              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E7D5C7] space-y-1">
                <span className="font-bold text-[#2C180D] block">Fulfilment Information:</span>
                <div>Type: <strong className="capitalize">{selectedOrder.fulfilment_type}</strong></div>
                {selectedOrder.fulfilment_type === 'delivery' && (
                  <>
                    <div>Address: {selectedOrder.delivery_address}</div>
                    <div>Area: {selectedOrder.delivery_area} (Pincode: {selectedOrder.pincode})</div>
                  </>
                )}
                <div>Preferred Slot: {selectedOrder.preferred_date} ({selectedOrder.preferred_time})</div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Update Order Status:
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                  }
                  className="w-full p-2 rounded-xl border border-[#E7D5C7] text-xs font-bold"
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-[#FAF5EE] flex gap-2">
              <a
                href={`https://wa.me/91${selectedOrder.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hi ${selectedOrder.customer_name}, this is Magic Cake Shop. Your order #${selectedOrder.order_number} for "${selectedOrder.product_name}" is currently marked as: ${selectedOrder.status}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
              <button
                onClick={() => setSelectedOrder(null)}
                className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
