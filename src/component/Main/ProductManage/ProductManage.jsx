import { useState } from "react";
import { Popconfirm, message } from "antd";
import ReusableTable from "../../../shared/ResuableTable";
import { ProductFormModal } from "../../ui/Modal/AddNewProduct";

// ─── Initial Products Data ─────────────────────────────────────────────────────
const initialProducts = Array.from({ length: 10 }, (_, i) => ({
  key: String(i + 1),
  productName: "Facet Fixation",
  productSubName: "Tiger OCT",
  surgeryName: "Facet Fixation",
  status: "Available",
  totalAvailable: "08",
}));

// ─── Spine Icon ────────────────────────────────────────────────────────────────
const SpineIcon = () => (
  <div
    style={{
      width: 42,
      height: 42,
      borderRadius: 8,
      background: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="4" rx="1" fill="#9ca3af" />
      <rect x="8" y="7" width="8" height="3" rx="1" fill="#d1d5db" />
      <rect x="9" y="11" width="6" height="3" rx="1" fill="#9ca3af" />
      <rect x="8" y="15" width="8" height="3" rx="1" fill="#d1d5db" />
      <rect x="9" y="19" width="6" height="3" rx="1" fill="#9ca3af" />
    </svg>
  </div>
);

// ─── ProductsManage Component ──────────────────────────────────────────────────
const ProductsManage = ({ title = "All Products", onBack }) => {
  const [data, setData] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddNew = () => {
    setEditRecord(null);
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditRecord(null);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editRecord) {
        setData((prev) =>
          prev.map((item) =>
            item.key === editRecord.key
              ? {
                  ...item,
                  productName: values.productName,
                  surgeryName: values.surgeryName,
                }
              : item,
          ),
        );
        messageApi.success("Product updated successfully!");
      } else {
        const newItem = {
          key: String(Date.now()),
          productName: values.productName || "New Product",
          productSubName: "Tiger OCT",
          surgeryName: values.surgeryName || "Facet Fixation",
          status: "Available",
          totalAvailable: "01",
        };
        setData((prev) => [newItem, ...prev]);
        messageApi.success("Product added successfully!");
      }
      setLoading(false);
      setModalOpen(false);
      setEditRecord(null);
    }, 500);
  };

  // Delete handler
  const handleDelete = (record) => {
    setData((prev) => prev.filter((item) => item.key !== record.key));
    messageApi.success("Product deleted!");
  };

  // Columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SpineIcon />
          <div>
            <div style={{ fontWeight: 600, color: "#1f2937", fontSize: 14 }}>
              {record.productName}
            </div>
            <div style={{ color: "#9ca3af", fontSize: 12 }}>
              {record.productSubName}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Surgery Name",
      dataIndex: "surgeryName",
      key: "surgeryName",
      render: (val) => (
        <span style={{ color: "#6b7280", fontSize: 14 }}>{val}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <span style={{ color: "#3b82f6", fontWeight: 500, fontSize: 13 }}>
          {val}
        </span>
      ),
    },
    {
      title: "Total Available",
      dataIndex: "totalAvailable",
      key: "totalAvailable",
      render: (val) => (
        <span style={{ color: "#16a34a", fontWeight: 600, fontSize: 14 }}>
          {val}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete Product"
          description="Are you sure you want to delete this product?"
          onConfirm={() => handleDelete(record)}
          okText="Yes, Delete"
          cancelText="Cancel"
          okButtonProps={{
            danger: true,
            style: { borderRadius: 6, fontWeight: 600 },
          }}
          cancelButtonProps={{
            style: { borderRadius: 6 },
          }}
        >
          <button
            style={{
              background: "rgba(239,68,68,0.12)",
              color: "#dc2626",
              border: "none",
              borderRadius: 999,
              padding: "5px 20px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Delete
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
        {title}
      </span>
    </div>
  );

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
      Add New Products
    </button>
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
          pageSize={8}
          searchPlaceholder="Search here..."
          searchKeys={["productName", "surgeryName", "status"]}
          rowKey="key"
          headerLeft={headerLeft}
          headerRight={headerRight}
        />
      </div>

      {/* Add / Edit Modal */}
      <ProductFormModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialValues={editRecord}
        loading={loading}
      />
    </>
  );
};

export default ProductsManage;
