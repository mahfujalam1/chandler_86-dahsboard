import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useCreateNodeMutation } from "../../../redux/features/node/nodeApi";

// ─── CreateBodyPartModal ───────────────────────────────────────────────────────
// Opens from the "+ New Body Part" button in ProductManage header
// API: POST /nodes  { title, type: "BODY_PART" }  — no parent_id

const CreateBodyPartModal = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [createNode, { isLoading }] = useCreateNodeMutation();

  const handleSubmit = async (values) => {
    try {
      await createNode({ title: values.title, type: "BODY_PART" }).unwrap();
      message.success("Body part created successfully!");
      form.resetFields();
      onClose();
    } catch (err) {
      message.error(err?.data?.message || "Failed to create body part");
    }
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
          🫁 Create Body Part
        </span>
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      width={420}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          label={
            <span style={{ fontWeight: 600, color: "#374151" }}>Title</span>
          }
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input
            placeholder="e.g. Face, Nose, Cervical..."
            size="large"
            style={{ borderRadius: 8 }}
            autoFocus
          />
        </Form.Item>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Button
            onClick={() => {
              form.resetFields();
              onClose();
            }}
            style={{ flex: 1, borderRadius: 8, height: 40 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{
              flex: 1,
              borderRadius: 8,
              height: 40,
              background: "#f97316",
              border: "none",
              fontWeight: 600,
            }}
          >
            Create Body Part
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateBodyPartModal;
