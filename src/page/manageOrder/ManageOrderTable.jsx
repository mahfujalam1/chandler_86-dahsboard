"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function OrderTable() {
  const [orders, setOrders] = useState([
    { orderNo: "#86475", email: "damiemail@gmail.com", totalItems: 4, price: 2415, tid: "65235465", deliveryTime: "05-12-25", status: "Packing" },
    { orderNo: "#86475", email: "damiemail@gmail.com", totalItems: 5, price: 2415, tid: "65235465", deliveryTime: "05-12-25", status: "Processing" },
    { orderNo: "#86475", email: "damiemail@gmail.com", totalItems: 1, price: 2415, tid: "65235465", deliveryTime: "05-12-25", status: "Pending" },
    { orderNo: "#86475", email: "damiemail@gmail.com", totalItems: 2, price: 2415, tid: "65235465", deliveryTime: "05-12-25", status: "Pending" },
    { orderNo: "#86475", email: "damiemail@gmail.com", totalItems: 6, price: 2415, tid: "65235465", deliveryTime: "05-12-25", status: "Pending" },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-900 font-semibold">
          <tr>
            <th className="px-4 py-3 whitespace-nowrap">Order No</th>
            <th className="px-4 py-3 whitespace-nowrap">User Email</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">Total Items</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">Price</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">T.ID</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">Delivery Time</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900">{order.orderNo}</td>
              <td className="px-4 py-3">{order.email}</td>
              <td className="px-4 py-3 text-center">
                {order.totalItems.toString().padStart(2, "0")}
              </td>
              <td className="px-4 py-3 text-center">${order.price}</td>
              <td className="px-4 py-3 text-center">{order.tid}</td>
              <td className="px-4 py-3 text-center">{order.deliveryTime}</td>
              <td className="px-4 py-3 text-center">
                <div className="relative inline-block">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="appearance-none bg-purple-50 border border-purple-200 text-purple-700 
                      text-sm rounded-md px-3 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="Packing">Packing</option>
                    <option value="Processing">Processing</option>
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1.5 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
