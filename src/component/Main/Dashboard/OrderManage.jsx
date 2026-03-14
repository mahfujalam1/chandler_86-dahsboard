import { useState } from "react";
import { message } from "antd";
import ReusableTable from "../../../shared/ResuableTable";
import { ordersColumns } from "../../table/manageOrder/tableColumn";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/order/orderApi";

const OrdersTable = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 6;

  const { data: res, isLoading } = useGetAllOrdersQuery({
    page,
    limit,
    query: searchQuery,
  });

  const allOrders = res?.data?.orders ?? res?.data ?? [];
  const total = res?.data?.total ?? res?.total ?? 0;
  console.log(allOrders)

  const [updateOrderStatus, { isLoading: updating }] =
    useUpdateOrderStatusMutation();

  const handleAccept = async (record) => {
    try {
      await updateOrderStatus({
        id: record.id ?? record.key,
        order_status: "confirmed",
      }).unwrap();
      message.success("Order confirmed!");
    } catch (err) {
      message.error(err?.data?.message || "Failed to confirm order");
    }
  };

  const handleDecline = async (record) => {
    try {
      await updateOrderStatus({
        id: record.id ?? record.key,
        order_status: "cancelled",
      }).unwrap();
      message.success("Order cancelled!");
    } catch (err) {
      message.error(err?.data?.message || "Failed to cancel order");
    }
  };

  const filteredData =
    activeTab === "new"
      ? allOrders.filter(
          (row) => row.order_status === "pending" || row.status === "pending",
        )
      : allOrders;

  const columns = ordersColumns(handleAccept, handleDecline);

  const headerLeft = (
    <div className="flex items-center gap-4">
      <button
        onClick={() => {
          setActiveTab("new");
          setPage(1);
        }}
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

      <button
        onClick={() => {
          setActiveTab("all");
          setPage(1);
        }}
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
        loading={isLoading || updating}
        showSearch
        showPagination
        pageSize={limit}
        total={total}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        onSearch={(val) => {
          // ← search handler
          setSearchQuery(val);
          setPage(1);
        }}
        searchPlaceholder="Search here..."
        searchKeys={["shipping_address", "order_status", "payment_method"]}
        rowKey="id"
        headerLeft={headerLeft}
      />
    </div>
  );
};

export default OrdersTable;
