import { useEffect } from "react";
import { Modal, Form, Input, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteNodeMutation, useUpdateNodeMutation } from "../../../redux/features/node/nodeApi";
import { TYPE_CONFIG } from "../../../constant/treeConstants";

// ─── UpdateNodeModal ───────────────────────────────────────────────────────────
// Opens when clicking a BODY_PART or SERGERY node card
// Update API : PATCH /nodes/:id  { title, type }
// Delete API : DELETE /nodes/:id

const UpdateNodeModal = ({ open, onClose, node }) => {
  const [form] = Form.useForm();
  const [updateNode, { isLoading: updating }] = useUpdateNodeMutation();
  const [deleteNode, { isLoading: deleting }] = useDeleteNodeMutation();

  const cfg = TYPE_CONFIG[node?.type] || {};
  const id = node?.id || node?._id;

  useEffect(() => {
    if (node) form.setFieldsValue({ title: node.name || node.title });
  }, [node, form]);

  const handleSave = async (values) => {
    try {
      await updateNode({ id, title: values.title, type: node.type }).unwrap();
      message.success("Updated successfully!");
      onClose();
    } catch (err) {
      message.error(err?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNode(id).unwrap();
      message.success("Deleted successfully!");
      onClose();
    } catch (err) {
      message.error(err?.data?.message || "Delete failed");
    }
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
          {cfg.icon} Edit {cfg.label}
        </span>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          label={
            <span style={{ fontWeight: 600, color: "#374151" }}>Title</span>
          }
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Button
            onClick={onClose}
            style={{ flex: 1, borderRadius: 8, height: 40 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={updating}
            style={{
              flex: 1,
              borderRadius: 8,
              height: 40,
              background: cfg.color,
              border: "none",
              fontWeight: 600,
            }}
          >
            Save Changes
          </Button>
        </div>

        {/* Delete */}
        <Popconfirm
          title="Delete node"
          description={`Delete "${node?.name || node?.title}" and all its children? This cannot be undone.`}
          onConfirm={handleDelete}
          okText="Yes, Delete"
          cancelText="Cancel"
          okButtonProps={{
            danger: true,
            style: { borderRadius: 6, fontWeight: 600 },
          }}
          cancelButtonProps={{ style: { borderRadius: 6 } }}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={deleting}
            style={{
              width: "100%",
              marginTop: 10,
              borderRadius: 8,
              height: 40,
            }}
          >
            Delete {cfg.label}
          </Button>
        </Popconfirm>
      </Form>
    </Modal>
  );
};

export default UpdateNodeModal;
