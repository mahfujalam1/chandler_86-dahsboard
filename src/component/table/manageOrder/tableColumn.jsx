import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

export const ordersColumns = (onAccept, onDecline) => [
  {
    title: "Sargent Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <Avatar
          src={record.avatar}
          icon={!record.avatar ? <UserOutlined /> : null}
          size={40}
          style={{
            backgroundColor: "#e5e7eb",
            color: "#6b7280",
            flexShrink: 0,
          }}
        />
        <div>
          <div className="font-semibold text-gray-800 text-sm">
            {record.name}
          </div>
          <div className="text-xs text-gray-400">
            {record.email}
            {record.extraEmails && (
              <span className="text-orange-400 font-medium ml-1">
                {record.extraEmails}
              </span>
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Total Item",
    dataIndex: "totalItem",
    key: "totalItem",
    render: (val) => <span className="text-gray-600">{val}</span>,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (val) => <span className="text-gray-600 text-sm">{val}</span>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (val) => <span className="text-gray-600 text-sm">{val}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      // যদি accepted হয়ে যায়, badge দেখাও
      if (record.status === "accepted") {
        return (
          <span
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#16a34a",
              borderRadius: "999px",
              padding: "5px 18px",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Accepted
          </span>
        );
      }

      return (
        <div className="flex gap-2">
          {/* ── Accept Button ── */}
          <button
            onClick={() => onAccept(record.key)}
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#16a34a",
              border: "none",
              borderRadius: "999px",
              padding: "5px 18px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Accept
          </button>

          {/* ── Decline Button with Popconfirm ── */}
          <Popconfirm
            title="Are you sure you want to decline this order?"
            description="This order will be permanently deleted."
            onConfirm={() => onDecline(record.key)}
            okText="Yes, Delete"
            cancelText="No"
            okButtonProps={{
              danger: true,
              style: { borderRadius: "6px" },
            }}
            cancelButtonProps={{
              style: { borderRadius: "6px" },
            }}
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
              Declined
            </button>
          </Popconfirm>
        </div>
      );
    },
  },
];
