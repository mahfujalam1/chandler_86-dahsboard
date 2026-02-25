import { useState } from "react";
import ReusableTable from "../../../shared/ResuableTable";
import { ordersColumns } from "../../table/manageOrder/tableColumn";
import { ordersData } from "../../table/manageOrder/tableData";

// ─── OrdersTable Component ─────────────────────────────────────────────────────
const OrdersTable = ({ data = ordersData }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [tableData, setTableData] = useState(data);

  // ── Accept হলে status "accepted" তে update হবে ──
  const handleAccept = (key) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.key === key ? { ...row, status: "accepted" } : row,
      ),
    );
  };

  // ── Decline confirm হলে row delete হবে ──
  const handleDecline = (key) => {
    setTableData((prev) => prev.filter((row) => row.key !== key));
  };

  // ── activeTab অনুযায়ী data filter ──
  const filteredData =
    activeTab === "new"
      ? tableData.filter((row) => row.status === "pending")
      : tableData;

  // ── Columns তৈরি করা handler সহ ──
  const columns = ordersColumns(handleAccept, handleDecline);

  const headerLeft = (
    <div className="flex items-center gap-4">
      {/* New Order Tab */}
      <button
        onClick={() => setActiveTab("new")}
        className="flex items-center gap-2 text-sm font-medium"
        style={{
          color: activeTab === "new" ? "#f97316" : "#9ca3af",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: activeTab === "new" ? "#f97316" : "#d1d5db",
            display: "inline-block",
          }}
        />
        New Order
      </button>

      {/* All Tab */}
      <button
        onClick={() => setActiveTab("all")}
        className="flex items-center gap-2 text-sm font-medium"
        style={{
          color: activeTab === "all" ? "#374151" : "#9ca3af",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            border: "3px solid",
            borderColor: activeTab === "all" ? "#374151" : "#d1d5db",
            display: "inline-block",
          }}
        />
        All
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
      <ReusableTable
        columns={columns}
        data={filteredData}
        showSearch={true}
        showPagination={true}
        pageSize={7}
        searchPlaceholder="Search here..."
        searchKeys={["name", "email", "location", "date"]}
        rowKey="key"
        headerLeft={headerLeft}
      />
    </div>
  );
};

export default OrdersTable;
