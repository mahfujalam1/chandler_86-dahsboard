import { useState } from "react";
import { Avatar, Popconfirm, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ReusableTable from "../../../shared/ResuableTable";
// ─── Initial Data ──────────────────────────────────────────────────────────────
const initialData = [
  {
    key: "1",
    name: "Al-Amin",
    email: "shimizuker@cybereas..",
    extraEmails: "+20",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    location: "Portland, Illinois",
    date: "November 28, 2015",
  },
  {
    key: "2",
    name: "Al-Amin",
    email: "nathan.roberts@example.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    location: "Pasadena, Oklahoma",
    date: "November 7, 2017",
  },
  {
    key: "3",
    name: "Al-Amin",
    email: "debra.holt@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    location: "Corona, Michigan",
    date: "February 9, 2015",
  },
  {
    key: "4",
    name: "Al-Amin",
    email: "nevaeh.simmons@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    location: "Lafayette, California",
    date: "September 9, 2013",
  },
  {
    key: "5",
    name: "Al-Amin",
    email: "tanya.hill@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    location: "Great Falls, Maryland",
    date: "March 6, 2018",
  },
  {
    key: "6",
    name: "Al-Amin",
    email: "tim.jennings@example.com",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    location: "Stockton, New Hampshire",
    date: "December 29, 2012",
  },
  {
    key: "7",
    name: "Al-Amin",
    email: "jackson.graham@example.com",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    location: "Syracuse, Connecticut",
    date: "October 31, 2017",
  },
];

// ─── AllSurgent Component ──────────────────────────────────────────────────────
const SargentManage = ({ onBack }) => {
  const [data, setData] = useState(initialData);
  const [messageApi, contextHolder] = message.useMessage();

  const handleDecline = (record) => {
    setData((prev) => prev.filter((item) => item.key !== record.key));
    messageApi.warning(`${record.name} has been declined.`);
  };

  const columns = [
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

  // Header left: back arrow + title
  const headerLeft = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span style={{ fontSize: 17, fontWeight: 700, color: "#1f2937" }}>
        All Surgent
      </span>
    </div>
  );

  return (
    <>
      {contextHolder}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "20px 24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <ReusableTable
          columns={columns}
          data={data}
          showSearch
          showPagination
          pageSize={7}
          searchPlaceholder="Search here..."
          searchKeys={["name", "email", "location", "date"]}
          rowKey="key"
          headerLeft={headerLeft}
          headerRight={null}
        />
      </div>
    </>
  );
};

export default SargentManage;
