import { Modal, Form, Input, Select, Upload, Popconfirm, message } from "antd";
import {
  InboxOutlined,
  VideoCameraOutlined,
  FileOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

// ─── Dummy surgery options ─────────────────────────────────────────────────────
const surgeryOptions = [
  { value: "facet-fixation", label: "Facet Fixation" },
  { value: "spinal-fusion", label: "Spinal Fusion" },
  { value: "laminectomy", label: "Laminectomy" },
  { value: "discectomy", label: "Discectomy" },
];

// ─── UploadBox helper ──────────────────────────────────────────────────────────
const UploadBox = ({ icon, label }) => (
  <div
    style={{
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      background: "#f9fafb",
      minHeight: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      gap: 4,
      color: "#9ca3af",
      fontSize: 13,
    }}
  >
    <span style={{ fontSize: 22 }}>{icon}</span>
    <span>Upload here</span>
  </div>
);

export const ProductFormModal = ({
  open,
  onClose,
  onSubmit,
  initialValues = null,
  loading,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  const handleAfterOpen = (isOpen) => {
    if (isOpen) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (_) {}
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      afterOpenChange={handleAfterOpen}
      title={
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
          {isEdit ? "Edit Product" : "Add New Product"}
        </span>
      }
      footer={null}
      centered
      width={800}
      styles={{
        header: { borderBottom: "1px solid #f3f4f6", paddingBottom: 12 },
        body: { paddingTop: 16, maxHeight: "75vh", overflowY: "auto" },
      }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        {/* Select Surgery Name */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Select Surgery Name
            </span>
          }
          name="surgeryName"
          rules={[{ required: true, message: "Please select surgery" }]}
        >
          <Select
            placeholder="Select"
            options={surgeryOptions}
            style={{ borderRadius: 8, height: 40 }}
          />
        </Form.Item>

        {/* Product Name */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Product Name
            </span>
          }
          name="productName"
          rules={[{ required: true, message: "Product name is required" }]}
        >
          <Input placeholder="Select" style={{ borderRadius: 8, height: 40 }} />
        </Form.Item>

        {/* Product Description */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Product Description
            </span>
          }
          name="description"
        >
          <TextArea
            placeholder="Description"
            rows={3}
            style={{ borderRadius: 8, resize: "none" }}
          />
        </Form.Item>

        {/* Product Image */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Product Image
            </span>
          }
          name="productImage"
        >
          <UploadBox icon={<PictureOutlined />} label="Upload here" />
        </Form.Item>

        {/* Attach File */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Attach File
            </span>
          }
          name="attachFile"
        >
          <UploadBox icon={<FileOutlined />} label="Upload here" />
        </Form.Item>

        {/* Upload Video */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Upload Video
            </span>
          }
          name="video"
        >
          <UploadBox icon={<VideoCameraOutlined />} label="Upload here" />
        </Form.Item>

        {/* Upload Brochure */}
        <Form.Item
          label={
            <span style={{ fontWeight: 500, color: "#374151", fontSize: 13 }}>
              Upload brochure
            </span>
          }
          name="brochure"
        >
          <UploadBox icon={<InboxOutlined />} label="Upload here" />
        </Form.Item>
      </Form>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 20,
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "9px 32px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#fff",
            color: "#6b7280",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleOk}
          disabled={loading}
          style={{
            padding: "9px 36px",
            borderRadius: 8,
            border: "none",
            background: "#f97316",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};
