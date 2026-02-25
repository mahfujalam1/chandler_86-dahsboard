import { useState } from "react";

const [data, setData] = useState(initialData);
const [messageApi, contextHolder] = message.useMessage();

const handleDecline = (record) => {
  setData((prev) => prev.filter((item) => item.key !== record.key));
  messageApi.warning(`${record.name} has been declined.`);
};

export const SargentColumns = [
  {
    title: "Surgent Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar
          src={record.avatar}
          icon={!record.avatar ? <UserOutlined /> : null}
          size={44}
          style={{
            flexShrink: 0,
            border: "2px solid #f3f4f6",
          }}
        />
        <div>
          <div style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}>
            {record.name}
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
            {record.email}
            {record.extraEmails && (
              <span
                style={{ color: "#f97316", fontWeight: 600, marginLeft: 4 }}
              >
                {record.extraEmails}
              </span>
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (val) => (
      <span style={{ color: "#6b7280", fontSize: 14 }}>{val}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (val) => (
      <span style={{ color: "#6b7280", fontSize: 14 }}>{val}</span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Popconfirm
        title="Decline Surgent"
        description={`Are you sure you want to decline ${record.name}?`}
        onConfirm={() => handleDecline(record)}
        okText="Yes, Decline"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          style: { borderRadius: 6, fontWeight: 600 },
        }}
        cancelButtonProps={{ style: { borderRadius: 6 } }}
      >
        <button
          style={{
            background: "rgba(239,68,68,0.12)",
            color: "#dc2626",
            border: "none",
            borderRadius: 999,
            padding: "6px 20px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          Declined
        </button>
      </Popconfirm>
    ),
  },
];
