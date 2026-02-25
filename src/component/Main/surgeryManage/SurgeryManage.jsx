
import { useState } from "react";
import { message } from "antd";
import { SurgeryFormModal } from "../../ui/Modal/AddNewSurgeryModal";
import ReusableTable from "../../../shared/ResuableTable";

// ─── Initial Data ──────────────────────────────────────────────────────────────
const initialData = Array.from({ length: 9 }, (_, i) => ({
  key: String(i + 1),
  surgeryName: "Portland, Illinois",
  date: "November 28, 2015",
}));

const SurgeryManage = ({ title = "All Surgery Name", onBack }) => {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null); // null = Add, object = Edit
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Open Add modal
  const handleAddNew = () => {
    setEditRecord(null);
    setModalOpen(true);
  };

  // Open Edit modal with prefilled values
  const handleEdit = (record) => {
    setEditRecord(record);
    setModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setModalOpen(false);
    setEditRecord(null);
  };

  // Submit (Add or Edit)
  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editRecord) {
        // Edit existing
        setData((prev) =>
          prev.map((item) =>
            item.key === editRecord.key ? { ...item, ...values } : item
          )
        );
        messageApi.success("Surgery updated successfully!");
      } else {
        // Add new
        const newItem = {
          key: String(Date.now()),
          ...values,
        };
        setData((prev) => [newItem, ...prev]);
        messageApi.success("Surgery added successfully!");
      }
      setLoading(false);
      setModalOpen(false);
      setEditRecord(null);
    }, 500);
  };

  // Columns
  const columns = [
    {
      title: "Surgery Name",
      dataIndex: "surgeryName",
      key: "surgeryName",
      render: (val) => (
        <span style={{ color: "#374151", fontSize: 14, fontWeight: 500 }}>{val}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (val) => <span style={{ color: "#6b7280", fontSize: 14 }}>{val}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => handleEdit(record)}
            style={{
              background: "rgba(139,92,246,0.12)",
              color: "#7c3aed",
              border: "none",
              borderRadius: 999,
              padding: "5px 20px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Edit
          </button>
          <button
            style={{
              background: "rgba(239,68,68,0.12)",
              color: "#dc2626",
              border: "none",
              borderRadius: 999,
              padding: "5px 14px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Declined
          </button>
        </div>
      ),
    },
  ];

  // Header left: back + title
  const headerLeft = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span style={{ fontSize: 17, fontWeight: 700, color: "#1f2937" }}>{title}</span>
    </div>
  );

  // Header right: Add New Surgery button
  const headerRight = (
    <button
      onClick={handleAddNew}
      style={{
        background: "#f97316",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "9px 20px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
      }}
    >
      Add New Surgery
    </button>
  );

  return (
    <>
      {contextHolder}

      <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <ReusableTable
          columns={columns}
          data={data}
          showSearch
          showPagination
          pageSize={9}
          searchPlaceholder="Search here..."
          searchKeys={["surgeryName", "date"]}
          rowKey="key"
          headerLeft={headerLeft}
          headerRight={headerRight}
        />
      </div>

      {/* Add / Edit Modal */}
      <SurgeryFormModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialValues={editRecord}
        loading={loading}
      />
    </>
  );
};

export default SurgeryManage;