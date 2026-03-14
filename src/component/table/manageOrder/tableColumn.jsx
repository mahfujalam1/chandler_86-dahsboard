import { UserOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import OrderDetailModal from "../../ui/Modal/OrderDetailsModal";

const statusColor = {
  pending: "orange",
  confirmed: "blue",
  cancelled: "red",
  delivered: "green",
};

const paymentColor = {
  pending: "orange",
  paid: "green",
  failed: "red",
};

// ── ActionCell — আলাদা component কারণ useState দরকার ────────────────────────
const ActionCell = ({ record, onAccept, onDecline }) => {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Eye icon */}
        <Tooltip title="View Details">
          <button
            onClick={() => setDetailOpen(true)}
            style={{
              background: "rgba(99,102,241,0.10)",
              color: "#6366f1",
              border: "none",
              borderRadius: "999px",
              width: 32,
              height: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <EyeOutlined style={{ fontSize: 14 }} />
          </button>
        </Tooltip>

        {/* Status badges / buttons */}
        {record.order_status === "confirmed" && (
          <span
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#16a34a",
              borderRadius: "999px",
              padding: "5px 14px",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Accepted
          </span>
        )}

        {record.order_status === "cancelled" && (
          <span
            style={{
              background: "rgba(239,68,68,0.12)",
              color: "#dc2626",
              borderRadius: "999px",
              padding: "5px 14px",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Cancelled
          </span>
        )}

        {record.order_status === "pending" && (
          <>
            <button
              onClick={() => onAccept(record)}
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#16a34a",
                border: "none",
                borderRadius: "999px",
                padding: "5px 14px",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: 13,
              }}
            >
              Accept
            </button>

            <Popconfirm
              title="Are you sure you want to decline this order?"
              description="This action cannot be undone."
              onConfirm={() => onDecline(record)}
              okText="Yes, Decline"
              cancelText="No"
              okButtonProps={{ danger: true, style: { borderRadius: "6px" } }}
              cancelButtonProps={{ style: { borderRadius: "6px" } }}
            >
              <button
                style={{
                  background: "rgba(239,68,68,0.12)",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                Decline
              </button>
            </Popconfirm>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <OrderDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        order={record}
      />
    </>
  );
};

// ── Columns factory ───────────────────────────────────────────────────────────
export const ordersColumns = (onAccept, onDecline) => [
  // 1. Customer
  {
    title: "Customer",
    key: "customer",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <Avatar
          src={
            record.user?.avatar
              ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${record.user.avatar.replace(/\\/g, "/")}`
              : null
          }
          icon={!record.user?.avatar ? <UserOutlined /> : null}
          size={40}
          style={{
            backgroundColor: "#e5e7eb",
            color: "#6b7280",
            flexShrink: 0,
          }}
        />
        <div>
          <div className="font-semibold text-gray-800 text-sm">
            {record.user?.full_name ?? "—"}
          </div>
          <div className="text-xs text-gray-400">
            {record.user?.email ?? "—"}
          </div>
          <div className="text-xs text-gray-400">
            {record.user?.phone ?? "—"}
          </div>
        </div>
      </div>
    ),
  },

  // 2. Items
  {
    title: "Items",
    key: "items",
    render: (_, record) => (
      <div className="flex flex-col gap-1">
        {record.items?.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-xs">
           
            <span>
              {item.product_title}{" "}
              <span className="text-gray-400">×{item.quantity}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },

  // 3. Location
  {
    title: "Location",
    dataIndex: "shipping_address",
    key: "shipping_address",
    render: (val) => (
      <span className="text-gray-600 text-sm capitalize">{val ?? "—"}</span>
    ),
  },

  // 4. Order Date
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val) =>
      val ? (
        <span className="text-gray-600 text-sm">
          {dayjs(val).format("DD MMM YYYY, hh:mm A")}
        </span>
      ) : (
        "—"
      ),
  },

  // 5. Payment
  {
    title: "Payment",
    key: "payment",
    render: (_, record) => (
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase font-medium text-gray-600">
          {record.payment_method ?? "—"}
        </span>
        <Tag color={paymentColor[record.payment_status] ?? "default"}>
          {record.payment_status ?? "—"}
        </Tag>
      </div>
    ),
  },

  // 6. Order Status
  {
    title: "Status",
    dataIndex: "order_status",
    key: "order_status",
    render: (status) => (
      <Tag color={statusColor[status] ?? "default"} className="capitalize">
        {status ?? "—"}
      </Tag>
    ),
  },

  // 7. Action
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <ActionCell record={record} onAccept={onAccept} onDecline={onDecline} />
    ),
  },
];
