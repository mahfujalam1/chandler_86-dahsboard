import { useState } from "react";
import { Modal, Form, Input, Button, Tabs, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useCreateNodeMutation,
  useCreateProductInfoMutation,
} from "../../../redux/features/node/nodeApi";

const AddChildModal = ({ open, onClose, parentNode }) => {
  const [activeTab, setActiveTab] = useState("BODY_PART");
  const [bodyPartForm] = Form.useForm();
  const [surgeryForm] = Form.useForm();
  const [productForm] = Form.useForm();

  const [createNode, { isLoading: nodeLoading }] = useCreateNodeMutation();
  const [createProductInfo, { isLoading: productLoading }] =
    useCreateProductInfoMutation();

  const parentId = parentNode?.id || parentNode?._id;
  const parentName = parentNode?.name || parentNode?.title || "";

  const handleClose = () => {
    bodyPartForm.resetFields();
    surgeryForm.resetFields();
    productForm.resetFields();
    setActiveTab("BODY_PART");
    onClose();
  };

  // ── Body Part submit ──────────────────────────────────────────────────────
  const handleBodyPartSubmit = async (values) => {
    try {
      await createNode({
        title: values.title,
        type: "BODY_PART",
        parent_id: parentId,
      }).unwrap();
      message.success("Body Part created successfully!");
      handleClose();
    } catch (err) {
      message.error(err?.data?.message || "Failed to create body part");
    }
  };

  // ── Surgery submit ────────────────────────────────────────────────────────
  const handleSurgerySubmit = async (values) => {
    try {
      await createNode({
        title: values.title,
        type: "SERGERY",
        parent_id: parentId,
      }).unwrap();
      message.success("Surgery created successfully!");
      handleClose();
    } catch (err) {
      message.error(err?.data?.message || "Failed to create surgery");
    }
  };

  // ── Product submit (2 steps) ──────────────────────────────────────────────
  const handleProductSubmit = async (values) => {
    try {
      const nodeRes = await createNode({
        title: values.title,
        type: "PRODUCT",
        parent_id: parentId,
      }).unwrap();

      const nodeId = nodeRes?.data?.id || nodeRes?.data?._id || nodeRes?.id;

      const fd = new FormData();
      fd.append("product_node_id", nodeId);
      if (values.description) fd.append("description", values.description);
      if (values.brochure_file?.[0]?.originFileObj)
        fd.append("brochure_file", values.brochure_file[0].originFileObj);
      if (values.video_file?.[0]?.originFileObj)
        fd.append("video_file", values.video_file[0].originFileObj);
      if (values.banner_image?.[0]?.originFileObj)
        fd.append("banner_image", values.banner_image[0].originFileObj);

      await createProductInfo(fd).unwrap();
      message.success("Product created successfully!");
      handleClose();
    } catch (err) {
      message.error(err?.data?.message || "Failed to create product");
    }
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);
  const uploadProps = { beforeUpload: () => false, maxCount: 1 };

  const tabItems = [
    // ── Tab 1: Body Part ────────────────────────────────────────────────────
    {
      key: "BODY_PART",
      label: <span>🦴 Body Part</span>,
      children: (
        <Form
          form={bodyPartForm}
          layout="vertical"
          onFinish={handleBodyPartSubmit}
        >
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Body Part Title</span>}
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input
              placeholder="e.g. Nose, Chin, Forehead..."
              size="large"
              style={{ borderRadius: 8 }}
              autoFocus
            />
          </Form.Item>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <Button
              onClick={handleClose}
              style={{ flex: 1, borderRadius: 8, height: 40 }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={nodeLoading}
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
      ),
    },

    // ── Tab 2: Surgery ──────────────────────────────────────────────────────
    {
      key: "SERGERY",
      label: <span>🔬 Surgery</span>,
      children: (
        <Form
          form={surgeryForm}
          layout="vertical"
          onFinish={handleSurgerySubmit}
        >
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Surgery Title</span>}
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input
              placeholder="e.g. Rhinoplasty, Facelift..."
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <Button
              onClick={handleClose}
              style={{ flex: 1, borderRadius: 8, height: 40 }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={nodeLoading}
              style={{
                flex: 1,
                borderRadius: 8,
                height: 40,
                background: "#8b5cf6",
                border: "none",
                fontWeight: 600,
              }}
            >
              Create Surgery
            </Button>
          </div>
        </Form>
      ),
    },

    // ── Tab 3: Product ──────────────────────────────────────────────────────
    {
      key: "PRODUCT",
      label: <span>💊 Product</span>,
      children: (
        <Form
          form={productForm}
          layout="vertical"
          onFinish={handleProductSubmit}
        >
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Product Title</span>}
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input
              placeholder="Product name..."
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Description</span>}
            name="description"
          >
            <Input.TextArea
              rows={3}
              placeholder="Product description..."
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label="Brochure File"
            name="brochure_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps} accept=".pdf,.doc,.docx">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, width: "100%" }}
              >
                Upload Brochure
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Video File"
            name="video_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps} accept="video/*">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, width: "100%" }}
              >
                Upload Video
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Banner Image"
            name="banner_image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, width: "100%" }}
              >
                Upload Banner
              </Button>
            </Upload>
          </Form.Item>

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <Button
              onClick={handleClose}
              style={{ flex: 1, borderRadius: 8, height: 40 }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={nodeLoading || productLoading}
              style={{
                flex: 1,
                borderRadius: 8,
                height: 40,
                background: "#16a34a",
                border: "none",
                fontWeight: 600,
              }}
            >
              Create Product
            </Button>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      title={
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
          Add under <span style={{ color: "#f97316" }}>"{parentName}"</span>
        </span>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={500}
      centered
      destroyOnClose
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        style={{ marginTop: 8 }}
      />
    </Modal>
  );
};

export default AddChildModal;
