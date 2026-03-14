import { Modal, Tag, Divider } from "antd";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

const statusColor = {
  pending: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  confirmed: { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  cancelled: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
  delivered: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
};

const paymentColor = {
  pending: "orange",
  paid: "green",
  failed: "red",
};

const OrderDetailModal = ({ open, onClose, order }) => {
  if (!order) return null;

  const status = statusColor[order.order_status] ?? {
    bg: "#f9fafb",
    color: "#6b7280",
    border: "#e5e7eb",
  };

  const subtotal = order.items?.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0,
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={620}
      centered
      title={null}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ fontFamily: "inherit" }}>
        {/* ── Header ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
            borderRadius: "8px 8px 0 0",
            padding: "24px 28px",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 4,
                }}
              >
                Invoice
              </div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                #{order.id?.slice(-8).toUpperCase()}
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                {dayjs(order.createdAt).format("DD MMM YYYY, hh:mm A")}
              </div>
            </div>
            <div
              style={{
                background: status.bg,
                color: status.color,
                border: `1px solid ${status.border}`,
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {order.order_status}
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {/* ── Customer Info ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: 10,
                }}
              >
                Customer
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={
                    order.user?.avatar
                      ? `${BASE_URL}/${order.user.avatar.replace(/\\/g, "/")}`
                      : null
                  }
                  alt={order.user?.full_name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #e5e7eb",
                    flexShrink: 0,
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div>
                  <div
                    style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}
                  >
                    {order.user?.full_name ?? "—"}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {order.user?.email ?? "—"}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {order.user?.phone ?? "—"}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f9fafb",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: 10,
                }}
              >
                Delivery Info
              </div>
              <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>
                <span style={{ color: "#9ca3af", fontSize: 11 }}>
                  Shipping:{" "}
                </span>
                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                  {order.shipping_address ?? "—"}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>
                <span style={{ color: "#9ca3af", fontSize: 11 }}>
                  Billing:{" "}
                </span>
                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                  {order.billing_address ?? "—"}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#374151" }}>
                <span style={{ color: "#9ca3af", fontSize: 11 }}>
                  Delivery:{" "}
                </span>
                <span style={{ fontWeight: 500 }}>
                  {order.delivery_date
                    ? dayjs(order.delivery_date).format("DD MMM YYYY")
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Payment Info ── */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 24,
              display: "flex",
              gap: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: 6,
                }}
              >
                Payment Method
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1f2937",
                  textTransform: "uppercase",
                }}
              >
                {order.payment_method ?? "—"}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: 6,
                }}
              >
                Payment Status
              </div>
              <Tag
                color={paymentColor[order.payment_status] ?? "default"}
                style={{ borderRadius: 6 }}
              >
                {order.payment_status ?? "—"}
              </Tag>
            </div>
            {order.notes && (
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    marginBottom: 6,
                  }}
                >
                  Notes
                </div>
                <div style={{ fontSize: 13, color: "#374151" }}>
                  {order.notes}
                </div>
              </div>
            )}
          </div>

          {/* ── Items Table ── */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.7px",
                marginBottom: 10,
              }}
            >
              Order Items
            </div>

            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 60px",
                padding: "8px 12px",
                background: "#f3f4f6",
                borderRadius: "8px 8px 0 0",
                fontSize: 11,
                fontWeight: 700,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <span>Product</span>
              <span style={{ textAlign: "center" }}>Qty</span>
              <span style={{ textAlign: "right" }}>—</span>
            </div>

            {/* Items */}
            {order.items?.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 60px",
                  padding: "10px 12px",
                  alignItems: "center",
                  borderBottom:
                    idx < order.items.length - 1 ? "1px solid #f3f4f6" : "none",
                  background: "#fff",
                  border: "1px solid #f3f4f6",
                  borderTop: "none",
                  borderRadius:
                    idx === order.items.length - 1 ? "0 0 8px 8px" : 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={`${BASE_URL}/${item.product_image?.replace(/\\/g, "/")}`}
                    alt={item.product_title}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 6,
                      objectFit: "cover",
                      border: "1px solid #e5e7eb",
                      flexShrink: 0,
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: "#1f2937" }}
                  >
                    {item.product_title}
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  ×{item.quantity}
                </div>
                <div
                  style={{ textAlign: "right", fontSize: 12, color: "#9ca3af" }}
                >
                  —
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 16,
              borderTop: "1px dashed #e5e7eb",
            }}
          >
            <div style={{ fontSize: 12, color: "#9ca3af" }}>
              Order ID:{" "}
              <span style={{ fontFamily: "monospace", color: "#6b7280" }}>
                {order.id}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>
              Total items:{" "}
              <span style={{ fontWeight: 600, color: "#1f2937" }}>
                {order.items?.reduce((s, i) => s + i.quantity, 0) ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
