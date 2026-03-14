import { useState } from "react";
import { Avatar, Popconfirm, message, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ReusableTable from "../../../shared/ResuableTable";
import {
  useGetAllUsersQuery,
  useToggleBlockUserMutation,
} from "../../../redux/features/user/userApi";

const SargentManage = ({ onBack }) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 7;

  // GET /users/search?query=&page=&limit=
  const { data: res, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    query: searchQuery,
  });

  // response shape অনুযায়ী adjust করুন
  const users = res?.data?.users ?? res?.data ?? [];
  const total = res?.data?.total ?? res?.total ?? 0;

  // PATCH /users/togglee-block
  const [toggleBlockUser, { isLoading: toggling }] =
    useToggleBlockUserMutation();

  const handleToggleBlock = async (record) => {
    try {
      await toggleBlockUser({ userId: record.id ?? record._id }).unwrap();
      message.success(
        `${record.full_name ?? record.name} has been ${
          record.is_blocked ? "unblocked" : "blocked"
        }.`,
      );
    } catch (err) {
      message.error(err?.data?.message || "Action failed");
    }
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar
            src={
              record.avatar
                ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${record.avatar.replace(/\\/g, "/")}`
                : null
            }
            icon={!record.avatar ? <UserOutlined /> : null}
            size={44}
            style={{ flexShrink: 0, border: "2px solid #f3f4f6" }}
          />
          <div>
            <div style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}>
              {record.full_name ?? record.name ?? "—"}
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
              {record.email ?? "—"}
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>
              {record.phone ?? ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) =>
        val ? (
          <span style={{ color: "#6b7280", fontSize: 14 }}>
            {new Date(val).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        ) : (
          "—"
        ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.is_blocked ? "red" : "green"}>
          {record.is_blocked ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title={record.is_blocked ? "Unblock User" : "Block User"}
          description={`Are you sure you want to ${
            record.is_blocked ? "unblock" : "block"
          } ${record.full_name ?? record.name}?`}
          onConfirm={() => handleToggleBlock(record)}
          okText={record.is_blocked ? "Yes, Unblock" : "Yes, Block"}
          cancelText="Cancel"
          okButtonProps={{
            danger: !record.is_blocked,
            style: { borderRadius: 6, fontWeight: 600 },
          }}
          cancelButtonProps={{ style: { borderRadius: 6 } }}
        >
          <button
            style={{
              background: record.is_blocked
                ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.12)",
              color: record.is_blocked ? "#16a34a" : "#dc2626",
              border: "none",
              borderRadius: 999,
              padding: "6px 20px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            {record.is_blocked ? "Unblock" : "Block"}
          </button>
        </Popconfirm>
      ),
    },
  ];

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
        All Users
      </span>
    </div>
  );

  return (
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
        data={users}
        loading={isLoading || toggling}
        showSearch
        showPagination
        pageSize={limit}
        total={total}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        onSearch={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
        searchPlaceholder="Search here..."
        searchKeys={["full_name", "email", "phone"]}
        rowKey="id"
        headerLeft={headerLeft}
      />
    </div>
  );
};

export default SargentManage;
