
import { Modal, Form, Input,} from "antd";


// ─── Surgery Form Modal (shared for Add & Edit) ────────────────────────────────
export const SurgeryFormModal = ({ open, onClose, onSubmit, initialValues = null, loading }) => {
  const [form] = Form.useForm();

  const isEdit = !!initialValues;

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (_) {}
  };

  // Reset / set fields when modal opens
  const handleAfterOpen = (isOpen) => {
    if (isOpen) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      afterOpenChange={handleAfterOpen}
      title={
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
          {isEdit ? "Edit Surgery" : "Add New Surgery"}
        </span>
      }
      footer={null}
      centered
      width={480}
      styles={{
        header: { borderBottom: "1px solid #f3f4f6", paddingBottom: 12 },
        body: { paddingTop: 20 },
      }}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={<span style={{ fontWeight: 500, color: "#374151" }}>Surgery Name</span>}
          name="surgeryName"
          rules={[{ required: true, message: "Surgery name is required" }]}
        >
          <Input
            placeholder="Enter surgery name"
            style={{ borderRadius: 8, height: 40 }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: 500, color: "#374151" }}>Date</span>}
          name="date"
          rules={[{ required: true, message: "Date is required" }]}
        >
          <Input
            placeholder="e.g. November 28, 2015"
            style={{ borderRadius: 8, height: 40 }}
          />
        </Form.Item>
      </Form>

      {/* Footer Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
        <button
          onClick={onClose}
          style={{
            padding: "8px 24px",
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
            padding: "8px 24px",
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
}