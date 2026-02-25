import React from "react";

export default function StatsBar({ total = 0, published = 0 }) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span>
        <span className="font-medium">Total Products:</span> All{" "}
        <span className="font-semibold">({total})</span>
      </span>
      <span className="text-gray-300">|</span>
      <span>
        <span className="font-medium">Publish:</span>{" "}
        <span className="font-semibold">({published})</span>
      </span>
    </div>
  );
}
